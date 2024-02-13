import { exec } from "child_process";

function start() {
  console.log("Request handler 'start' was called.");

  let content = "empty";

  exec("ls -lah", (error, stdout, stderr) => {
    content = stdout;
  });

  return content;
}

function upload() {
  console.log("Request handler 'upload' was called.");
  return "Hello Upload";
}

export default {
  start,
  upload,
};
