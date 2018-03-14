class BookController {
	
	constructor() {
	
	}
	
	createBook(request, response, next) {
		// console.log(request.book);
		let repo = request.app.get('books.repo');
		repo.add(request.book).then(function () {
			response.status(201).send({message: "Success!"});
		}).catch(function (err) {
			next(err);
		});
	}
	
	deleteBook(request, response) {
		let repo = request.app.get('books.repo');
		repo.remove(request.params.id).then(function () {
			response.status(200).json({message:'Success'});
		});
	}
	
	editBook(request, response) {
		let repo = request.app.get('books.repo');
		repo.edit(request.book).then(function () {
			response.status(201).json({message:'Success'});
		});
	}
	
	
	search(request, response, next) {
		request.app.get('book.searcher').search(request.condition)
				.then(books => response.render('listbook.njk', {books:books}))
				.catch(next)
	}
	
	detail(request, response, next) {
		request.app.get('book.searcher').search(request.condition)
				.then(books => {
					if(!books.length) {
						return response.status(404).send('Not Found');
					}
					response.render('detail.njk', {book:books[0]})
				})
				.catch(next)
	}
}

module.exports = BookController;