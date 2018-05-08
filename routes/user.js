const router = require('express').Router();
const {User, Page}= require('../models')
const userList = require('../views/userList')
const userPages = require('../views/userPages')

router.get('/', async (req, res, next) => {
  try {
    const authors = await User.findAll()
    res.send(userList(authors));
  } catch (error) {
    next(error)
  }
})

// router.get('/:id', async (req, res, next) => {
//   try {
//     const articles = await Page.findAll({
//       where: {
//         authorId: req.params.id
//       }
//     })

//     res.json(articles);
//     res.send(`helo`)
//     // res.send(userPages(articles))
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const pages = await Page.findAll({
      where: {
        authorId: req.params.Id
      }
    })

    res.send(userPages(user, pages));
  } catch (error) {
    next(error);
  }
})

module.exports = router;
