const express = require("express");
const axios = require("axios");
const { from } = require("rxjs");
const { mergeMap, toArray } = require("rxjs/operators");
const {
  getTitleFromHTML,
  makeHtmlResponse,
  addProtocolIfNotExist,
} = require("./utils");

const app = express();

app.get("/I/want/title", async (req, res) => {
  let { address: addresses } = req.query;

  if (!addresses) {
    return res.status(400).send("<h1>No addresses provided!</h1>");
  }

  if (!Array.isArray(addresses)) {
    addresses = [addresses];
  }

  try {
    const result = await from(addresses)
      .pipe(
        mergeMap(async (address) => {
          try {
            const response = await axios.get(addProtocolIfNotExist(address));
            const title = getTitleFromHTML(response.data);
            return { address, title };
          } catch (error) {
            return { address, title: "NO RESPONSE" };
          }
        }),
        toArray()
      )
      .toPromise();

    res.send(makeHtmlResponse(result));
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("<h2>Internal Server Error</h2>");
  }
});

app.get("*", (req, res) => {
  res.status(404).send("<h2>404 Not Found</h2>");
});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
