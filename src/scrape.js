/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */

async function ScrapeMagic(page) {
  const result = await page.evaluate(() => {
    const data = document.querySelector('div.forumpost.clearfix.lastpost.firstpost.starter').innerText;
    return data;
  });

  return result;
}

module.exports = ScrapeMagic;
