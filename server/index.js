import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors'

main().catch(e => console.log(e)) 

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/tripgenie')
    console.log('db connected')
}


const server = express()
server.use(cors())
server.use(bodyParser.json())
server.listen(3005, () => {
    console.log("Server started")
})

const userSchema = new mongoose.Schema ({
    fname: String,
    lname: String,
    email: String,
    phone: String,
    contrycode: String
})

const User = mongoose.model('User', userSchema)

server.post('/register', async (req, res) => {

        let user = new User()
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.contrycode = req.body.contrycode;
        
        const doc = await user.save()
        console.log(doc)
        res.json(doc)
})

server.get('/register-count', async(req, res) => {
    const users = await User.find({})
    res.json({
      'user-count':  users.length
})
})




