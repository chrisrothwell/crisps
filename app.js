/**
 * All about crisps - express handler
 */

'use strict'

const express = require('express')
const app = express()
const {
  products, productView
} = require('./routes')

app.set('view engine', 'ejs')

app.use('/', productView)

/** STUB FOR PRODUCTS
{
  totalPages: '12',
  items: [
    {
      itemID: 'abc',
      thumbnail: 'abc',
      shortDescription: 'def',
      name: 'ghi'
    },
    {
      itemID: 'abc',
      thumbnail: 'abc',
      shortDescription: 'def',
      name: 'ghi'
    }
  ]
}
*/

app.get('/working', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end()
})

app.use('/products', products)

// error middleware
app.use(function (err, req, res, next) {
  console.log('At error handler middleware')
  console.log(err)
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send(err.message)
  }
  if (err.name === 'NotFoundError') {
    return res.status(404).send(err.message)
  }
  if (err.name === 'ValidationError') {
    return res.status(403).send(err)
  }
  if (err.name === 'ForbiddenError') {
    return res.status(403).send(err.message)
  }
  res.status(500).send({
    msg: err.message
  })
})

const PORT = process.env.PORT || 8080
// Start the server

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
