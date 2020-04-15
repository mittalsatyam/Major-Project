const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});



const development={
    name:'development',
    asset_path: '/assets',
    session_cookie_key:'blahsomething',
    db:'development',
    smtp:{
        service:'gmail',
        host:"smtp.gmail.email",
        port:587,
        secure: false, 
        auth:{
            user:'mittal.satyam026@gmail.com',
            pass:'papaji@07'
        }  
        },
        google_client_id:"264671854619-pi9qiiug03242bh2g2oi6e0751o94i2b.apps.googleusercontent.com",
        google_client_secret: 'f2hh42pZxhEmzoSnA3pYJr8A', // e.g. _ASDFA%KFJWIASDFASD#FAD-
        google_call_back_url: "http://localhost:8000/users/auth/google/callback",
        morgan: {
            mode: 'dev',
            options: {stream: accessLogStream}
        }
}

const production={
name:'production',
asset_path:process.env.CODEIAL_DEV_PATH,
session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,//this will go to a key as a bash profile
db:process.env.CODEIAL_DB,
smtp:{
    service:'gmail',
    host:"smtp.gmail.email",
    port:587,
    secure: false, 
    auth:{
        user:process.env.CODEIAL_GMAIL_USERNAME,
        pass:process.env.CODEIAL_GMAIL_PASSWORD
    }  
    },
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_SECRET, // e.g. _ASDFA%KFJWIASDFASD#FAD-
    google_call_back_url: process.env.CODEIAL_CALLBACK_URL,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}
//module.exports=eval(process.env.CODEIAL_ENVIRONMENT)==undefined ? development:eval(process.env.CODEIAL_ENVIRONMENT);

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);