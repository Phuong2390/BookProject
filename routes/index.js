const express = require('express');
const router = express.Router();
const BookController = require('../http/controller/book/book-controller');
const check = require('../http/middlerware');

let bookController = new BookController();


router.get('/', (req, res) => {
	res.render('search.njk', {title: 'Express'});
});
router.get('/books', check.searchCondition, bookController.search);

router.get('/book/:id', check.searchCondition, bookController.detail);

router.get('/add', (req, res) => {
	res.render('save.njk', {title: 'Express'});
});

router.post('/book',check.checkTitle, check.checkAuthor, check.bookRequest, bookController.createBook);

router.put('/book', check.checkTitle, check.checkAuthor, check.bookRequestEdit, bookController.editBook);

router.put('/delete/:id', bookController.deleteBook);

router.get('/search-advance', check.searchCondition, bookController.search);

router.get('/search-basic', check.searchCondition, bookController.search);

module.exports = router;