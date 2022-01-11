const fs = require('fs');

module.exports = {

    //If bot restarts, urls is reset, initUrls will load a textfile so those urls can be saved
    getUrls: (gid) => {
        return new Promise ((resolve, reject) => {
            let textFileUrl = 'guildlists/' + gid + '.txt';

            if (fs.existsSync(textFileUrl)) {
                try {
                    let list = fs.readFileSync(textFileUrl).toString().split('\n');

                    if (list.length > 0) {
                        let newList = [];
                        list[0] = list[0].substring(0, list[0].length);

                        //Remove new line at end of file from array
                        for (let i = 0; i < list.length - 1; i++) {
                            newList.push(list[i]);
                        }

                        resolve(newList);
                    } else {
                        resolve([]);
                    }
                } catch (error) {
                    reject(error);
                }
            } else {
                //Resolve with empty array if file doesn't exist
                resolve([]);
            }
        });
    },
    addUrl: (url, gid) => {
        let textFileUrl = 'guildlists/' + gid + '.txt';

        return new Promise(async (resolve, reject) => {
            if (!fs.existsSync(textFileUrl)) {
                fs.mkdir('guildlists', (error) => {
                    if (error) {
                        reject(error);
                    }
                });
            }

            //add url to guild's url list txt file
            fs.appendFile(textFileUrl, (url + '\n'), (error) => {
                reject(error)
            });

            resolve();
        });
    },
    removeUrl: (url, gid) => {
        return new Promise((resolve, reject) => {
            let textFileUrl = 'guildlists/' + gid + '.txt';
            let urlFound = false;

            if (fs.existsSync(textFileUrl)) {
                try {
                    let list = fs.readFileSync(textFileUrl).toString().split('\n');

                    if (list.length > 0) {
                        let newList = [];
                        list[0] = list[0].substring(0, list[0].length);

                        //Remove new line at end of file from array
                        for (let i = 0; i < list.length - 1; i++) {
                            if (list[i] != url) {
                                newList.push(list[i]);
                            } else {
                                urlFound = true;
                            }
                        }
                        
                        if (urlFound) {
                            //Delete and recreate txt file with requested url removed
                            fs.rmSync(textFileUrl);
                            for (let i = 0; i < newList.length; i++) {
                                module.exports.addUrl(newList[i], gid);
                            }
                            resolve();
                        } else {
                            reject('URL provided not in list: ' + url + " - Be sure to type URL exactly as it is shown in `/listurls`");
                        }
                    } else {
                        reject('URL list is empty');
                    }
                } catch (error) {
                    reject('There was an issue removing the URL: ' + error);
                }
            } else {
                reject('URL list is empty');
            }
        });
    }
};