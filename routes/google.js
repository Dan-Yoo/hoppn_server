var express = require('express');
var router = express.Router();
const config = require('../config');
var googleMapsClient = require('@google/maps').createClient({
    key: config.google.key
});

// done
// test place id : ChIJCT3qZGoayUwRmPk37VHZSRY
router.get('/place/detail', (req, res, next) => {
    let params = {placeid, language} = req.query;

    googleMapsClient.place(params, (err, result) => {
        if (err) res.send({message: 'INVALID_REQUEST'});

        res.send(result.json.result);
    });
});

//done
//test params
//query : school
//location : [45.501689, -73.567256]
//radius: 5000
router.get('/places', (req, res, next) => {
    let params = {query, location, radius, minprice, maxprice, opennow, type, pagetoken, region} = req.query;
    params.location = JSON.parse(params.location);
    params.radius = parseInt(params.radius);

    googleMapsClient.places(params, (err, result) => {
        if (err) res.send({message: 'INVALID_REQUEST'})

        res.send(result.json.results);
    });
});

//done
//test params
//location : [45.501689, -73.567256]
//radius: 5000
router.get('/places/nearby', (req, res, next) => {
    let params = {location, language, radius, keyword, minprice, maxprice, name, opennow, rankby, type, pagetoken} = req.query;
    params.location = JSON.parse(params.location);
    params.radius = parseInt(params.radius);
    
    googleMapsClient.placesNearby(params, (err, result) => {
        if (err) res.send({message: 'INVALID_REQUEST'});

        res.send(result.json.results);
    });
});


//TODO: returns nothing
//test params
//photoreference:  CnRvAAAAwMpdHeWlXl-lH0vp7lez4znKPIWSWvgvZFISdKx45AwJVP1Qp37YOrH7sqHMJ8C-vBDC546decipPHchJhHZL94RcTUfPa1jWzo-rSHaTlbNtjh-N68RkcToUCuY9v2HNpo5mziqkir37WU8FJEqVBIQ4k938TI3e7bf8xq-uwDZcxoUbO_ZJzPxremiQurAYzCTwRhE_V0
router.get('/place/photo', (req, res, next) => {
    let params = {photoreference, maxwidth, maxheight} = req.query;
    params.maxwidth = parseInt(params.maxwidth);
    params.maxheight = parseInt(params.maxheight);

    // {
    //     // photoreference: "CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU",
    //     // maxwidth: 400,
    //     // maxheight: 400

    // }

    googleMapsClient.placesPhoto(params, (err, result) => {
        if (err) res.send(err);
        
        res.send(result.req.path);
    });
});

module.exports = router;
