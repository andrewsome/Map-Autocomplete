const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/api/autocomplete/:query', (req, res) => {
    const endpoint = `${process.env.ENDPOINT}?app_id=${process.env.APP_ID}&app_code=${process.env.APP_CODE}&query=${req.params.query}&beginHighlight=<b>&endHighlight=</b>&country=aus&maxresults=5`;
    axios({
        method: 'GET', url: endpoint, headers: {
            "Accept": "application/json", "Content-Type": "application/json"
        }
    }).then(response => {
        res.send(JSON.stringify(response.data));
    }).catch(error => {
        res.send(JSON.stringify(error), 400);
    });
});
router.get('/ping', (req, res) => {
    res.send('pong');
});
router.use('/', express.static('client'))

module.exports = router;