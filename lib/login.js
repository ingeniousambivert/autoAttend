/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const credentials = require('../config/credentials.json');

const USERNAME_SELECTOR = '#username';
const PASSWORD_SELECTOR = '#password';
const LOGIN_SELECTOR = '#loginbtn';

async function LoginMagic(page, login, fse) {
  await page.goto(login, {
    waitUntil: 'load',
    timeout: 0,
  });

  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(credentials.moodleUsername);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(credentials.moodlePassword);

  await page.click(LOGIN_SELECTOR);
  console.log('Success: Logged in');

  const cookies = await page.cookies();

  if (!fse.pathExists('./user_data/')) {
    fse.ensureDirSync('./user_data/', (err) => {
      console.log(err);
    });
  } else {
    fse.writeJson('./user_data/moodle-session.json', cookies)
      .then(() => {
        console.log('Success: Written cookies');
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = LoginMagic;
