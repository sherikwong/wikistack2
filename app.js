const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {User, Page} = require('./models')

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
})

app.use('/wiki', wikiRouter); // Won't work unless you export it in other files
app.use('/user', userRouter)

const init = async () => {
  await Page.sync();
  await User.sync(); // Syncs models to tables. Place synchronization here b/c it prevents us from making requests to the DB before it is synced.

  app.listen(3000, () => {
    console.log('Listening...')
  })
}

init();



