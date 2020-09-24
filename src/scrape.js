/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */

const fs = require('fs');

async function ScrapeMagic(page, location) {
  const result = await page.evaluate(() => {
    const data = document.querySelector('div.forumpost.clearfix.lastpost.firstpost.starter').innerText;

    //   if (!fs.existsSync(location)) {
    //     fs.mkdirSync(location);

    // fs.writeFile('./scraped_data/data.json', JSON.stringify(data, null, 2), (err) => {
    //   if (err) throw err;
    // });
    //   }

    return data;
  });

  console.log('Success: Scraped Data');
  return result;
}

module.exports = ScrapeMagic;
