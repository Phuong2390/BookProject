$(document).ready( function () {
	$('#inputKeyword').hide();
	$('#search-adv').hide();
	$('#book-all').click(function () {
		$.ajax('/books', "GET").then(renderBook);
	});
	
	$('#search').click(function () {
		$('#inputKeyword').show();
	});
	
	$('#search-ad').click(function () {
		$('#inputKeyword').hide();
		$('#search-adv').show();
	});
	$('#keyword').change(function () {
		let $this = $(this);
		$.get('/search-basic', {
			keyword: $(this).val(),
		}).then(renderBook);
	});
	$('#search-advance').click(function () {
		$.get('/search-advance', {
			title       : $("#title").val(),
			author      : $('#author').val(),
			publisher: $("#publisher").val()
		}).then(renderBook);
	});
	
});
function renderBook(books) {
	let template = $ ('#book-template').html ();
	let resultHTML = books.map (function (book) {
		return template.replace (':bookName:', book.title);
	}).join ('');
	$ ('#book-list').html (resultHTML);
}