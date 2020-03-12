exports.inclueImgLink = (req, res) => {
  var url = req.protocol + "://" + req.get("host") + req.originalUrl;
  return res.data.files.map(file => {
    let rFile = {};
    rFile["key"] = file.id;
    rFile["name"] = file.name;
    rFile["desc"] = file.description;
    rFile["image"] = new URL("/" + file.id, url);
    rFile["alt"] = file.name;
    return rFile;
  });
};
