const Joi = require('@hapi/joi')
const express = require('express')
const router = express.Router()
const { NotFoundError, ValidationError } = require('../error')
const productHelper = require('../dataHelpers/products')

// get list of products
router.get('/', async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      maxId: Joi.number()
    })
    const result = Joi.validate(req.query, schema)
    let params = {
      maxId: req.query.maxId ? req.query.maxId : ''
    }
    if (result.error) {
      throw new ValidationError('Validation Failed', result.error)
    }
    let productResult = await productHelper.getProducts(params)
    res.render('pages/index', productResult)
  } catch (e) {
    next(e)
  }
})

module.exports = router
