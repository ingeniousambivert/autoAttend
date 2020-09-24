/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */

async function ScrapeMagic(page) {
  const result = await page.evaluate(() => {
    const DIV_SELECTOR = 'div.forumpost.clearfix.lastpost.firstpost.starter';

    const data = document.querySelector(DIV_SELECTOR).innerText;
    return data;
  });
  const splitData = result.split('\n');
  let link = '';
  splitData.map((word) => {
    if (word.match(/^https/)) {
      link = word;
    }
    return link;
  });
  console.log('Success: Scraped meeting link');
  return link;
}

module.exports = ScrapeMagic;
