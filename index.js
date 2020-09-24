/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
require('dotenv').config();
const puppeteer = require('puppeteer');

const LoginMagic = require('./src/login.js');
const NavigationMagic = require('./src/navigation.js');
const ScrapeMagic = require('./src/scrape.js');

const cookies = require('./user_data/moodle-session.json');

const LOGIN_URL = 'http://glsufcait.org/moodle/login/index.php';
const OR_FORUM_URL = 'http://glsufcait.org/moodle/mod/forum/discuss.php?d=102';

(async (puppeteerInstance, loginUrl, forumUrl) => {
  const browser = await puppeteerInstance.launch({ headless: false, userDataDir: '../user_data' });
  const page = await browser.newPage();

  process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  });

  try {
    // if (cookies === null) {
    await LoginMagic(page, loginUrl);
    // }
    await NavigationMagic(page, forumUrl);
    await ScrapeMagic(page).then((data) => {
      console.log('Data', data);
    });
    browser.close();
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
})(puppeteer, LOGIN_URL, OR_FORUM_URL);
