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

    console.log("params %o", params);
    
    googleMapsClient.placesNearby(params, (err, result) => {
        if (err) res.send({message: 'INVALID_REQUEST'});

        let results = result.json.results;
        let allPromises = [];

        // for each, get photo from photoref.
        let promises = results.reduce((callback, place) => {
            let promise = new Promise((resolve) => {
                getPlaceImage(place, resolve);
            });

            allPromises.push(promise);
            return promise;
        }, Promise.resolve());

        Promise.all(allPromises)
            .then((places) => {
                res.send(places);
            })
            .catch((error) => res.send({message: 'Problem loading places'}));
    });
});

function getPlaceImage(place, callback) {
    // put a default image here maybe?
    // if not, handle undefined image in frontend
    place.image = '';

    if (!place.photos) {
        callback(place);
        return;
    }

    let params = {
        photoreference: place.photos[0].photo_reference,
        maxwidth: 400,
        maxwidth: 400
    };

    googleMapsClient.placesPhoto(params, (err, result) => {
        if (!err) place.image = 'https://lh4.googleusercontent.com/'+ result.req.path;
        callback(place);
    });
}

router.get('/place/photo', (req, res, next) => {
    let params = {photoreference, maxwidth, maxheight} = req.query;
    params.maxwidth = parseInt(params.maxwidth);
    params.maxheight = parseInt(params.maxheight);

    googleMapsClient.placesPhoto(params, (err, result) => {
        if (err) res.send(err);
        
        res.send({photo_url : result.req.path});
    });
});

module.exports = router;
