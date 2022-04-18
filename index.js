// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data

const express = require ('express'); 
const axios = require('axios');  
const cors = require('cors');  
const dotenv = require('dotenv').config()

const ROOT_URL = process.env.ROOT_URL || '' 
const API_KEY = process.env.API_KEY || ''
const PORT = process.env.PORT || 5000

const app	= express()

// middleware
app.use( cors() )          
app.use( express.json() )  
app.use(ROOT_URL+'/', express.static('public')) 

app.get(ROOT_URL+'/random/', (req, res) => { 

    // pick a random number between 1 and 100
    let randomNumber = Math.floor((Math.random() * 10000) + 1);

    const options = {
      method: 'GET',
     // url: 'https://api.nasa.gov/planetary/apod',https://rebrickable.com/api/v3/lego/minifigs/?page=1
     url: 'https://rebrickable.com/api/v3/lego/minifigs/', 
      params: {
        key: API_KEY,
        page: randomNumber,
        page_size: 1
      }
      
    } 
    // axios makes requests from Oxford API
    axios.request(options).then((response) => { 
      // relay the response from Oxford back to the frontend.
      let items = response.data.results
      let minifigure = items[Math.floor(Math.random()*items.length)];

        res.send(  minifigure  ) 

    }).catch( (error) => {
      // if there is an error, send a message to the frontend.
      res.send( { error: error.message })
    })
  })



app.listen(PORT, () => {
    console.log("We are live on port "+PORT )
})

