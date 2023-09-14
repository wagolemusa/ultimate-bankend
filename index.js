import express from "express";
import dotenv  from "dotenv";
import { join } from "path";

import mongoose from "mongoose";
import passport from "passport";
import { json } from "body-parser";
import cors from 'cors'
import { DB, PORT } from "./constants/index";
const path = require("path")
// var morgan = require('morgan')


// import Routers

import UserApis from './apis/user';
import cityApis from './apis/city'
import ProfileApis from './apis/profiles'
import CountryApi from  './apis/country'
import NextofkingApis from './apis/nextofking'
import Companycategory from './apis/companyCategory'
import BusinessApis from './apis/business'
import CompanyApis from './apis/company'
import PeopleApis from './apis/people'
import MessageApi from './apis/message'
import PhoneSMSApi from './apis/phoneSms'
import BusinesscategoriesApis from './apis/businescategory'
import KorgasApi from './apis/korgas'
import PhoneListApi from './apis/user/phoneList';
import EmailListApi from './apis/user/emailList';
import SearchBusinessApi from './apis/user/searchBusiness';

import { api } from "./utils/cloundinary";

require("esm")(module/*, options*/)
// import passport middleware
// require("./middlewares/passport-middleware")
// import passportmiddleware from "./middlewares/passportmiddleware"

// Initialalize express application
const app = express();
dotenv.config()


// Application Middlewares
app.use(cors());
app.use(json());
app.use(passport.initialize());
// app.use(express.static(join(__dirname, "./uploads")));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "uploads")))
app.use(express.json({limit: "50mb" }));
app.use(express.urlencoded({ limit: '50mb', extended: true}))

// app.use(morgan('combined'))

// inject sub routes and  apis
app.use("/users", UserApis);
app.use("/profiles",  ProfileApis);
app.use("/country", CountryApi);
app.use("/city",  cityApis);
app.use("/api", Companycategory);
app.use("/api", BusinessApis)
app.use("/api", CompanyApis);
app.use("/api", PeopleApis);
app.use("/nextofking", NextofkingApis);
app.use("/api", BusinesscategoriesApis)
app.use("/api", MessageApi);
app.use("/api", PhoneSMSApi);
app.use("/api", KorgasApi);
app.use("/api", PhoneListApi);
app.use("/api", EmailListApi);
app.use("/api", SearchBusinessApi);
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
