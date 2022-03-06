const router = require('express').Router()
const {ping} = require('../../controllers/ping')

router
.route('/')
.get(ping)

module.exports = router