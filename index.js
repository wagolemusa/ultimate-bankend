import express from "express";
import dotenv  from "dotenv";
import { join } from "path";
import mongoose from "mongoose";
import passport from "passport";
import { json } from "body-parser";
import cors from 'cors'
import { DB, PORT } from "./constants/index";
const path = require("path")
var morgan = require('morgan')


// import Routers

import UserApis from './apis/user';
import ProfileApis from './apis/profiles'


// import passport middleware
require("./middlewares/passport-middleware")

// Initialalize express application
const app = express();
dotenv.config()


// Application Middlewares
app.use(cors());
app.use(json());
app.use(passport.initialize());
app.use(express.static(join(__dirname, "./uploads")));
app.use(morgan('combined'))

// inject sub routes and  apis
app.use("/users", UserApis);
app.use("/profiles",  ProfileApis);
// app.use(express.static(path.join(__dirname,"./ultimate/build","index.html")))
// app.use(express.static(path.join(__dirname, 'build')));

// const publicPath = path.join(__dirname, '..', 'public');
// app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname, 'ultimate/build')));    
// app.use(express.static('ultimate/build'));


let port = process.env.PORT || 5000;

const main = async () => {
    try {
        // Connect with the database 
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log("DATABASE CONNECTED...");
        // Start application listening  for request on server

    
    app.listen(port, () => console.log(`Server started on port ${port}`));
    }catch(error){
        console.log(`Unbale to start the server \n${error.message}`)
    }
}

main();
