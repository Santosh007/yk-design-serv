var express = require("express");
var archiApi = require("./apis/archiApi");
const PORT = process.env.PORT || 8080;

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/apis", archiApi(express.Router()));
app.listen(PORT);
console.log("APPLICATION IS RUNNING ON 8080");
