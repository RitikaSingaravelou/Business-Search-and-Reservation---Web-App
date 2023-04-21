//search.js
const express = require('express');
const router=express.Router();
const axios=require('axios');


router.get('/searchresults', function(req,res,next)  {  
  var term = req.query.keyword,
  latitude = req.query.latitude,
  longitude = req.query.longitude,
  categories = req.query.categories,
  distance = req.query.distance;
  var radius= Math.round(distance*1609.344);
  let url="https://api.yelp.com/v3/businesses/search?term="+term+"&latitude="+String(latitude)+"&longitude="+String(longitude)+"&categories="+categories+"&radius="+String(radius)
  console.log(url);
  // let url='https://api.yelp.com/v3/businesses/search?term=sushi&latitude=33.8491816&longitude=-118.3884078&categories=food&radius=8046';
   axios.get(url, {
    
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

module.exports=router
