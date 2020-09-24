/* eslint-disable no-console */

async function NagivationMagic(page, forum) {
  await page.goto(forum, { waitUntil: 'load' });
  console.log('Success: Navigated to Forum');
}

module.exports = NagivationMagic;
