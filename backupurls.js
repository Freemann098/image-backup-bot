let urls = [];

module.exports = {
    getUrls: () => urls,
    addUrl: (url) => urls.push(url),
    removeUrl: (url) => {
        return new Promise((resolve, reject) => {
            let urlToRemove = urls.indexOf(url);

            if (urlToRemove != -1) {
                let newArray = []

                for (let i = 0; i < urls.length; i++) {
                    if (urls[i] != urls[urlToRemove]) {
                        newArray.push(urls[i]);
                    }
                }
                urls = newArray;
                console.log(urls);
                resolve(urls);

            } else {
                reject('URL provided not in list: ' + url + " - Be sure to type URL exactly as it is shown in `/listurls`");
            }
        })
    }
};