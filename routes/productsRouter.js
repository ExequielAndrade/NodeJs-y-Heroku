const express = require('express');
/* const faker = require('faker'); */


const productsService = require('./../services/productService');
const validatorHandler = require('./../middlewares/validator.handeler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/productSchema');


const service = new productsService;

const router = express.Router();


router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get("/filter",  (req, res) => {
  res.send("Yo soy un filter");
})

router.get(
  '/:id',
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
)

router.post(
  '/',
  validatorHandler(createProductSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.json(newProduct)
    } catch (error) {
      next(error)
    }

  }
)

router.patch('/:id',
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body;
      const productEdited = await service.update(id, body)
      res.json(productEdited)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const productDeleted = await service.delete(id);
  res.json(productDeleted)
})

module.exports = router;
