const nodemailer =require("nodemailer")

const path = require("path")
require("dotenv").config()
const ejs =require("ejs")



const sendMail=async(options)=>{
    console.log("Options:", options);
    const transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:parseInt(process.env.SMTP_PORT || "578"),
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
    })

    const {email,subject,template,data}=options

    // get the path template with ejs
    const templatePath=path.join(__dirname,"../mails",template)

    //render the email template with ejs
    const html=await ejs.renderFile(templatePath,data)

    const mailOption={
        from:process.env.SMTP_MAIL,
        to:email,
        subject,
        html
    }
    console.log("Mail Options:", mailOption);
    await transporter.sendMail(mailOption)
}

module.exports=sendMail