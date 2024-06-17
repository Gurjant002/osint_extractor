import express, { response } from "express";
import {analyserModule, analyserCorrelation, getAllScanInstance, getCorrelationByInstanceId} from "../controller/spiderController";
const router = express.Router();

/** 
 * This endpoint allows you to check the connection.
 */
router.get("/spiderman", (req, res) => {
  res.send("Spiderman spidereman...!");
});

/**
 * This endpoint allows you to analyze a target.
 */
router.post("/analyse", (req, res) => {
  const target = req.body.target;
  const module = req.body.moduls;
  
  console.log('Analysing target.');
  const result = analyserModule(target, module)
  res.json(result);
});

/**
 * This endpoint does not work.
 * It will serve to extract only the correlations of a given target.
 */
router.post("/correlation", (req, res) => {
  const target = req.body.target;
  const module = req.body.correlation_moduls;
  res.json(analyserCorrelation(target, module));
});

/**
 * Extracts all records from the tbl_scan_instance table.
 */
router.get("/", (req, res) => {
  const result = getAllScanInstance();
  result.then((data) => {
    res.send(data);
  });
})

/**
 * Filter and extract an instance of the scan_instance_id table.
 */
router.get("/correlacion-by-instance-id/", (req, res) => {
  const id = (req.query.id).toString();
  
  const result = getCorrelationByInstanceId(id);
  result.then((data) => {
    res.send(data);
  });
})


export default router;