class BookController {
	
	deleteBook(request, response, next) {
		let repo = request.app.get('books.repo');
		repo.remove(request.params.id)
				.then(() => response.redirect('/books'))
				.catch(function (error) {
					next(error);
				});
	}
	
	editBook(request, response) {
		let repo = request.app.get('books.repo');
		repo.edit(request.book).then(function () {
			response.status(201).json({message:'Success'});
		});
	}
	
	
	search(request, response, next) {
		console.log(request.condition);
		request.app.get('book.searcher').search(request.condition)
			.then((results) => {
				response.json(results);
			})
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
	
	createForm(request, response, next) {
		request.app.get('publishers.provider').listProvider()
				.then(publishers => response.render('createbook.njk', {publishers: publishers}))
				.catch(next)
	}
	
	createBook(request, response, next) {
		//console.log (request.body, 'bookController');
		request.app.get('books.repo').add(request.book)
				.then(() => response.redirect('/books'))
				.catch(function (error) {
					next(error);
				});
	}
	
	editForm(request, response, next) {
		var bookData = request.app.get('book.searcher').search(request.condition);
		var publisherData = request.app.get('publishers.provider').listProvider();
		Promise.all([bookData, publisherData])
				.then(data => response.render('editbook.njk', {book: data[0][0], publishers: data[1]})
				)
	}
	
	editBook(request, response, next) {
		request.app.get('books.repo').edit(request.book)
				.then(() => response.redirect('/books'))
				.catch(function (error) {
					next(error);
				});
	}
}

module.exports = BookController;