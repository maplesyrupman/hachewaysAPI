const express = require('express')

const app = express()
const PORT =  3007

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(require('./routes'))

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))