const express = require('express');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/contact/send', (req, res) => res.status(204));
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));
 
  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


app.post('/contact/send', (req, res) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'portfoliocontacts@gmail.com',//process.env.DB_USER,
      pass: 'clients&&employees123$',
      xoauth2: xoauth2.createXOAuth2Generator({
        clientId: '452162742658-0404j7th55g9v6frvhabdnl4l156bf4j.apps.googleusercontent.com', //process.env.DB_CLIENTID,
        clientSecret: 'WcP34P0hgMf4b4IaqIgIylRH',
        refreshToken: '1/rAMm6NMRPDLG6VnvDeP2DQtgEpT6Vz80pLzCpFZoQZI' //process.env.DB_REFRESH
      })
    }
  });

  const mailOptions = {
    from: `${req.body.email}`,
    to: 'drordvash4@gmail.com',
    subject: `${req.body.name}`,
    text: `${req.body.message}`,
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Email Sent', res.data);
    }
  });

  res.status(202).send(res.data);
  

});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
