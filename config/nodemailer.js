const nodemailer=require('nodemailer');
const path=require('path');
const ejs=require('ejs');
let transporter=nodemailer.createTransport({
service:'gmail',
host:"smtp.gmail.email",
port:587,
secure: false, 
auth:{
    user:'mittal.satyam026@gmail.com',
    pass:'papaji@07'
}  
});
//send the email
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
   path.join('__dirname','../views/mailers',relativePath),
   data,
   function(err,template){
      if(err){
        console.log("error in rendering template");
        return;
      }
      mailHTML=template;
   }
   )
   return mailHTML; 
}
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}