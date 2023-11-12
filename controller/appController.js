const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { EMAIL, PASSWORD } = require("../env.js");
// send mail from testing acc
const signup = async (req, res) => {
  /* testing account  */
  let testAccount = await nodemailer.createTestAccount();
  /* create reusable transport object using the default SMTP transport */
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  const message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Successfully Register", // plain text body
    html: "<b>i am deaa</b>", // html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you should receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  //res.status(201).json("sugnup successfully ... !");
};

// send mail from gmail acc
const getbill = (req, res) => {
  const { userEmail } = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };
  //connect nodemailer with gmail
  let transport = nodemailer.createTransport(config);
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });
  let response = {
    body: {
      name: "Daily Tuition",
      intro: "your bill has arrived",
      table: {
        data: [
          {
            item: "nodemailer stack book",
            descriptipn: "A backend application",
            price: "$10.99",
          },
        ],
      },
      outro: "Lookin forward to do more busneiss",
    },
  };
  let mail = MailGenerator.generate(response);
  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "place order",
    html: mail,
  };
  transport
    .sendMail(message)
    .then(() => {
      returnres.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  res.status(201).json("getbill successfully ... !");
};

module.exports = {
  signup,
  getbill,
};
