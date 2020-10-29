const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Models
const Warehouse = require('./models/warehouseModel');
const Product = require('./models/productModel');
const User = require('./models/userModel');
const TokenBlackList = require('./models/tokenBlackListModel');

// Routers
const warehouseRouter = require('./routes/warehouseRouter')(Warehouse);
const productRouter = require('./routes/productRouter')(Product);
const userRouter = require('./routes/userRouter')(User, TokenBlackList);

const app = express();
const mongoURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const port = process.env.PORT || 3000;

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Register routers
const apiVersion = `/api/${process.env.API_VERSION}`;

app.use(apiVersion, warehouseRouter);
app.use(apiVersion, productRouter);
app.use(apiVersion, userRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
