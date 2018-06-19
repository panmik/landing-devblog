const router = require('express').Router();
const bodyParser = require('body-parser');
const rh = require('./utils').responseHandler;
const sendMail = require('./utils').sendMail;
const commentsCtrl = require('../controllers/comments');
const jsonParser = bodyParser.json();

router
.get('/', rh(commentsCtrl.getAll))
.post('/', jsonParser, rh(commentsCtrl.add))
.get('/:articleUrl', rh(commentsCtrl.getAllInArticle));

module.exports = router;