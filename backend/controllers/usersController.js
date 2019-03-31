const UsersModel = require('../models/usersModel.js')

/**
 * usersController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

  /**
   * usersController.list()
   */
  list: (req, res) => {
    UsersModel.find(req.query.where, req.query.fields, req.query.sort, (err, users) => {
      if (err) {
        return res.status(500).json({
          message: 'Erro ao obter users.',
          error: err
        })
      }
      return res.json(users)
    })
  },

  /**
   * usersController.show()
   */
  show: (req, res) => {
    let id = req.params.id
    UsersModel.findOne({_id: id}, (err, users) => {
      if (err) {
        return res.status(500).json({
          message: 'Erro ao obter users específico.',
          error: err
        })
      }
      if (!users) {
        return res.status(404).json({
          message: 'users não encontrado'
        })
      }
      return res.json(users)
    })
  },

  /**
   * usersController.create()
   */
  create: (req, res) => {
    let users = new UsersModel(req.body)

    users.save((err, users) => {
      if (err) {
        return res.status(500).json({
          message: 'Erro ao criar users',
          error: err
        })
      }
      return res.status(201).json(users)
    })
  },

  /**
   * usersController.update()
   */
  update: (req, res) => {
    let id = req.params.id
    UsersModel.findOne({_id: id}, (err, users) => {
      if (err) {
        return res.status(500).json({
          message: 'Erro ao obter users',
          error: err
        })
      }
      if (!users) {
        return res.status(404).json({
          message: 'users não encontrado'
        })
      }

      for (let attr in users) {
        users[attr] = req.body[attr] || users[attr]
      }
      
      users.save((err, users) => {
        if (err) {
          return res.status(500).json({
            message: 'Erro ao atualizar users.',
            error: err
          })
        }

        return res.json(users)
      })
    })
  },

  /**
   * usersController.remove()
   */
  remove: (req, res) => {
    let id = req.params.id
    UsersModel.findByIdAndRemove(id, (err, users) => {
      if (err) {
        return res.status(500).json({
          message: 'Erro ao deletar users.',
          error: err
        })
      }
      return res.status(204).json()
    })
  }
}
