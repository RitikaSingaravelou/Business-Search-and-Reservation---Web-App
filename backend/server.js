//server.js
var express = require('express');
var cors = require('cors');
const router=express.Router();
const path=require('path');
const axios=require('axios');


//const router = require('./routes/businesssummary');
//const loginroute=require("./routes/login")
var app = express();
/*app.get('/', function(req, res) {
    res.send('Hello World');
})*/

app.use(cors());

app.use(express.static(process.cwd()+"/frontendang/dist/frontendang"));//frontendang\dist\frontendang\index.html


/*
app.use(express.static(path.join(__dirname,'dist/frontendang')));
app.use(express.static(process.cwd()+"/Backend/dist/fr"));frontendang\dist\frontendang\index.html
app.get('/', function(req,res) 
 {
    //res.sendFile(process.cwd()+"/Backend/dist/frontendang/index.html")
    res.sendFile(path.join(__dirname,'dist/frontendang/index.html'));
  });
/*app.listen(8080, function() {
    console.log("Backend Application listening at http://localhost:8080")
})

const PORT = process.env.port || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.listen(8080, function() {
    console.log("Backend Application listening at http://localhost:8080")
})*/


app.get("/api/searchresults",async function(req,res,next)  {  
  var term = req.query.keyword,
  latitude = req.query.latitude,
  longitude = req.query.longitude,
  categories = req.query.categories,
  distance = req.query.distance;
  console.log(process.cwd());
  var radius= Math.round(distance*1609.344);
  let url="https://api.yelp.com/v3/businesses/search?term="+term+"&latitude="+String(latitude)+"&longitude="+String(longitude)+"&categories="+categories+"&radius="+String(radius)
  console.log(url);
  // let url='https://api.yelp.com/v3/businesses/search?term=sushi&latitude=33.8491816&longitude=-118.3884078&categories=food&radius=8046';
   await axios.get(url, {
    
    headers: {'Authorization': 'Bearer DemAQjz10DFF96-9hkV_ZRV0v1ObX03S9J0_JJDTkUuHdFFQC4Ok8jUyVvVd7BL0O1vsISIzpDoeahk_2PQp_3gcExmXYk-i4-T2q9NE5q99CuUyi-nb5tgf76tAY3Yx'}
  })
  .then((bizresults) => {
    console.log(bizresults.data);
    res.json(bizresults.data);
  })
  .catch((error) => {
    console.error(error);
    res.send(error);
  })
}
);




app.get("/api/businesssummary", async function(req,res)
{  
  var id = req.query.id;
  //let url="https://api.yelp.com/v3/businesses/search?term="+term+"&latitude="+String(latitude)+"&longitude="+String(longitude)+"&categories="+categories+"&radius="+String(radius)
  
  // let url='https://api.yelp.com/v3/businesses/search?term=sushi&latitude=33.8491816&longitude=-118.3884078&categories=food&radius=8046';
  let url="https://api.yelp.com/v3/businesses/"+String(id);
  console.log(url);
  await axios.get(url, {
    
    headers: {'Authorization': 'Bearer DemAQjz10DFF96-9hkV_ZRV0v1ObX03S9J0_JJDTkUuHdFFQC4Ok8jUyVvVd7BL0O1vsISIzpDoeahk_2PQp_3gcExmXYk-i4-T2q9NE5q99CuUyi-nb5tgf76tAY3Yx'}
  })
  .then((bizsummary) => {
    console.log(bizsummary.data);
    res.json(bizsummary.data);
  })
  .catch((error) => {
    console.error(error);
    res.send(error);
  })
}
);
app.get("/api/autocomplete",async function(req,res)
{  
  var keyw = req.query.keyword;
  //let url="https://api.yelp.com/v3/businesses/search?term="+term+"&latitude="+String(latitude)+"&longitude="+String(longitude)+"&categories="+categories+"&radius="+String(radius)
  
  // let url='https://api.yelp.com/v3/businesses/search?term=sushi&latitude=33.8491816&longitude=-118.3884078&categories=food&radius=8046';
  let url="https://api.yelp.com/v3/autocomplete?text="+String(keyw);
  console.log(url);
  await axios.get(url, {
    
    headers: {'Authorization': 'Bearer DemAQjz10DFF96-9hkV_ZRV0v1ObX03S9J0_JJDTkUuHdFFQC4Ok8jUyVvVd7BL0O1vsISIzpDoeahk_2PQp_3gcExmXYk-i4-T2q9NE5q99CuUyi-nb5tgf76tAY3Yx'}
  })
  .then((autosuggest) => {
    console.log(autosuggest.data);

    res.json(autosuggest.data);
  })
  .catch((error) => {
    console.error(error);
    res.send(error);
  })
}
);


app.get("/api/reviews", async function(req,res)
{  
  var id = req.query.id;
  //let url="https://api.yelp.com/v3/businesses/search?term="+term+"&latitude="+String(latitude)+"&longitude="+String(longitude)+"&categories="+categories+"&radius="+String(radius)
  
  // let url='https://api.yelp.com/v3/businesses/search?term=sushi&latitude=33.8491816&longitude=-118.3884078&categories=food&radius=8046';
  let url="https://api.yelp.com/v3/businesses/"+String(id)+"/reviews";
  console.log(url);
  await axios.get(url, {
    
    headers: {'Authorization': 'Bearer DemAQjz10DFF96-9hkV_ZRV0v1ObX03S9J0_JJDTkUuHdFFQC4Ok8jUyVvVd7BL0O1vsISIzpDoeahk_2PQp_3gcExmXYk-i4-T2q9NE5q99CuUyi-nb5tgf76tAY3Yx'}
  })
  .then((bizreviews) => {
    console.log(bizreviews.data);
    res.json(bizreviews.data.reviews);
  })
  .catch((error) => {
    console.error(error);
    res.send(error);
  })
}
);

app.get('/*', function(req,res) 
 {
    //res.sendFile(process.cwd()+"/Backend/dist/frontendang/index.html")
    res.sendFile(process.cwd()+"/frontendang/dist/frontendang/index.html");
  });

  const PORT = process.env.port || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

module.exports=app;