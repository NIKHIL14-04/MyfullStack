import { savedata } from "../service/UserService.js";
import bcrypt from "bcryptjs"
import UserModel from "../Model/UserModel.js";

export const save = async (req, res) => {
    try {
        const { name, email, password, confirmpass, phonenumber, address } = req.body
        if (!name || !email || !password || !confirmpass || !address || !phonenumber) {
            res.status(400).json({
                message: "all filed are required !"
            })
        }
        if (password !== confirmpass) {
            return res.status(400).json({
                message: "password and confirm password should be  match  !"
            })
        }
        else {

            const data = {
                name: name,
                email: email,
                password: await bcrypt.hash(password, 10),
                phonenumber: phonenumber,
                address: address
            }
            const result = await savedata(data)
            res.status(200).json({
                data: result,
                message: "user register successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "something went worng !"
        })
    }
}


export const login =async(req,res)=>{
    const {email,password} = req.body  
    try {
        const findEmail = await UserModel.findOne({email:email})
        if(!findEmail){
           return res.status(400).json({
               message:"email not find"
           })
        }else{
           const {email,password}= findEmail

           const userAuthriserd = req.body.email === email && await bcrypt.compare(req.body.password,password)

           if(userAuthriserd){
            const token = await findEmail.generateToken();
               return res.status(200).json({
                   message:"user Login sucessfull ",
                   token:token
               })
           }else{
               return res.status(200).json({
                   message:"user not autheriged "
               })
           }
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message:"something went worng !"
        })
    }
}



