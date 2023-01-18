import http from "k6/http";
import { stopIterationOnFail } from "../errorhandler.js";

import * as config from "../config.js";

export function generatePdf(templateName, returnHtml) {
  var endpoint = config.baseUrl + `generate?html=${templateName}&returnHtml=${returnHtml}`;

  var response = http.get(endpoint);

  if (response.status != 200) {
    stopIterationOnFail(`GET from ${endpoint} failed`, false, response);
  }

  return response;
}
