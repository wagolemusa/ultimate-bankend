import { check } from 'express-validator'

const firstname = check("firstname", "Firstname is required .").not().isEmpty();
const lastname  = check("lastname", "Lastname is required.").not().isEmpty();
const idnumber  = check ("idnumber", "Id Number is Must be 7 - 8 Charactors").isLength({ min: 7, max: 8});
const phonenumber = check("phonenumber", "Mobile number should contains 12 digits").isLength({ min: 12, max: 12 });
const phone = check("phone", "Mobile number should contains 12 digits").isLength({ min: 12, max: 12 });
const phone1 = check("phone1", "Mobile number should contains 12 digits").isLength({ min: 12, max: 12 });

const email = check("email", "Please provide a valid email address").isEmail();
const password =  check('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 chars long')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)
    .withMessage('Password must 8 to 15 contain a number, uppercase, lowercase and special character')

export const RegisterValidations = [firstname, lastname,  idnumber, phonenumber, email, password];
export const NextofkingValidation = [ firstname, lastname, idnumber, phonenumber, email]
export const AuthenticateValidations = [email, password];
export const EditUser = [email, phonenumber]
export const PeopleVidate = [phonenumber]
export const ResetPassword = [email]
export const PasswordUpdate = [password]
export const phoneValidation = [ phone, phone1 ]


