const nodemailer = require("nodemailer");
require("dotenv").config();

 const {UKR_NET_EMAIL, UKR_NET_PASSWORD} = process.env

 const nodemalerCofig = {
    host: "smtp.ukr.net",
    port: 465, //25, 465, 2525
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD
    }
 }

 const transport = nodemailer.createTransport(nodemalerCofig);

 const sendEmail = async(data) => {
    const email = {...data, from: UKR_NET_EMAIL};
    await transport.sendMail(email)
    return true
 }
 module.exports = sendEmail




