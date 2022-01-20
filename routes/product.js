const express = require('express');

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const {
  create,
  read,
  update,
  remove,
  listAll,
  list,
  productsCount,
  productStar,
  listRelated,
  searchFilters,
} = require('../controllers/product');

router.post('/product', authCheck, adminCheck, create);
router.get('/products/total', productsCount);
router.get('/products/:count', listAll);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, update);
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.post('/products', list);

//rating
router.put('/product/star/:productId', authCheck, productStar);

// related
router.get('/product/related/:productId', listRelated);

// search
router.post('/search/filters', searchFilters);

module.exports = router;
