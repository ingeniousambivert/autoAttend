/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const puppeteer = require('puppeteer');

const LoginMagic = require('./lib/login.js');
const NavigationMagic = require('./lib/navigation.js');
const ScrapeMagic = require('./lib/scrape.js');
const MeetingMagic = require('./lib/meeting.js');

const LOGIN_URL = 'http://glsufcait.org/moodle/login/index.php';
const OR_FORUM_URL = 'http://glsufcait.org/moodle/mod/forum/discuss.php?d=102';

(async (puppeteerInstance, loginUrl, forumUrl) => {
  const browser = await puppeteerInstance.launch({ headless: true });
  const page = await browser.newPage();
  let gotoMeeting = '';

  process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  });

  try {
    await LoginMagic(page, loginUrl);
    await NavigationMagic(page, forumUrl);
    await ScrapeMagic(page).then((link) => { gotoMeeting = link; });
    await MeetingMagic(page, gotoMeeting);

    browser.close();
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
})(puppeteer, LOGIN_URL, OR_FORUM_URL);
