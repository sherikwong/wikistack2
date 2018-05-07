const router = require('express').Router();
const addPage = require('../views/addPage')
const {Page, User} = require('../models')

router.get('/', (req, res, next) => {

})

router.post('/', async (req, res, next) => {
  // const page = new Page({
  //   title: req.body.title,
  //   content: req.body.content,
  //   status: req.body.status
  // })

  // const user = new User({
  //   name: req.body.author,
  //   email: req.body.email
  // })

  try {
    const newPage = await Page.create(req.body); // Instead of manually typing out the constants from lines 10-19, you can just use create b/c it builds an instance and saves it into the database at once.

    // await page.save(); // Goes along with lines 11 - 19
    // await user.save();
    res.redirect('/')
  } catch (error) {
    next(error);
  }
})

router.get('/add', (req, res, next) => {
  res.send(addPage()) // Why does using a post on /add redirect to /?
})

module.exports = router;
