function start() {
  console.log("Request handler 'start' was called.");

  function sleep(milliSeconds) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }

  sleep(10000);
  return "Hello Start";
}

function upload() {
  console.log("Request handler 'upload' was called.");
  return "Hello Upload";
}

export default {
  start,
  upload,
};
