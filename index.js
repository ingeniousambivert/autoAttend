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
  let gotoMeeting = 'someLink';
  const browser = await puppeteerInstance.launch({
    headless: false,
    defaultViewport: null,
    devtools: true,
  });
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();

  await client.send('Network.enable');
  client.on('Network.requestWillBeSent', (parameters) => {
    const requestUrl = parameters.request.url;
    const initiatorUrl = parameters.initiator.url;

    console.log('The request', requestUrl, 'was initiated by', initiatorUrl, '.');
  });
  await client.send('Network.setRequestInterception', {
    patterns: [{ urlPattern: '*' }],
  });
  await client.on('Network.requestIntercepted', async (e) => {
    // console.log('EVENT INFO: ');
    // console.log(e.interceptionId);
    // console.log(e.resourceType);
    // console.log(e.isNavigationRequest);

    // pass all network requests (not part of a question)
    await client.send('Network.continueInterceptedRequest', {
      interceptionId: e.interceptionId,
    });
  });

  //   await page.setRequestInterception(true);
  //   await page.on('request', (req) => {
  //  if (req.resourceType() === 'stylesheet'
  //  || req.resourceType() === 'font'
  //  || req.resourceType() === 'image') {
  //   req.abort();
  // }
  //     else {
  //       req.continue();
  //     }
  //   });

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
