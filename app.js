const express = require("express");
const app = express();
PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use("./assets/uploads", express.static("uploads"));
require("./src/routes/advertisement")(app);

app.listen(PORT, () => {
  console.log("server is running o port",PORT);
});
