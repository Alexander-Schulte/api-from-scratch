const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    "/courses": "nothing yet",
  });
});

app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
