import express from "express";
import spiderFoot from "./router/spiderfoot";

const app = express();
app.use(express.json());
const port = 3000;

app.use("/spiderfoot", spiderFoot);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});