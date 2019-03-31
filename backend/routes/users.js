const express = require('express')
const acl = require('../middlewares').acl
const router = express.Router()
const usersController = require('../controllers/usersController.js')

/*
 * MIDDLEWARE
 */
router.use((req, res, next) => {
  let query = {}

  if (req.query.where) {
    query.where = JSON.parse(req.query.where)
  }
  if (req.query.fields) {
    query.fields = JSON.parse(req.query.fields)
  }
  if (req.query.sort) {
    query.sort = { sort: JSON.parse(req.query.sort) }
  } else {
    query.sort = {}
  }
  if (req.query.limit) {
    query.sort.limit = parseInt(req.query.limit, 10)
  }
  if (req.query.skip) {
    query.sort.skip = parseInt(req.query.skip, 10)
  }
  req.query = query

  next()
})

/*
 * GET
 */
router.get('/', acl.checkPermissions('users:list'), (req, res) => {
  usersController.list(req, res)
})

/*
 * GET
 */
router.get('/:id', acl.checkPermissions('users:item'), (req, res) => {
  usersController.show(req, res)
})

/*
 * POST
 */
router.post('/', acl.checkPermissions('users:create'), (req, res) => {
  usersController.create(req, res)
})

/*
 * PUT
 */
router.put('/:id', acl.checkPermissions('users:update'), (req, res) => {
  usersController.update(req, res)
})

/*
 * DELETE
 */
router.delete('/:id', acl.checkPermissions('users:delete'), (req, res) => {
  usersController.remove(req, res)
})

module.exports = router
