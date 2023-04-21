//businesssummary.js
const express = require('express');
const router=express.Router();
const axios=require('axios');


router.get('/autocomplete', function(req,res)
{  
  var keyw = req.query.keyword;
  //let url="https://api.yelp.com/v3/businesses/search?term="+term+"&latitude="+String(latitude)+"&longitude="+String(longitude)+"&categories="+categories+"&radius="+String(radius)
  
  // let url='https://api.yelp.com/v3/businesses/search?term=sushi&latitude=33.8491816&longitude=-118.3884078&categories=food&radius=8046';
  let url="https://api.yelp.com/v3/autocomplete?text="+String(keyw);
  console.log(url);
  axios.get(url, {
    
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

module.exports=router
