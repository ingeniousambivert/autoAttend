/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const credentials = require('../config/credentials.json');

const USERNAME_SELECTOR = '#username';
const PASSWORD_SELECTOR = '#password';
const CTA_SELECTOR = '#loginbtn';

async function LoginMagic(page, login, fs) {
  const directory = '../user_data/';
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

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);

    fs.writeFile(`${directory}moodle-session.json`, JSON.stringify(cookies, null, 2), (err) => {
      if (err) throw err;
    });
    console.log('Success: Written cookies');
  }
}

module.exports = LoginMagic;
