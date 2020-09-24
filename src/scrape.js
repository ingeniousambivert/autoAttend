/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */

async function ScrapeMagic(page, fse) {
  let data = '';

  const result = await page.evaluate(() => {
    data = document.querySelector('div.forumpost.clearfix.lastpost.firstpost.starter').innerText;
    return data;
  });

  //   fse.writeJsonSync('../scraped_data/data.json', data)
  //     .then(() => {
  //       console.log('Success: Scraped Data');
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });

  return result;
}

module.exports = ScrapeMagic;
