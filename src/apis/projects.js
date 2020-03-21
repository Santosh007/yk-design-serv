var driveApi = require("./driveApi");
var promise = require("../utils/promise");
var helpers = require("../utils/helpers");

const projects = router => {
  router.get("/projects", (req, res, next) => {
    promise
      .promiseFetchFiles(driveApi.fields, driveApi.drive)
      .then(dres => {
        //res.send(dres.data.files);
        res.send(helpers.inclueImgLink(req, dres, "/apis/project/file/"));
      })
      .catch(err => {
        throw err;
      });
  });

  //This api will return the Project folders by passing the folder name
  router.get("/projects/:name", (req, res, next) => {
    promise
      .promiseFetchFiles(driveApi.folderByName(req.params.name), driveApi.drive)
      .then(dres => {
        //res.send(dres);
        if (dres.data.files.length) {
          promise
            .promiseFetchFiles(
              driveApi.filesByParentId(
                dres.data.files.length ? dres.data.files[0].id : 1
              ),
              driveApi.drive
            )
            .then(fres => {
              //fres.data.files.map(file => {});
              //res.send(fres);
              res.send(
                helpers.includeFolderCoverImageLink(
                  req,
                  fres,
                  "/apis/project/file/"
                )
              );
            })
            .catch(ferr => {
              throw ferr;
            });
        } else {
          res.send(helpers.emptyResponse());
        }
      })
      .catch(derr => {
        throw derr;
      });
  });

  router.get("/project/:name", (req, res, next) => {
    promise
      .promiseFetchFiles(driveApi.folderByName(req.params.name), driveApi.drive)
      .then(dres => {
        if (dres.data.files.length) {
          promise
            .promiseFetchFiles(
              driveApi.imgFilesByParentId(dres.data.files[0].id),
              driveApi.drive
            )
            .then(ires => {
              res.send(helpers.inclueImgLink(req, ires, "/apis/project/file/"));
            })
            .catch(ierr => {
              throw ierr;
            });
        } else {
          res.send(helpers.emptyResponse);
        }
      })
      .catch(derr => {
        throw derr;
      });
  });

  router.get("/project/file/:id", (req, resp, next) => {
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

module.exports = projects;
