module.exports = function (req, res, next) {
	let factory = req.app.get('book.factory');
	factory.makeFromRequest(req.body).then(book => {
		book.setId(req.params.id);
		req.book = book;
		next();
	});
};