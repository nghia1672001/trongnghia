/* Them Route - Logic */
const loginRouter = require("./router/login");
const changeimageRouter = require("./router/userinfomodify");
const registerRouter = require("./router/register");
const changepasswordRouter = require("./router/changepassword")
const addbook = require("./router/addbook")
const books = require("./router/book")
const increase = require("./router/increaseview")
const comment = require("./router/addcomment");
/* Them thu vien */
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

/* set up service */
const app = express(); //express
const port = 4000;

app.use(cors()); //cors
app.use(express.json()); // express type, su dung json de thuc hien nhan/gui request

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoAtles connection successfully!!")
);


/* Xu ly logic */
app.use("/user", loginRouter);
app.use("/userinfo", changeimageRouter);
app.use("/register", registerRouter);
app.use("/changepass", changepasswordRouter);
app.use("/add", addbook);
app.use("/books", books);
app.use("/luotxem", increase);
app.use("/comment", comment);
/* port cua web service */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})