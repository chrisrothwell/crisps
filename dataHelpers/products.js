const axios = require('axios')
const decode = require('unescape')
const url = require('url')
const querystring = require('querystring')
const API_BASEPATH = 'http://api.walmartlabs.com/v1'
const TAXONOMY = '976759_976787_1001390'
const API_KEY = 'fqyn8nggd9zkkb2w33ex2bmf'

/**
Walmart taxonomy
{
    "id": "976759_976787_1001390",
    "name": "Chips & Crisps",
    "path": "Food/Snacks, Cookies & Chips/Chips & Crisps"
}
*/

const productHandler = {
  getProducts: async (options) => {
    var response

    const HEADER_FIELDS = [
      'totalPages'
    ]
    const ITEM_FIELDS = [
      'itemId',
      'name',
      'shortDescription',
      'longDescription',
      'thumbnailImage',
      'mediumImage',
      'largeImage',
      'productUrl'
    ]

    let params = {
      format: 'json',
      category: TAXONOMY,
      apiKey: API_KEY
    }

    if (options.maxId) {
      params.maxId = options.maxId
    }

    response = await axios.get(API_BASEPATH + '/paginated/items', {
      params: params
    })

    var returnObj = {}
    var allItems = []
    HEADER_FIELDS.forEach((header) => {
      returnObj[header] = response.data[header]
    })

    returnObj.maxId = querystring.parse(url.parse(response.data.nextPage).search).maxId

    response.data.items.forEach((item) => {
      var eachItem = {}
      ITEM_FIELDS.forEach((itemField) => {
        eachItem[itemField] = decode(item[itemField])
      })
      allItems.push(eachItem)
    })
    returnObj.items = allItems
    return returnObj
  }
}

module.exports = productHandler
