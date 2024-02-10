import server from "./server.js";
import router from "./router.js";

server.start(router.route);
