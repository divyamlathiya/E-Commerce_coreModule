var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
require('dotenv').config();
var connectDB = require('./utilities/db.js');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// mongoose.connect(process.env.MONGO_URI);
// mongoose.connection.once('open', () => {
//   console.log('MongoDB connected successfully');
// }).on('error', (err) => {
//   console.log('Error:', err);
// });
connectDB();

userRoute = [
  { path: '/login', routePath: '/login' },
  { path: '/register', routePath: '/register' },
  { path: '/changePass', routePath: '/changePass' },
  { path: '/reqForResetPass', routePath: '/reqForResetPass' },
  { path: '/resetPass', routePath: '/resetPass' },
  { path: '/updateProfile', routePath: '/updateProfile' }
];

productRoute = [
  { path: '/create', routePath: '/create' },
  { path: '/read', routePath: '/read' },
  { path: '/update', routePath: '/update' },
  { path: '/delete', routePath: '/delete' },
];

categoryRoute = [
  { path: '/create', routePath: '/create' },
  { path: '/read', routePath: '/read' },
  { path: '/update', routePath: '/update' },
  { path: '/delete', routePath: '/delete' },
]

cartRoute = [
  { path: '/add', routePath: '/add' },
  { path: '/remove', routePath: '/remove' },
  { path: '/view', routePath: '/view' },
];

orderRoute = [
  { path: '/createOrder', routePath: '/createOrder' },
  { path: '/cancelOrder', routePath: '/cancelOrder' }
];

adminRoute = [
  { path: '/adminLogin', routePath: '/adminLogin' },
  { path: '/getAdminProfl', routePath: '/getAdminProfl' }
];


userRoute.forEach((a) => {
  app.use('/user' + a.path, require('./routes/user' + a.routePath));
});

productRoute.forEach((b) => {
  app.use('/product' + b.path, require('./routes/product' + b.routePath));
});

categoryRoute.forEach((c) => {
  app.use('/category' + c.path, require('./routes/category' + c.routePath));
});

cartRoute.forEach((d) => {
  app.use('/cart' + d.path, require('./routes/cart' + d.routePath));
});

orderRoute.forEach((e) => {
  app.use('/order' + e.path, require('./routes/order' + e.routePath));
});

adminRoute.forEach((f) => {
  app.use('/admin' + f.path, require('./routes/admin' + f.routePath));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
