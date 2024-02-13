import fs from "node:fs";
import formidable from "formidable";

function start(response) {
  console.log("Request handler 'start' was called.");

  const body = `
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      </head>
      <body>
        <form action="/upload" method="post" enctype='multipart/form-data'>
        <input type="file" name="upload" />
        <input type="submit" value="Upload file" />
        </form>
      </body>
    </html>
  `;

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  const form = formidable({});
  console.log("about to parse");

  form.parse(request, (error, fields, files) => {
    console.log("parsing done", files);

    const uploadedFile = files.upload[0];
    fs.renameSync(uploadedFile.filepath, "./tmp/test.jpeg");

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("./tmp/test.jpeg", "binary", (error, file) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, { "Content-Type": "image/jpeg" });
      response.write(file, "binary");
      response.end();
    }
  });
}

export default {
  start,
  upload,
  show,
};
