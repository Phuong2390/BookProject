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
	
	createForm(request, response, next) {
		request.app.get('publishers.provider').listProvider()
			.then(publishers => response.render('createbook.njk', {publishers: publishers}))
			.catch(next)
	}
	
	createBook(request, response, next) {
		console.log (request.body, 'bookController');
		request.app.get('books.repo').add(request.book)
			.then(() => response.redirect('/books'))
			.catch(function (error) {
				next(error);
			});
	}
	
	editForm(request, response, next) {
		request.app.get('publishers.provider').listProvider()
				.then(publishers => response.render('editbook.njk', {publishers: publishers}))
				.catch(next)
	}
}

module.exports = BookController;