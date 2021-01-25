projectData = {};

const port = 4000;

// Express, cors and body-parser
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('website'));

app.listen(port, () => {
  console.log(`Server is runnin on ${port}`);
});

app.get('/all', (req, res) => {
  res.send(projectData);
});

app.post('/storedata', postData);

function postData(req, res) {
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.userFeelings = req.body.userFeelings;
  res.end();
  console.log(projectData);
}