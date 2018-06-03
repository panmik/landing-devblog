const router = require('express').Router();
const rh = require('./index').responseHandler;
const articlesCtrl = require('../controllers/articles');

router
.get('/', rh(articlesCtrl.getAllInPage))
.get('/:articleUrl', rh(articlesCtrl.getByUrl));

module.exports = router;