const router = require('express').Router()
const pingRoutes = require('./ping')
const postRoutes = require('./posts')

router.use('/ping', pingRoutes)
router.use('/posts', postRoutes)

module.exports = router