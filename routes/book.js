const express = require('express');
const router = express.Router();
const BookController = require('../http/controller/book/book-controller');
const check = require('../http/middlerware');
const IdSearchCondition = require('./../src/search-services/id-search-condition');

let bookController = new BookController();


router.get('/', (req, res) => {
	res.render('search.njk', {title: 'Express'});
});
router.get('/books', check.searchCondition, bookController.search);

router.get('/book/:id', check.searchCondition, bookController.detail);

router.get('/search-advance', check.searchCondition, bookController.search);

router.get('/search-basic', check.searchCondition, bookController.search);

router.get('/create', bookController.createForm);
router.post('/create-book', check.bookRequest, bookController.createBook);

router.get('/delete/:id', bookController.deleteBook);

router.get('/edit/:id',function (req, res, next) {
	req.condition = new IdSearchCondition(req.params.id);
	next();
}, bookController.editForm);
router.post('/edit-book/:id', check.bookRequestEdit, bookController.editBook);

module.exports = router;