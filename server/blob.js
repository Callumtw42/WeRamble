const { BlobServiceClient, ContainerClient } = require('@azure/storage-blob');
const { v1: uuid } = require('uuid');
var ReadableData = require('stream').Readable;
const fs = require('fs');

const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=weramble;AccountKey=vTiBSla5pbWA0zxj3YTbAhjtDQcs2SPJ/XgKB44TjMPnKmBbW1CcX853ZGzduApqU58TjIAy9WKDbQ5HyBrgMA==;EndpointSuffix=core.windows.net'

function uploadBlob(base64) {
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
    return uri;
}

module.exports = {
    uploadBlob: uploadBlob
}