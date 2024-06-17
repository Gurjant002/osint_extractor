import fs from "fs";
import {exec} from "child_process";
import sqlite from "sqlite3";

const dbFile = '/home/gsingh/.spiderfoot/spiderfoot.db'
const dbExists = fs.existsSync(dbFile)
if (!dbExists) {
  fs.openSync(dbFile, 'w')
}

const db = new sqlite.Database(dbFile, (err) => {
  if (err) {
    console.error(err.message)
  }
  console.log('Connected to the spiderfoot database.')
})

/**
 * This function executes a python file in order to analyze a target.
 * The function requires two parameters, one is the target and the other is a list of module names to be parsed.
 * @param target 
 * @param module 
 */
function analyserModule(target: string = "coremoney.com", module: string[] = ["sfp_dnsresolve"]) {
  exec(`python3 spiderfoot/sf.py -m ${module} -s ${target} -o json >> results/${target}_module_result.json`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return error.message;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return stderr;
    }
    return stdout
  })

}

/**
 * Function under development.
 * This function executes a python file with the purpose of parsing a target.
 * The function requires two parameters, one is the target and one parameter as a list of correlation names for spiderfoot.
 * 
 * @param target 
 * @param module 
 */
function analyserCorrelation(target: string = "coremoney.com", module: string[] = ["sfp_dnsresolve"]) {
  exec(`python3 spiderfoot/sf.py --correlate ${module} -s ${target} -o json > results/${target}_correlation_result.json`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return error.message;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return stderr;
    }
    return stdout
  })

}

/**
 * This function returns all records in the tbl_scan_instance table.
 * @returns 
 */
function getAllScanInstance(){
  const getAllScanInstance = "SELECT * FROM tbl_scan_instance;"
  const getResult = getAllScanInstance => new Promise((resolve, reject) => {
    db.all(getAllScanInstance, (err, rows) => {
      if (err) {
        reject(err)
      }
      resolve(rows)
    })
  })
  const result = getResult(getAllScanInstance)
  return result
}

/**
 * This function requires an id to extract the related records in the scan_instance_id table.
 */
function getCorrelationByInstanceId(guid: string) {

  const getCorrelationByInstanceId = `SELECT * FROM tbl_scan_correlation_results WHERE scan_instance_id = ?;`
  const gerResult = getCorrelationByInstanceId => new Promise((resolve, reject) => {
    db.get(getCorrelationByInstanceId, guid, (err, rows) => {
      if (err) {
        reject(err)
      }
      resolve(rows)
    })
  })
  const result = gerResult(getCorrelationByInstanceId)
  return result
}

// db.close()
export {analyserModule, analyserCorrelation, getAllScanInstance, getCorrelationByInstanceId};
// python3 spiderfoot/sf.py -m sfp_dnsresolve -s binarypool.com -o json >> test.json