var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var app = express();

const scrape = async () => {
  url = "https://horriblesubs.info/api.php?method=getlatest";

  const html = (await axios.get(url)).data;

  var $ = cheerio.load(html);
  const log = $("a");
  const latestAnimes = [];
  log.each(function() {
    const name = $(this.children[1]).text();
    const episode = $(this.children[2].children[0]).text();
    console.log(name, episode);
    latestAnimes.push(name + episode);
  });
};

scrape();
setInterval(() => {
  scrape();
}, 60000);

app.listen("3000");
