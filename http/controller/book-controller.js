class BookController {

    constructor() {

    }

    createBook(request, response, next) {
        // console.log(request.book);
        let repo = request.app.get('books.repo');
        repo.add(request.book).then(function () {
			response.status(201).send({message: 'Success !'});
        }).catch(function (err) {
            next(err);
        });
    }

    deleteBook(request, response) {
        let repo = request.app.get('books.repo');
        repo.remove(request.params.id).then(function () {
			response.status(200).render('/book');
        });
    }

    editBook(request, response, next) {
        let repo = request.app.get('books.repo');
        repo.edit(request.book).then(function () {
            response.status(200).json({message:'Success'});
        }).catch(function (err) {
			next(err);
		});
    }


    search(request, response, next) {
        request.app.get('book.searcher').search(request.condition)
            .then((results) => response.status(200).render('listbooks.ejs',{data:results.map(result => result.toJson())}))
            .catch(next)
    }
}

module.exports = BookController;