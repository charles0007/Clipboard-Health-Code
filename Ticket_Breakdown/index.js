const express = require("express");
const app = express();

const routes=require("./routes");

app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

app.use("/", routes);


app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

const port = process.env.PORT || 8080; 

app.listen(port, () => console.log(`Server running on port ${port}`));


