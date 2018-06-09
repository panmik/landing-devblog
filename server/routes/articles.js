const router = require('express').Router();
const rh = require('./utils').responseHandler;
const articlesCtrl = require('../controllers/articles');

router
.get('/', rh(articlesCtrl.getAllInPage))
.get('/:articleUrl', rh(articlesCtrl.getByUrl));

module.exports = router;