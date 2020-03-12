exports.inclueImgLink = (req, res) => {
  let url = "https://" + req.get("host") + "/apis/archi";
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
