const { queryDatabase } = require("./azure.js");
const { sendVerificationEmail } = require("./emailer.js")
const { port } = require("../utils.js")
const { quote } = require("../utils.js");
const express = require('express');
const path = require('path');
const fs = require('fs');
const { BlobServiceClient, ContainerClient } = require('@azure/storage-blob');
const { v1: uuid } = require('uuid');
var bodyParser = require('body-parser')
var ReadableData = require('stream').Readable;
const readFile = (file) => { return fs.readFileSync(path.resolve(__dirname, file), { encoding: "UTF-8" }) };

const app = express();
app.use(bodyParser({ limit: '50mb' }));

var jsonParser = bodyParser.json()

const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=weramble;AccountKey=vTiBSla5pbWA0zxj3YTbAhjtDQcs2SPJ/XgKB44TjMPnKmBbW1CcX853ZGzduApqU58TjIAy9WKDbQ5HyBrgMA==;EndpointSuffix=core.windows.net'

//test
app.get('/api/test', (req, res) => {
    let query = `select * from weramble.test`;
    queryDatabase(req, res, query);
});

//register
app.get('/api/register/:email/:username/:password', (req, res) => {
    const { email, username, password } = req.params;
    let query = `insert into weramble.users(username, password, email) values ('${username}', '${password}', '${email}');`;
    queryDatabase(req, res, query);
    sendVerificationEmail();
});

//feed
app.get('/api/feed', (req, res) => {
    let query = readFile("sql/feed.sql")
    queryDatabase(req, res, query);
});

//login
app.get('/api/login/:username/:password', (req, res) => {
    const { username, password } = req.params;

    let query = readFile("sql/login.sql")
        .replace("${username}", quote(username))
        .replace("${email}", quote(username))
        .replace("${password}", quote(password))
    queryDatabase(req, res, query);
});

//load user's images 
app.get('/api/user-images/:uploader', (req, res) => {
    const { uploader } = req.params;
    console.log(req.params);
    let query = readFile("sql/user-images.sql")
        .replace("${uploader}", quote(uploader))
    queryDatabase(req, res, query);
});

//post comment
app.post('/api/postcomment', (req, res) => {
    const { comment, user, post } = req.body;
    console.log(req.body);
    let query = readFile("sql/post-comment.sql")
        .replace("${comment}", quote(comment))
        .replace("${uploader}", quote(user))
        .replace("${post}", quote(post))
    queryDatabase(req, res, query);
});

//get comments
app.get('/api/getcomments/:imageid', (req, res) => {
    const imageid = req.params.imageid;
    let query = readFile("sql/get-comment.sql")
        .replace("${post}", quote(imageid))
    queryDatabase(req, res, query);
});

//upload
app.post('/api/upload', jsonParser, (req, res) => {
    // console.log(req.body.file)
    const { data } = req.body
    const base64 = data.base64;
    const imageBufferData = Buffer.from(base64, 'base64');

    // Create a unique name for the blob
    const blobName = Date.now().toString() + '.jpg';

    var streamObj = new ReadableData();

    streamObj.push(imageBufferData);
    streamObj.push(null);
    streamObj.pipe(fs.createWriteStream(blobName));
    console.log(streamObj);

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    // Create a unique name for the container
    const containerName = 'images';

    console.log('\nCreating container...');
    console.log('\t', containerName);

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    console.log('\nUploading to Azure storage as blob:\n\t', blobName);

    // Upload data to the blob
    const uploadBlobResponse = blockBlobClient.upload(imageBufferData, imageBufferData.length);
    console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);

    console.log(Date.now().toString());
    const uri = `https://weramble.blob.core.windows.net/images/${blobName}`
    let query = readFile("sql/upload.sql")
        .replace("${uri}", quote(uri))
        .replace("${uploader}", quote("demo"))
    queryDatabase(req, res, query);
});

//listen
app.listen(port, (err) => {
    if (err) throw err;
    else console.log(`Server started on port ${port}`);
});