const express = require("express");
const axios = require("axios").default;

app = express();
app.use(express.json());

const weatherApi = axios.create({
  baseURL: "http://api.weatherapi.com",
  params: { key: "1c2c80ce617f4f1fab2120311232705" },
});

// Location Search
app.get('/api/search/:searchkey', (req, res) => {
    let result = [];
  weatherApi
    .get(`/v1/search.json?&q=${req.params.searchkey}`)
    .then((response) => {
        let data = response.data
        data.forEach(element => {
            result.push({
                "name": element.name,
                "country" : element.country,
                "lat": element.lat,
                "long": element.long
            })
        }); 
    
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Location Based Weather
app.get('/api/location/:lat/:long', (req, res) => {
    weatherApi
      .get(`/v1/current.json?&q=${req.params.lat},${req.params.long}&aqi=no`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

// Location
app.get('/api/forecast/:lat/:long/:days', (req, res) => {
    weatherApi
      .get(`/v1/forecast.json?&q=${req.params.lat},${req.params.long}&days=${req.params.days}&aqi=no&alerts=no`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });


app.listen(3000, () => console.log("Listening on port 3000......"));
