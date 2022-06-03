const express = require('express');
const router = express.Router();
const {getFile} = require('../../config/s3')

router.get('/buildings/:key', (req, res) => {
    const { key } = req.params;
    const readStream = getFile(key)
    readStream.on('error', error => {
        res.status(404).send('Not found')
    })
    readStream.pipe(res)
})

router.get('/:key', (req, res) => {
    const { key } = req.params;
    const readStream = getFile(key)
    readStream.on('error', error => {
        res.status(404).send('Not found')
    })
    readStream.pipe(res)
})


module.exports = router;