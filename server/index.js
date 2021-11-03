const PORT = 5000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const coinMarketCapUrl = 'https://coinmarketcap.com/all/views/all/';

// create a route for /crypto and use axios to fetch the html from the coinmarketcap url
app.get('/crypto', async (req, res) => {
  try {
    const response = await axios.get(coinMarketCapUrl);
    const $ = cheerio.load(response.data);
    const coinData = [];
    // loop through the table rows and get the data for top 20 coins
    $('tbody tr').each((i, el) => {
      const coin = {};
      if(i < 20){
      coin.rank = $(el).find('td:nth-child(1)').text();
      coin.name = $(el).find('td:nth-child(2)').text();
      coin.price = $(el).find('td:nth-child(3)').text();
      coin.marketCap = $(el).find('td:nth-child(4)').text();
      coin.volume = $(el).find('td:nth-child(5)').text();
      coin.circulatingSupply = $(el).find('td:nth-child(6)').text();
      coin.change1h = $(el).find('td:nth-child(7)').text();
      coin.change24h = $(el).find('td:nth-child(8)').text();
      coin.change7d = $(el).find('td:nth-child(9)').text();
      coinData.push(coin);
      }
    });
    res.send(coinData);
  } catch (error) {
    console.log(error);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});