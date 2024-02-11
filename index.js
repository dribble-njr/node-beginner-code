import server from "./server.js";
import router from "./router.js";
import requestHandlers from "./requestHandlers.js";

const handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);
