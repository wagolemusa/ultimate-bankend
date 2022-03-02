import { check } from 'express-validator'

const firstname = check("firstname", "Firstname is required .").not().isEmpty();
const lastname  = check("lastname", "Lastname is required.").not().isEmpty();
const middlename =  check("middlename", "Middlename is required.").not().isEmpty();
const idnumber  = check ("idnumber", "Id Number is required").not().isEmpty();
const phonenumber = check("phonenumber", "Phone Number is required").not().isEmpty();
const email = check("email", "Please provide a valid email address").isEmail();

const password = check(
    "password",
    "Password is required of mininum length of 6."
)
.isLength({
    min: 6,
});

export const RegisterValidations = [firstname, lastname, middlename, idnumber, phonenumber, email, password];
export const AuthenticateValidations = [email, password];
export const ResetPassword = [email]


