const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./app/models');

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.static("public"));
// parse requests of content-type - application/json
app.use(bodyParser.json()); 
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to the database!");

})
.catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});

const productRoute = require('./app/routes/product.routes');
app.use("/products", productRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});