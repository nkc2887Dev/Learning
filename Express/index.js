const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  res.status(200).send("Domain is working fine.");
});

app.use("/", require("./routes/index"));

app.listen(port, () => {
  console.info(`server listen on : http://localhost:${port}`);
});
