import { SECRECT } from "../constants/index";


const jwt = require("jsonwebtoken");


export const requiresSignin = (req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, SECRECT);
      req.user = user;
    } else {
      return res.status(400).json({ message: "Authorization required" });
    }
    next();
    //jwt.decode()
  };



  
  exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
      return res.status(400).json({ message: "User access denied" });
    }
    next();
  };
  
  export const adminMiddleware = (req, res, next) => {
    
    if (req.user.role !== "admin") {
      if (req.user.role !== "super-admin") {
        return res.status(400).json({ message: "Admin access denied" });
      }
    }
    next();
  };
  
  exports.superAdminMiddleware = (req, res, next) => {
    if (req.user.role !== "super-admin") {
      return res.status(200).json({ message: "Super Admin access denied" });
    }
    next();
  };
  


  export const adminAuth = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, SECRECT, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          if (decodedToken.role !== "admin") {
            return res.status(401).json({ message: "Not authorized" })
          } else {
            next()
          }
        }
      })
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" })
    }
  }