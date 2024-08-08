import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import connectDB from "./src/Utils/Connectivity.js";
import UserRoute from "./src/Route/UserRoute.js";
import path from "path"
import { fileURLToPath } from 'url';
import {Server} from "socket.io"
import http from "http"
const app = express()

const server = http.createServer(app);


import cors from "cors"
dotenv.config();
const Hostname = '127.0.0.1';
const Port = process.env.Port;
app.use(cors())
app.use(bodyParser.json())
app.use(UserRoute)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname,'./Public/')))
app.get('/', (req, res) => {
  return   res.sendFile('/Public/index.html');
});

const io = new Server(server)
io.on('connection', (socket) => {
  console.log('a user connected',socket.id);
});
connectDB()
app.listen(Port,Hostname,()=>{
    console.log("server is runing at port :" + Hostname + Port)
})
