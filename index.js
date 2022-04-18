const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    // 'mongodb://amjmongodb:4yokJPY5A0tg32Uqpt1GDnPR2iHgnWfAaOFhb0JeZVG2Vi3JF376WeCXRE8e7wwJTnbmN6IA9D3W5qKIeFYBtw==@amjmongodb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@amjmongodb@/docker-node-mongo',
    'mongodb://testappmongo:FOxtsVRj2QKeGNmAO5OJEmB12donVumJkzjffrmIhKmG9lJEbMOqQXvHV0JJjV553mHfcFT0HXt7BEMGdyyINA==@testappmongo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@testappmongo@',{
      useNewUrlParser: true,
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/Item');

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
