/* eslint-disable no-console */

const fse = require('fs-extra');
const path = require('path');

const dataDir = path.join(__dirname, '/data');

function WriteToJSON(data) {
  if (!fse.pathExists(dataDir)) {
    fse.ensureDirSync(dataDir, (err) => {
      console.log(err);
    });
  } else {
    fse.writeJson(`${dataDir}/scraped_data.json`, data)
      .then(() => {
        console.log('Success: Scraped Data');
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = WriteToJSON;
