const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const plants = [
  'Monstera Deliciosa',
  'Corpse Flower',
  'Elephant-Foot Yam',
  "Witches' Butter",
];

app.get('/plants', (req, res) => {
  res.send('plants route');
});

app.get('/awesome', (req, res) => {
  //this will be reached
  res.send(`
    <h1>Plants are awesome!</h1>
    <img src="https://static.boredpanda.com/blog/wp-content/uuuploads/plant-sculptures-mosaicultures-internationales-de-montreal/plant-sculptures-mosaicultures-internationales-de-montreal-14.jpg" >
  `);
});

// Dont do this, wont work. These are the same route
// app.get("/:crazyMonkey")

app.get('/howdy/:firstname', (req, res) => {
  console.log(req.query);
  res.send('hello ' + req.query.title + ' ' + req.params.firstname);
});

app.get('/add/:num1/:num2', (req, res) => {
  const { num1, num2 } = req.params;
  //req.params.num1
  if (parseInt(num1) && parseInt(num2)) {
    res
      .status(200)
      .send(
        `${parseInt(num1) + parseInt(num2)}${req.query.measurement} of ${
          req.query.material
        }`
      );
  } else {
    res.status(400).send('Param given is NaN (Not a Number)');
  }
});

app.get('/hello/:firstname/:lastname', (req, res) => {
  console.log(req.params);
  const { firstname, lastname } = req.params;
  res.send(`Hello ${firstname} ${lastname}`);
});

app.get('/:indexOfPlantsArray', (req, res) => {
  if (plants[req.params.indexOfPlantsArray]) {
    res.status(200).send(plants[req.params.indexOfPlantsArray]);
  } else {
    res
      .status(400)
      .send(
        'cannot find anything at this index: ' + req.params.indexOfPlantsArray
      );
  }
});

// app.get('/awesome', (req, res) => {
//   //this will never be reached
//   res.send(`
//     <h1>Plants are awesome!</h1>
//     <img src="https://static.boredpanda.com/blog/wp-content/uuuploads/plant-sculptures-mosaicultures-internationales-de-montreal/plant-sculptures-mosaicultures-internationales-de-montreal-14.jpg" >
//   `);
// });

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});