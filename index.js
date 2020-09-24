/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const puppeteer = require('puppeteer');

const LoginMagic = require('./src/login.js');
const NavigationMagic = require('./src/navigation.js');
const ScrapeMagic = require('./src/scrape.js');

const LOGIN_URL = 'http://glsufcait.org/moodle/login/index.php';
const OR_FORUM_URL = 'http://glsufcait.org/moodle/mod/forum/discuss.php?d=102';

const USER_DATA = './user_data/moodle-session.js';
const SCRAPED_DATA = './scraped_data/data.js';

(async (puppeteerInstance, loginUrl, forumUrl, sessionLocation, dataLocation) => {
  const browser = await puppeteerInstance.launch({ headless: false, userDataDir: './user_data' });
  const page = await browser.newPage();

  process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  });

  try {
    // if (cookies === null) {
    await LoginMagic(page, loginUrl, sessionLocation);
    // }
    await NavigationMagic(page, forumUrl);
    await ScrapeMagic(page, dataLocation).then((data) => {
      console.log('Data', data);
    });
    browser.close();
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
})(puppeteer, LOGIN_URL, OR_FORUM_URL, USER_DATA, SCRAPED_DATA);
