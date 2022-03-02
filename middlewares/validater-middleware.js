import  { validationResult } from "express-validator";

const validationMiddleware = (req, res, next) =>{
    let errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.json({
            errors: errors.array(),
        });
    }else {
        return next();
    }
};

export default validationMiddleware;