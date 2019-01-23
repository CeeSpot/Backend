let express = require('express');
let cors = require('cors');
let app = express();
let port = process.env.PORT || 3000;
let bodyParser = require('body-parser');

const fs = require('fs');
const http = require('http');
const https = require('https');



// Certificate
if (false) {
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/vps437.directvps.nl/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/vps437.directvps.nl/cert.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/vps437.directvps.nl/chain.pem', 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };

  app.use(cors());

  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);

  httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
  });

  httpsServer.listen(3000, () => {
    console.log('HTTPS Server running on port 443');
  });
} else {
  app.use(cors());
  app.listen(port);
}

app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


let users = require('./api/routes/UserRoutes'); //importing route
let companies = require('./api/routes/CompanyRoutes'); //importing route
let events = require('./api/routes/EventRoutes'); //importing route
let tags = require('./api/routes/TagRoutes'); //importing route
let socialMedia = require('./api/routes/SocialMediaRoutes'); //importing route
let blogs = require('./api/routes/BlogRoutes'); //importing route
let fileUpload = require('./api/routes/FileUploadRoutes');
let spaces = require('./api/routes/SpaceRoutes'); //importing route
let admin = require('./api/routes/AdminRoutes'); //importing route
let auth = require('./api/routes/AuthorisationRoutes'); //importing route
let contact = require('./api/routes/ContactRoutes');

users(app);
companies(app);
tags(app);
events(app);
socialMedia(app);
blogs(app);
spaces(app);
fileUpload(app);
admin(app);
auth(app);
contact(app);

console.log('the cee spot RESTful API server started on: ' + port);