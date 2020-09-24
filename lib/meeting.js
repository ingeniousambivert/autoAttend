/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const credentials = require('../config/credentials.json');

const NAME_SELECTOR = '#meetingSimpleContainer > div.style-box-2gTpv > div.style-name-input-19PlX > input';
const EMAIL_SELECTOR = 'input[class="style-input-2nuAk undefined"]';
const JOIN_MEETING_SELECTOR = '#guest_next-btn';

async function MeetingMagic(page, meeting) {
  await page.goto(meeting, {
    waitUntil: 'load',
  });
  await page.waitForTimeout(6 * 1000);

  await page.evaluate(() => {
    const JOIN_BROWSER_SELECTOR = 'a#push_download_join_by_browser';
    document.querySelector(JOIN_BROWSER_SELECTOR).click();
  });
  console.log('Success: Navigated to Webex');

  await page.waitForTimeout(6 * 1000);
  // await page.waitForSelector(NAME_SELECTOR);
  const listNodes = await page.evaluate(() => {
    const list = document.querySelectorAll('input.style-input-2nuAk undefined');
    return list;
  });
  console.log(listNodes);
  // await page.click(NAME_SELECTOR);
  //   await page.keyboard.type(credentials.meetingName);

  // await page.waitForSelector(EMAIL_SELECTOR);
  //   await page.click(EMAIL_SELECTOR);
  //   await page.keyboard.type(credentials.meetingEmail);

  // await page.waitForSelector(JOIN_MEETING_SELECTOR);
  //   await page.click(JOIN_MEETING_SELECTOR);
  await page.screenshot({ path: 'page.png' });
  console.log('Success: Joined Meeting');
}

module.exports = MeetingMagic;
