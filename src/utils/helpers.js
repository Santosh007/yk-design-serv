exports.inclueImgLink = (req, res, path) => {
  let url = "https://" + req.get("host");
  //"/apis/archi/"
  return res.data.files.map(file => {
    let rFile = {};
    rFile["key"] = file.id;
    rFile["name"] = file.name;
    rFile["desc"] = file.description;
    rFile["image"] = new URL(path + file.id, url).href;
    rFile["alt"] = file.name;
    return rFile;
  });
};

exports.includeFolderCoverImageLink = (req, res, path) => {
  let url = "https://" + req.get("host");
  let folders = res.data.files.filter(file => {
    return file.mimeType === "application/vnd.google-apps.folder";
  });
  return folders.map(folder => {
    let rFolder = {};
    let file = res.data.files.find(
      file => file.name === folder.name && file.mimeType === "image/jpeg"
    );
    rFolder["key"] = folder.id;
    rFolder["name"] = folder.name;
    rFolder["desc"] = folder.description;
    rFolder["image"] = file ? new URL(path + file.id, url).href : "";
    rFolder["alt"] = folder.name;
    return rFolder;
  });
};

exports.emptyResponse = () => ({ data: [] });
