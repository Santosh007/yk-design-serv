var fs = require("fs");

exports.promiseFileRead = function(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

exports.promiseFetchFiles = (fields, drive) => {
  return new Promise((resolve, reject) => {
    drive.files.list(fields, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.promiseFetchFileChildren = (fields, drive) => {
  return new Promise((resolve, reject) => {
    drive.children.list(fields, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.promiseSaveFiles = (drive, files) => {
  files.map(file => {
    let dest = fs.createWriteStream("/media/archi/" + file.name + ".jpg");
    return new Promise((resolve, reject) => {
      drive.files
        .get({ fileId: file.id, alt: "media" })
        .on("end", function() {
          //console.log("Done");
          resolve("Done");
        })
        .on("error", function(err) {
          //console.log("Error during download", err);
          reject(err);
        })
        .pipe(dest);
    });
  });
};

exports.promiseRequest = url => {
  return new Promise((resolve, reject) => {
    request(url, { timeout: 210000 }, (err, resp, body) => {
      if (err) reject(err);
      resolve(body);
    });
  });
};

const request = (url, options, func) => {};
