import http from "node:http";
import { URL } from "node:url";

function start(route, handle) {
  function onRequest(request, response) {
    let postData = "";
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathname = url.pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    request.addListener("data", (postDataChunk) => {
      postData += postDataChunk;
      console.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    request.addListener("end", () => {
      route(handle, pathname, response, postData);
    });
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

export default {
  start,
};
