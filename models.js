const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging:false});

// db.sync({force: true}); // Drops all tables them recreates them based on our JS definitions. Very dangerous to use!

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

Page.beforeValidate((instance) => {
  instance.slug = instance.title.replace(/\s+/g, '_').replace(/\W/g, '');;
  return instance.slug;
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

Page.belongsTo(User, {as: 'author'});

module.exports = { Page, User, db };
