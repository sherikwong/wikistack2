const router = require('express').Router();
const addPage = require('../views/addPage')
const {Page, User} = require('../models')
const wikiPage = require('../views/wikipage');
const main = require('../views/main')

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll()
  // res.json(pages);
  res.send(main(pages));
})

router.post('/', async (req, res, next) => { // uses form to POST /wiki/, which saves a new page to the DB
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
    const author = await User.create(req.body);
    // await page.save(); // Goes along with lines 11 - 19
    // await user.save();
    // console.log(newPage); // We're console.logging this instance to see if it's being added to the database, instead of checking Postico each time.
    newPage.setAuthor(author);
    res.redirect(`/wiki/${newPage.id}`) // Page that browser goes to after POST is submitted
  } catch (error) {
    next(error);
  }
})

router.get('/add', (req, res, next) => { // Uses browser to GET /add to view the add page
  res.send(addPage())
})

router.get('/:id', async (req, res, next) => {
  try {
    const page = await Page.findById(req.params.id)
    res.send(wikiPage(page))

  } catch (error) {
    next(error);
  }
})

module.exports = router;
