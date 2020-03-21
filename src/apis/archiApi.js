var driveApi = require("./driveApi");
var promise = require("../utils/promise");
var helpers = require("../utils/helpers");

const archiApi = router => {
  router.get("/archi", (req, res, next) => {
    promise
      .promiseFetchFiles(driveApi.fields, driveApi.drive)
      .then(dres => {
        //res.send(dres.data.files);
        res.send(helpers.inclueImgLink(req, dres, "/apis/archi/"));
      })
      .catch(err => {
        throw err;
      });
  });

  router.get("/archi/:id", (req, resp, next) => {
    driveApi.drive.files.get(
      { fileId: req.params.id, alt: "media" },
      { responseType: "stream" },
      function(err, res) {
        res.data
          .on("end", () => {
            console.log("Done");
          })
          .on("error", err => {
            console.log("Error", err);
          })
          .pipe(resp);
      }
    );
  });
  return router;
};

module.exports = archiApi;
