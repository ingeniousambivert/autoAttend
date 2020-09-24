/* eslint-disable no-console */

const fs = require('fs');
const credentials = require('../credentials.json');

const USERNAME_SELECTOR = '#username';
const PASSWORD_SELECTOR = '#password';
const CTA_SELECTOR = '#loginbtn';

async function LoginMagic(page, login) {
  await page.goto(login, {
    waitUntil: 'load',
    timeout: 0,
  });

  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(credentials.username);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(credentials.password);

  await page.click(CTA_SELECTOR);
  console.log('Success: Log in');

  const cookies = await page.cookies();

  fs.writeFile('../user_data/moodle-session.json', JSON.stringify(cookies, null, 2), (err) => {
    if (err) throw err;
  });
  console.log('Success: Written cookies');
}

module.exports = LoginMagic;
