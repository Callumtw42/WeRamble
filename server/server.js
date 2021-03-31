const { queryDatabase } = require("./azure.js");
const { uploadBlob } = require("./blob");
// const { sendVerificationEmail } = require("./emailer.js")
const express = require('express');
const path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser')
const readFile = (file) => { return fs.readFileSync(path.resolve(__dirname, file), { encoding: "UTF-8" }) };
const { sendEmail } = require('./sendEmail')
var https = require('https');
const { get, post, host } = require("../utils.js");

const app = express();
app.use(bodyParser({ limit: '50mb' }));

var jsonParser = bodyParser.json()


const quote = (string) => {
    return `'${string}'`
}

//test
app.get('/api/test', (req, res) => {
    let query = `select * from weramble.test`;
    queryDatabase(req, res, query);
});

//get-profile-pic
app.get('/api/get-profile-pic/:username', (req, res) => {
    console.log(req.params)
    const { username } = req.params;
    let query = readFile("./sql/get-profile-pic.sql")
        .replace("${username}", quote(username))
    queryDatabase(req, res, query);
})

//post-profile-pic
app.post('/api/post-profile-pic', (req, res) => {
    console.log(req.body)
    const { image, username } = req.body;
    const uri = uploadBlob(image);

    let query = readFile("./sql/post-profile-pic.sql")
        .replace("${uri}", quote(uri))
        .replace("${username}", quote(username))
    queryDatabase(req, res, query);
});

//register
app.post('/api/register', (req, res) => {
    const { email, username, password } = req.body;
    console.log(req.body);
    let query = `insert into weramble.users(username, password, email) values ('${username}', '${password}', '${email}');`;
    queryDatabase(req, res, query);
    sendEmail(email);
});

//feed
app.get('/api/feed', (req, res) => {
    let query = readFile("sql/feed.sql")
    queryDatabase(req, res, query);
});

//login
app.get('/api/login/:username/:password', (req, res) => {
    console.log("LOGIN")
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

//getlikes
app.get('/api/getlikes/:imageid/:user', (req, res) => {
    const { imageid, user } = req.params;
    console.log("getLikes: " + imageid);
    let query = readFile("sql/get-likes.sql")
        .replace("${post}", quote(imageid))
        .replace("${post}", quote(imageid))
        .replace("${username}", quote(user))
    queryDatabase(req, res, query);
});

//like
app.post('/api/like', (req, res) => {
    console.log("like: " + req.body.like)
    const { imageid, user, like } = req.body
    query = like
        ? readFile("sql/like.sql")
            .replace("${user}", quote(user))
            .replace("${post}", quote(imageid))
        : readFile("sql/unlike.sql")
            .replace("${username}", quote(user))
            .replace("${post}", quote(imageid))
    console.log(query);
    queryDatabase(req, res, query);
});

//follow
app.post('/api/follow', (req, res) => {
    console.log(req.body)
    const { followed, follower, following } = req.body
    if (followed) {
        const query = readFile("sql/follow.sql")
            .replace("${follower}", quote(follower))
            .replace("${follows}", quote(following))
        console.log(query);
        queryDatabase(req, res, query, () => { res.json([{ followed: true }]) });
    }
    else {
        const query = readFile("sql/unfollow.sql")
            .replace("${follower}", quote(follower))
            .replace("${follows}", quote(following))
        console.log(query);
        queryDatabase(req, res, query, () => { res.json([{ followed: false }]) });
    }
});

//followers
app.get('/api/get-followers/:user', (req, res) => {
    console.log(req.params);
    const { user } = req.params;
    const query = readFile("./sql/get-follows.sql")
        .replace("${username}", quote(user))
    console.log(query);
    queryDatabase(req, res, query)
});

//following
app.get('/api/get-following/:user', (req, res) => {
    console.log(req.params);
    const { user } = req.params;
    const query = readFile("./sql/get-following.sql")
        .replace("${username}", quote(user))
    console.log(query);
    queryDatabase(req, res, query) / get
});

//followed
app.get('/api/followed/:follower/:following', (req, res) => {
    console.log(req.params);
    const { follower, following } = req.params;
    const query = readFile("./sql/followed.sql")
        .replace("${follower}", quote(follower))
        .replace("${following}", quote(following))
    console.log(query);
    queryDatabase(req, res, query);

});


//competitions
app.get('/api/competitions', (req, res) => {
    const query = readFile('sql/get-competitions.sql')
    queryDatabase(req, res, query);
});

//post competition
app.post('/api/post-competition', (req, res) => {
    const { name, hostUser, description, image, buyin } = req.body;
    console.log(req.body)
    const query = readFile('sql/post-competition.sql')
        .replace('${hostUser}', quote(hostUser))
        .replace('${name}', quote(name))
        .replace('${description}', quote(description))
        .replace('${image}', quote(image))
        .replace('${buyin}', quote(buyin))
    console.log(query);
    queryDatabase(req, res, query, () => (res.json("SUCCESS")));
});

//competition-entries
app.get('/api/get-competition-entries/:competition', (req, res) => {
    const { competition } = req.params;
    const dummy = [{
        uri: "https://weramble.blob.core.windows.net/images/download (7).jpg"
    }]
    const query = readFile('sql/get-competition-entries.sql')
        .replace('${competition}', quote(competition))
    queryDatabase(req, res, query, () => (res.json("SUCCESS")));
});

//post-competition-entry
app.post('/api/post-competition-entry', (req, res) => {
    console.log(req.body);
    const { name, image, uploader } = req.body;
    const query = readFile('sql/post-competition-entry.sql')
        .replace('${name}', quote(name))
        .replace('${uri}', quote(image))
        .replace('${uploader}', quote(uploader))
    queryDatabase(req, res, query);
})

//update prize pool
app.post('/api/update-prize-pool', (req, res) => {
    console.log(req.body);
    const { name, uploader } = req.body;
    const query = readFile('sql/update-prize-pool.sql')
        .replace('${name}', quote(name))
        .replace('${uploader}', quote(uploader))
    queryDatabase(req, res, query);
})

//upload
app.post('/api/upload', jsonParser, (req, res) => {
    const { data, uploader } = req.body
    const base64 = data.base64;
    const uri = uploadBlob(base64);
    let query = readFile("sql/upload.sql")
        .replace("${uri}", quote(uri))
        .replace("${uploader}", quote(uploader))
    queryDatabase(req, res, query, () => { res.json([{ uri: uri }]) });
    console.log(res)
});

//listen
// https.createServer({
//     key: fs.readFileSync('./ssl/server.key'),
//     cert: fs.readFileSync('./ssl/server.cert')
// }, app)
app.listen(8080, '0.0.0.0', (err) => {
    if (err) throw err;
    else {
        console.log(`Server started on port 8080`);
        console.log("Please log into app to Connect to db")
    }
});