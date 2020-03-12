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
  process.env.private_key,
  SCOPES
);
//files(name, webViewLink)
exports.fields = {
  fields: "files(name, id, description, mimeType)",
  q: "mimeType='image/jpeg'"
};

exports.drive = google.drive({ version: "v3", auth });
