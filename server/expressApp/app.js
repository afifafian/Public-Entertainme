const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(PORT, () => {
  console.log("app is running on port " + port);
});