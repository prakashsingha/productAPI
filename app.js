const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Models
const Warehouse = require('./models/warehouseModel');
const Product = require('./models/productModel');
const User = require('./models/userModel');

// Routers
const warehouseRouter = require('./routes/warehouseRouter')(Warehouse);
const productRouter = require('./routes/productRouter')(Product);
const userRouter = require('./routes/userRouter')(User);

const app = express();
const mongoURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const port = process.env.PORT || 3000;

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Register routers
const apiVersion = 'v1';
app.use(`/api/${apiVersion}`, warehouseRouter);
app.use(`/api/${apiVersion}`, productRouter);
app.use(`/api/${apiVersion}`, userRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
