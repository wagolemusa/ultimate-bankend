// import {AFRICAN_USERNAME , AFRICAN } from '../constants'
import Africastalking from 'africastalking'

const credentials = {
    apiKey: '1ab12ec06c57011483fbb7da95ca8e2e88450ed8d17e01897fe47abca099608a',      
    username: 'refuge', 
};


const africastalking = Africastalking(credentials);

// Initialize a service e.g. SMS
const sms = africastalking.SMS

const phoneSms = async (to, message) => {

  
        const options = {
            to,
            message
        }

    await sms.send(options)
    .then( response => {
        console.log(response);
    })
    .catch( error => {
        console.log(error);
    });
            
}

export default phoneSms
