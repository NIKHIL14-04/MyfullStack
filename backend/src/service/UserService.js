import UserModel from "../Model/UserModel.js";
export const savedata = async(data)=>{
try {
    const userdata = new UserModel(data)
    const savedata = await userdata.save()
    return savedata
} catch (error) {
    console.log(error.message)
    throw error
}
} 
