 const express = require("express");
 const mongoose = require("mongoose");
 const bodyParser = require("body-parser");
 const dotenv = require("dotenv");

 const app = express();
 dotenv.config();
 const port = process.env.PORT || 3000;
 // making of port
 const username = process.env.mongodb_username ;
 const password = process.env.mongodb_password ;
 const dbName = 'registerationFormData';

 mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ekegbpf.mongodb.net/${dbName}`, {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   authSource: "admin" // Specify authSource if necessary
 })

 const registerationSchema = new mongoose.Schema({
    name : String ,
    email : String ,
    password : String 
 })
 
 const Registeration = mongoose.model("Registeration", registerationSchema);
 app.use(bodyParser.urlencoded ({extended : true}));
 app.use(bodyParser.json());
 app.get("/",(req , res )=>{
    res.sendFile(__dirname  + "/pages/index.html");
 })

 app.post("/register" , async (req , res)=>{
     try{
           const {name , email , password} = req.body ;
            const existingUser = await Registeration.findOne({email : email});

           if(!existingUser){
            const registerationData = new Registeration({
                name,
                email,
                password
               });
               await  registerationData.save();
               res.redirect("/success");
           }
           else{
          //  alert("user already exist");
            res.redirect("/error");
           }
           // by this data will be save
     }
     catch(error){
        console.log(error);
        res.redirect("error");

     }
 })

 app.get("/success" ,(req , res)=>{
    res.sendFile(__dirname+"/pages/success.html");
 })
 app.get("/error" , (req , res)=>{
    res.sendFile(__dirname+ "/pages/error.html");
 })

 app.listen(port ,()=>{
    console.log(`server is running on port ${port}`)
 })

