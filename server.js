import http from "node:http";
import { URL } from "node:url";

function start(route) {
  function onRequest(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathname = url.pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

export default {
  start,
};
