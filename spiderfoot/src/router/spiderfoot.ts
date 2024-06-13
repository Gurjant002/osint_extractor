import express, { response } from "express";
import {analyser_module, analyser_correlation} from "../controller/spiderController";
const router = express.Router();

router.get("/spiderman", (req, res) => {
  res.send("Spiderman spidereman...!");
});

router.post("/analyse", (req, res) => {
  const target = req.body.target;
  const module = req.body.moduls;
  console.log(module);
  res.send(analyser_module(target, module));
});

router.post("/correlation", (req, res) => {
  const target = req.body.target;
  const module = req.body.correlation_moduls;
  console.log(module);
  res.send(analyser_correlation(target, module));
});

export default router;