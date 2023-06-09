const app = require("express")();
const axios = require("axios");
const {
  getTitleFromHTML,
  makeHtmlResponse,
  addProtocolIfNotExist,
} = require("./utils");

app.get("/I/want/title", async (req, res) => {
  let { address: addresses } = req.query;

  if (!addresses) {
    return res.status(400).send("<h4>No addresses provided</h4>");
  }

  if (!Array.isArray(addresses)) {
    addresses = [addresses];
  }

  try {
    const siteTitles = await Promise.all(
      addresses.map((address) =>
        axios
          .get(addProtocolIfNotExist(address))
          .then((response) => {
            const title = getTitleFromHTML(response.data);
            return { address, title };
          })
          .catch(() => {
            return { address, title: "NO RESPONSE" };
          })
      )
    );

    return res.send(makeHtmlResponse(siteTitles));
  } catch (error) {
    return res.status(500).send("<h4>Internal Server Error</h4>");
  }
});

app.get("*", (req, res) => {
  res.status(404).send("<h2>Not Found</h2>");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is started listening on port ${PORT}`);
});
