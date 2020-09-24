/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */

async function ScrapeMagic(page, fs) {
  const directory = '../scraped_data/';

  const result = await page.evaluate(() => {
    const data = document.querySelector('div.forumpost.clearfix.lastpost.firstpost.starter').innerText;

    // if (!fs.existsSync(directory)) {
    //   fs.mkdirSync(directory);

    //   fs.writeFile(`${directory}data.json`, JSON.stringify(data, null, 2), (err) => {
    //     if (err) throw err;
    //   });
    // }

    return data;
  });

  console.log('Success: Scraped Data');
  return result;
}

module.exports = ScrapeMagic;
