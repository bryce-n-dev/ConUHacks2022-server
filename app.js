// server.js
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
require('dotenv').config();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();
const port = process.env.PORT;

const images = ['https://pbs.twimg.com/media/EXXzwbeUcAIZk91.jpg', //pikachu sunglasses
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.aPIumJIQpY6PP3of3DkQbwHaHR%26pid%3DApi&f=1', //is for you
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cac7b1b7-b0bd-4e3f-81cd-28b25f259e26/ddyt3zv-facd84dc-69cf-438a-ab17-2c23d91fb31d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NhYzdiMWI3LWIwYmQtNGUzZi04MWNkLTI4YjI1ZjI1OWUyNlwvZGR5dDN6di1mYWNkODRkYy02OWNmLTQzOGEtYWIxNy0yYzIzZDkxZmIzMWQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.9f8swZ_uuXS9AZpr3L2eW155x9sT2u7gF6gNxogxX84', //pikachu heart
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRecNnYHAJj_rzW_fmVL2qZw_CQCh0ko6uwdA&usqp=CAU', //pikachu
  'https://i2-prod.mirror.co.uk/incoming/article25609261.ece/ALTERNATES/s615b/0_PUSS-IN-BOOTS.jpg', //puss in boots
  'https://i.pinimg.com/564x/07/80/c7/0780c7351058353aa8678a5caa4b909f.jpg', //care bears
  'https://pbs.twimg.com/media/ECf1BMhU0AUfkHy?format=jpg&name=900x900', //cat with hearts
  'https://cdn140.picsart.com/347779776083201.png', //adventure time
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1BBQ-JB5DXhXi9iVSIsOMj9cEg_LIE8gCSA&usqp=CAU', //spongebob uwu face
  'https://inspirationfeed.com/wp-content/uploads/2020/05/Reaction-Meme-54.jpg', //spongebob heart binoculars
  'https://a.wattpad.com/useravatar/svnfluwur.256.301453.jpg', //powerpuff girl
  'https://i.pinimg.com/736x/70/77/fb/7077fbc7a4a18f96292bda184cb1e1fb.jpg', //kirby
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTH7guFCH_xEcDKhOeLhXBntGAgRT3HUK_DQ&usqp=CAU', //jake the dog
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});

//https://www.twilio.com/blog/send-an-sms-react-twilio
app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.To,
      body: `${req.body.Body}\n\n-sent anonymously from the compliments app :)`,
      mediaUrl: [images[Math.floor(Math.random() * images.length)]]
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});
