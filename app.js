const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const Warehouse = require('./models/warehouseModel');
const warehouseRouter = require('./routes/warehouseRouter')(Warehouse);

const app = express();
const mongoURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const port = process.env.PORT || 3000;

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routers
const apiVersion = 'v1';
app.use(`/api/${apiVersion}`, warehouseRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
