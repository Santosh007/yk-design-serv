exports.inclueImgLink = (req, res) => {
  let url = "https://" + req.get("host");

  return res.data.files.map(file => {
    let rFile = {};
    rFile["key"] = file.id;
    rFile["name"] = file.name;
    rFile["desc"] = file.description;
    rFile["image"] = new URL("/apis/archi/" + file.id, url).href;
    rFile["alt"] = file.name;
    return rFile;
  });
};
