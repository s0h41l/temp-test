const app = require("express")();
const request = require("request");
const { getTitleFromHTML, makeHtmlResponse, addProtocolIfNotExist } = require("./utils");

app.get("/I/want/title", (req, res) => {
  let { address: addresses } = req.query;

  if (!addresses) {
    return res.status(400).send("<h4>No addresses provided</h4>");
  }

  if (!Array.isArray(addresses)) {
    addresses = [addresses];
  }

  const siteTitles = [];
  let count = 0;

  addresses.forEach((address) => {

    request(addProtocolIfNotExist(address), (err, _, body) => {
        let title = '';
        if (err) {
            title = "NO RESPONSE";
        }else {
            title = getTitleFromHTML(body);
        }

        siteTitles.push({ address, title });
        count++;

        if (count == addresses.length){
            res.send(makeHtmlResponse(siteTitles));
        }

    });

  });
});

app.get("*", (req, res) => {
  res.status(404).send("<h2>Not Found</h2>");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is started listening on port ${PORT}`);
});
