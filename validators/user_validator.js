import { check } from 'express-validator'

const firstname = check("firstname", "Firstname is required .").not().isEmpty();
const lastname  = check("lastname", "Lastname is required.").not().isEmpty();
const middlename =  check("middlename", "Middlename is required.").not().isEmpty();
const idnumber  = check ("idnumber", "Id Number is Must be 7 - 8 Charactors").isLength({ min: 7, max: 8});
const phonenumber = check("phonenumber", "Mobile number should contains 10 digits").isLength({ min: 9, max: 13 });
const email = check("email", "Please provide a valid email address").isEmail();

const password =  check('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 chars long')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .withMessage('Password must contain a number')

export const RegisterValidations = [firstname, lastname, middlename, idnumber, phonenumber, email, password];
export const AuthenticateValidations = [email, password];
export const ResetPassword = [email]


