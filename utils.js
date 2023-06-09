const getTitleFromHTML = (html) => {
  const match = html.match(/<title>(.*?)<\/title>/);
  return match ? match[1] : "";
};

const makeHtmlResponse = (sites) => {
  return `<html>
    <head></head>
    <body>
        <h1> Following are the titles of given websites: </h1>
        <ul>
          ${sites.map((site) => `<li> ${site.address} - "${site.title}"</li>`).join('')}
        </ul>
    </body>
    </html>`;
};

function addProtocolIfNotExist(address) {
  if (!address.startsWith('http://') && !address.startsWith('https://')) {
    address = `http://${address}`;
  }
  return address;
}

module.exports = {
  getTitleFromHTML,
  makeHtmlResponse,
  addProtocolIfNotExist
};
