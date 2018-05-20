var express = require('express');
var router = express.Router();
const config = require('../config');
var googleMapsClient = require('@google/maps').createClient({
    key: config.google.key
});

// done
// test place id : ChIJc6EceWquEmsRmBVAjzjXM-g
// router.get('/place/detail', (req, res, next) => {
//     let params = {placeid, language} = req.query;

//     googleMapsClient.place(params, (err, result) => {
//         if (err) res.send({message: 'INVALID_REQUEST'});

//         res.send(result.json.result);
//     });
// });

//test params
//query : fastfood
//location : [-33.865, 151.038]
//radius: 5000
router.get('/places', (req, res, next) => {
    let params = {query, location, radius, minprice, maxprice, opennow, type, pagetoken, region} = req.query;

    googleMapsClient.places(params, (err, result) => {
        console.log("ASDG");
        console.log("res: %o", result);
        if (err) res.send({message: 'INVALID_REQUEST'})

        res.send(result.json.results);
    });
});

// router.get('/places/nearby', (req, res, next) => {
//     let params = {location, language, radius, keyword, minprice, maxprice, name, opennow, rankby, type, pagetoken} = req.query;

//     googleMapsClient.placesNearby({
//         location: [-33.865, 151.038]
//     }, (err, res) => {
//         console.log("nearby places %o", res.json.results);
//     });
// });

// router.get('/place/photo', (req, res, next) => {
//     let params = {photoreference, maxwidth, maxheight} = req.query;

//     googleMapsClient.placesPhoto({
//         photoreference: 'CnRvAAAAwMpdHeWlXl-lH0vp7lez4znKPIWSWvgvZFISdKx45AwJVP1Qp37YOrH7sqHMJ8C-vBDC546decipPHchJhHZL94RcTUfPa1jWzo-rSHaTlbNtjh-N68RkcToUCuY9v2HNpo5mziqkir37WU8FJEqVBIQ4k938TI3e7bf8xq-uwDZcxoUbO_ZJzPxremiQurAYzCTwRhE_V0'
//     }, (err, res) => {
//         console.log("places photo %o", res);
//     })
// });

module.exports = router;
