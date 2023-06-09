const getTitleFromHTML = (html) => {
  const match = html.match(/<title>(.*?)<\/title>/);
  return match ? match[1] : "";
};

const makeHtmlResponse = (sites) => {
  return `<html>

    <head></head>
    
    <body>
        <h1> Following are the titles of given websites: </h1>
        ${sites.map((site) => `<li> ${site.url} - "${site.title}" </li>`)}
        <ul>
            <li> google.com - "Google" </li>
            <li> www.dawn.com/events/ - "Events - DAWN.COM" </li>
        </ul>
    </body>
    </html>`;
};

module.exports = {
  getTitleFromHTML,
  makeHtmlResponse,
};
