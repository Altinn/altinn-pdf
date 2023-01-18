/*
    Test script to platform pdf generator api via a test app
    Command: docker-compose run k6 run /src/tests/pdf-generator.js 
        -e templateName=[simple|apps-test|vg]
        -e returnHtml=false
        -e env=***

*/
import { check } from "k6";
import exec from "k6/execution";
import * as pdfLoadTestApp from "../api/pdf-load-test-app.js";
import { k6scenarios } from '../scenarios.js';

const envName = __ENV.env;
const executor = __ENV.executor;
const vus = __ENV.vus ? parseInt(__ENV.vus) : 1;
const iterations = __ENV.iter ? parseInt(__ENV.iter) : 1;
const maxDuration = __ENV.duration ? __ENV.duration : '10m';
const stages = __ENV.stages ? __ENV.stages : '10s:1';
const templateName = __ENV.template ? __ENV.template : 'simple';
const returnHtml = __ENV.returnHtml ? __ENV.returnHtml : true;

const scenario = k6scenarios(executor, vus, iterations, maxDuration, stages);

export const options = {
  thresholds: {
    errors: ['count<1'],
    // LoadInstances: ['p(95)<2000', 'avg<1500'],
  },
  scenarios: scenario,
};

export default function () {
  var response, success;

  response = pdfLoadTestApp.generatePdf(templateName, returnHtml);

  check(response, {
    "Response code indicates success": (response) => response.status == 200,
  });

  if (returnHtml == true) {
    check(response, {
        "response has sufficient length": (response) => response.body.length >= 1024 });
  }

//   console.log(
//      `${exec.vu.idInTest} ${envName} ${templateName}: ${response.status} dur: ${String(response.timings.duration)}`
//   );
}
