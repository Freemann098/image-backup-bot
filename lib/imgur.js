const https = require('https');
const imgurClientId = process.env.IMGUR_CLIENT_ID;

module.exports = {
    uploadImage: (url) => {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: 'api.imgur.com',
                path: '/3/image',
                headers: { 'Authorization': 'Client-ID ' + imgurClientId },
                method: 'POST'
            }

            let req = https.request(options, (res) => {
                let chunks = [];

                res.on('data', (d) => {
                    chunks.push(d);
                });
                res.on('error', (error) => {
                    reject('Https request error: ' + error);
                });
                res.on('end', () => {
                    let body = Buffer.concat(chunks);
                    body = JSON.parse(body.toString());
                    console.log(body);
                    if (body.data.link) {
                        resolve(body.data.link)
                    } else {
                        reject('body.data.link is undefined');
                    }
                });
            });

            let postData = url;
            req.setHeader('content-type', 'multipart/form-data');
            req.write(postData);
            req.end();
        })
    }
};