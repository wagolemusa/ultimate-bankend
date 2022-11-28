import { SECRECT } from "../constants/index";


const jwt = require("jsonwebtoken");


// export const requiresSignin = (req, res, next) => {
//     if (req.headers.authorization) {
//       const token = req.headers.authorization.split(" ")[1];
//       const user = jwt.verify(token, SECRECT);
//       req.user = user;
//     } else {
//       return res.status(400).json({ message: "Authorization required" });
//     }
//     next();
//     //jwt.decode()
//   };

  export const requiresSignin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, SECRECT, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          if (decodedToken.role !== "user") {
            return res.status(401).json({ message: "Not authorized" })
          } else {
            req.user = decodedToken;
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

  // Admin Auth
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
            req.user = decodedToken
            console.log(decodedToken)
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