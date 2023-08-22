// const ElasticEmail = require('@elasticemail/elasticemail-client');
// require('dotenv').config()

// const {ELASTICEMAIL_API_KEY} = process.env
 
// const defaultClient = ElasticEmail.ApiClient.instance;
 
// const {apikey} = defaultClient.authentications;
// apikey.apiKey = ELASTICEMAIL_API_KEY
 
// const api = new ElasticEmail.EmailsApi()
 
// const email = ElasticEmail.EmailMessageData.constructFromObject({
//   Recipients: [
//     new ElasticEmail.EmailRecipient("padop97616@backva.com")
//   ],
//   Content: {
//     Body: [
//       ElasticEmail.BodyPart.constructFromObject({
//         ContentType: "HTML",
//         Content: "<p> Verify email ;) </p>",
//       })
//     ],
//     Subject: "Verify email ;)",
//     From: "mashyni92@gmail.com"
//   }
// });
 
// const callback = function(error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('API called successfully.');
//   }
// };
// api.emailsPost(email, callback);

//----------------------------------------------------------------



// const nodemailer = require('nodemailer')
// requestAnimationFrame('dotenv').config()

// const {UKR_NET_PASSWORD, UKR_NET_EMAIL} = process.env

// const nodemailerConfig = {
//     host: 'smtp.ukr.net',
//     port: 465, //25, 465, 2525
//     secure: true,
//     auth: {
//         user: UKR_NET_EMAIL,
//         pass: UKR_NET_PASSWORD
//     }
// }

// const transport = nodemailer.createTransport(nodemailerConfig)

// const email = {
//     from: UKR_NET_EMAIL,
//     to: "padop97616@backva.com",
//     subject: "Verification email :)",
//     html: "<p>Verification email ;)</p>"
// }
// transport.send(email)
// .then(()=> console.log("Email send succes"))
// .catch(error => console.log(error.message))