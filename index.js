import fs from 'node:fs';
import http from 'node:http';

const server = http.createServer((req, res) => {
  /*
  Extract the requested url
  */
  const serverUrl = req.url;

  /*
  Map requested serverUrls to file paths
  */
  let filePath = '';

  /*
  Logic For serverUrl to FilePath
  */
  switch (serverUrl) {
    case '/':
    case '/index.html':
      filePath = 'public/index.html';
      break;
    case '/memes':
    case '/memes/index.htm':
      filePath = 'public/memes/index.htm';
      break;
    case '/1.jpg':
      filePath = 'public/memes/01.jpg';
      break;
    case '/index.css':
      filePath = 'public/index.css';
      break;
    default:
      // Handle file read error (File not found)
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File Not Found');
      return;
  }

  /*
  Logic writing content with correct contentType
  */
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Handle file read error as requested (File not found)
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File Not Found');
    } else {
      // Set correct contentType for files to write
      let contentType = 'text/html';
      if (filePath.endsWith('.jpg')) {
        contentType = 'image/jpeg';
      } else if (filePath.endsWith('.css')) {
        contentType = 'text/css';
      }

      if (fs.existsSync(filePath)) {
        // Write 404 Error as response
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File Not Found');
      }

      // Write file as response with appropriate contentType
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
