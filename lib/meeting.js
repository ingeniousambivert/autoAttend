/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const credentials = require('../config/credentials.json');

const NAME_SELECTOR = 'input[placeholder="Your full name"]';
const EMAIL_SELECTOR = 'input[class="style-input-2nuAk undefined"]';
const JOIN_MEETING_SELECTOR = '#guest_next-btn';

async function MeetingMagic(page, meeting) {
  await page.goto(meeting, {
    waitUntil: 'load',
  });
  await page.waitForTimeout(6 * 1000);

  await page.evaluate((JOIN_BROWSER_SELECTOR) => {
    document.querySelector(JOIN_BROWSER_SELECTOR).click();
  }, 'a#push_download_join_by_browser');
  console.log('Success: Navigated to Webex');

  await page.waitForSelector(NAME_SELECTOR);
  await page.focus(NAME_SELECTOR);
  await page.keyboard.type(credentials.meetingName);
  await page.screenshot({ path: 'page.png' });

  //   await page.waitForSelector(EMAIL_SELECTOR);
  //   await page.click(EMAIL_SELECTOR);
  //   await page.keyboard.type(credentials.meetingEmail);

//   await page.waitForSelector(JOIN_MEETING_SELECTOR);
//   await page.click(JOIN_MEETING_SELECTOR);
//   await page.screenshot({ path: 'page.png' });
//   console.log('Success: Joined Meeting');
}

module.exports = MeetingMagic;
