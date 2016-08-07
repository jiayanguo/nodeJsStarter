const https = require("http");

/*https.createServer( (req, res) => {

});*/

const options = {
    hostname: "google.com",
   // port:443,
   // path: "/wiki/George_Washington",
    method: "GET"
}

const req = https.request(options, (res) => {
    console.log(res.statusCode);
})

req.on("data", (chunk) => {
    console.log(chunk.length);
}
)