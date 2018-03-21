const express = require('express');
const router = express.Router();
const BookController = require('../http/controller/book/book-controller');
const check = require('../http/middlerware');
const IdSearchCondition = require('./../src/search-services/id-search-condition');

let bookController = new BookController();


router.get('/', (req, res) => {
	res.render('home.njk', {title: 'Express'});
});

router.get('/books', check.searchCondition, bookController.search);

router.get('/search-basic', check.searchCondition, bookController.search);

router.get('/search-advance', check.searchCondition, bookController.search);

module.exports = router;