const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const authRoutes = require('./routes/auth');

const port = process.env.PORT || 8000;
const app = express();
// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('DB connected'));

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// middleware

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// route middleware
app.use('/api', authRoutes);

app.use(express.static('./client/build'));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
