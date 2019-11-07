if(process.env.NODE_ENV == 'development') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const app = express();
const errorH = require('./middlewares/errorHandler.js');
const index = require('./routes/index.js');


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
  .then(() => console.log(`connect to mongo db`))
  .catch(console.log)

app.use('/', index);

app.use(errorH);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))