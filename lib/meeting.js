/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const credentials = require('../config/credentials.json');

const USERNAME_SELECTOR = '#username';
const PASSWORD_SELECTOR = '#password';
const JOIN_BROWSER_SELECTOR = '#push_download_join_by_browser';

async function MeetingMagic(page, meeting) {
  await page.goto(meeting, {
    waitUntil: 'load',
  });
  await page.waitForTimeout(10 * 1000);
  await page.click(JOIN_BROWSER_SELECTOR);
  console.log('Success: Reached Webex');
}

module.exports = MeetingMagic;
