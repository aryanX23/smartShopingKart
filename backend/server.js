const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require('mongoose');
const cors=require('cors');
const {encrypt,decrypt}= require('./crypto');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const MongoDBstore=require('connect-mongodb-session')(session);
const dotenv = require('dotenv');
const User=require('./userSchema');
const io = require('./socket');
const Product = require('./productSchema');
const productList= require('./productListSchema');
const productListSchema = require("./productListSchema");
//IMPORTING PACKAGES^
//<-----------------------START OF MIDDLEWARE------------------------------------>
const app=express();
app.use(cookieParser());
dotenv.config();
const store= new MongoDBstore({
    uri: process.env.URI,
    collections: process.env.COLLECTION
});
app.use(cors({
    origin: process.env.ORIGIN_URI,
    credentials: true
}));
app.use(bodyParser.json());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        secure:false,
        httpOnly:true,
        expires: 60000*60*24
    },
        store:store
    })
);
//<------------------------END OF MIDDLEWARE------------------------------------->

app.post('/signin',(req,res)=>{
    var sessionInfo=req.session;
    console.log("/signin");
    const {username,password}=req.body;
    const query = User.findOne({'username': username });
    query.select('password username');
    query.exec(function (err, user) {
        if (user === null){
            res.status(200).send({isLoggedIn:false});
        }
        else
        {
            if(decrypt(user.password).localeCompare(password)===0){
                sessionInfo.isLoggedIn=true;
                sessionInfo.username=user.username;
                res.status(200).send({username:req.session.username,isLoggedIn:req.session.isLoggedIn});
            }
            else{
                res.status(200).send({isLoggedIn:false});
            }
        }
    });
});
app.post('/register',(req,res)=>{
    console.log("/register");
    const {email,password,username}=req.body;
    const query = User.findOne({'email': email });
    query.select('email');
    query.exec(function (err, user) {
        if(user===null){
            const user=new User({
                email: email,
                password:encrypt(password),
                username:username,
            });
            user.save().then(result=>{
                res.send("Registration Successful!")
                console.log("Created Entry");
            }).catch(err=>{
                console.log(err);
                res.send("Internal Error");
            });
        }
        else{
            res.send("User Already Exists!");
        }
    }); 
});
app.post('/registerProduct',(req,res)=>{
    console.log("/registerProduct");
    const {name,price,rfid}=req.body;
    const query = Product.findOne({'rfid': rfid });
    query.select('rfid');
    query.exec(function (err, product) {
        if(product===null){
            const product=new Product({
                name: name,
                price:price,
                rfid:rfid
            });
            product.save().then(result=>{
                res.send("Product Registration Successful!")
                console.log("Created Entry");
            }).catch(err=>{
                console.log(err);
                res.send("Internal Error");
            });
        }
        else{
            res.send("Product Already Exists!");
        }
    }); 
});
app.post('/sendData',(req,res)=>{
    const {buffer1,buffer2,buffer3,buffer4}=req.body;
    const rfid=buffer1+" "+buffer2+" "+buffer3+" "+buffer4;
    console.log(rfid);
    const query = Product.findOne({'rfid': rfid });
    query.select('name price');
    query.exec(function (err, product) {
        if ( product === null ){
            res.send({price:0});
        }
        else
        {
            res.send({price:product.price});
            io.getIO().emit('dataArduino',{name:product.name, price:product.price});
        }
    });
});
app.post('/login',(req,res)=>{
    console.log("/login");
    if(req.session.isLoggedIn)
        res.send({user_name:req.session.username,isLoggedIn:req.session.isLoggedIn});
    else{
        res.send({isLoggedIn:false});
    }
});
app.post('/logout',(req,res)=>{
    console.log("/logout");
    req.session.destroy(err=>{
        if(err){
            console.log("logout error");
            res.status(400).send("Internal Error");
            }
        else
            res.status(200).send("LOGGED OUT!");
    });
});
app.post('/saveProductList',(req,res)=>{
    console.log("/saveProductList");
    const {name,price,customer}=req.body;
    const query = productListSchema.findOne({'customer': customer });
    query.select('customer');
    query.exec(function (err, productList) {
        if(productList===null){
            const productList=new productListSchema({
                name: name,
                price:price,
                customer:customer
            });
            productList.save().then(result=>{
                res.send("Product Saved Successful!")
                console.log("Created Entry");
            }).catch(err=>{
                console.log(err);
                res.send("Internal Error");
            });
        }
        else{
            res.send("Customer Already Exists!");
        }
    }); 
});
app.get('/',(req,res)=>{
    console.log("Endpoint 1 Working!!");
    res.send("O.K.");
});


mongoose.connect(process.env.CONNECTION_URI).then(result=>{
    const server = app.listen(process.env.PORT,()=>{
        console.log(`Server is sucessfully running on port ${process.env.PORT} !`);
    });
    const io = require('./socket').init(server);
    io.on('connection', socket=>{
        console.log("Client Connected Successfully");
    });
}).catch(console.log);
