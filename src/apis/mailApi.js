var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abcd@gmail.com",
    pass: "abcd!"
  }
});

var mailOptions = {
  from: "abcd@gmail.com",
  to: "defg@live.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!"
};

exports.sendMailTest = function() {
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
