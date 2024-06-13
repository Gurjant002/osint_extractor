import {exec} from "child_process";

function analyser_module(target: string = "coremoney.com", module: string[] = ["sfp_dnsresolve"]) {
  console.log(`target: ${target}, module: ${module}`);
  
  exec(`python3 spiderfoot/sf.py -M ${module} -s ${target} -o json > ${target}_module_result.json`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return error.message;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return stderr;
    }
    console.log(`stdout: ${stdout}`);
    return stdout
  })

}

function analyser_correlation(target: string = "coremoney.com", module: string[] = ["sfp_dnsresolve"]) {
  exec(`python3 spiderfoot/sf.py --correlate ${module} -s ${target} -o json > ${target}_correlation_result.json`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return error.message;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return stderr;
    }
    console.log(`stdout: ${stdout}`);
    return stdout
  })

}

export {analyser_module, analyser_correlation};
// python3 spiderfoot/sf.py -m sfp_dnsresolve -s binarypool.com -o json >> test.json