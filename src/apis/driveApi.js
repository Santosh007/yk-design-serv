const { google } = require("googleapis");
const credentials = require("../utils/credentials");

// If modifying these scopes, delete token.json.
const SCOPES = [
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.readonly"
];

const auth = new google.auth.JWT(
  process.env.client_email,
  null,
  credentials.private_key,
  SCOPES
);
//files(name, webViewLink)
exports.fields = {
  fields: "files(name, id, description, mimeType)",
  q: "mimeType='image/jpeg'"
};

exports.folders = {
  fields: "files(name, id, description, mimeType)",
  q: "mimeType = 'application/vnd.google-apps.folder'"
};

exports.fieldsByQueryParam = type => {
  return type ? this.imgFilesByParentId : this.foldersByParentId;
};

exports.folderByName = name => ({
  fields: "files(name, id, description, mimeType)",
  q: `name = '${name}' and mimeType = 'application/vnd.google-apps.folder'`
});

exports.filesByParentId = id => ({
  fields: "files(name, id, description, mimeType)",
  q: `'${id}' in parents`
});

exports.foldersByParentId = id => ({
  fields: "files(name, id, description, mimeType)",
  q: `'${id}' in parents and mimeType = 'application/vnd.google-apps.folder'`
});

exports.imgFilesByParentId = id => ({
  fields: "files(name, id, description, mimeType)",
  q: `'${id}' in parents and mimeType='image/jpeg'`
});

exports.drive = google.drive({ version: "v3", auth });
