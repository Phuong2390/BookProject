const AdvanceSearchCondition = require('../../src/search-services/advance-search-condition');
const KeywordSearchCondition = require('../../src/search-services/keyword-search-condition');
const UndeletedSearchCondition = require('../../src/search-services/undeleted-search-condition');
const IdSearchCondition = require('../../src/search-services/id-search-condition');

module.exports = (req, res, next) => {
    req.condition = makeCondition(req);
    next();
};
function makeCondition(request) {
    if(request.path === '/search-advance') {
        return new AdvanceSearchCondition(request.query.title, request.query.author, request.query.publisher);
    } else if (request.path === '/search-basic'){
        return new KeywordSearchCondition(request.query.keyword);
    } else if (request.path === '/books'){
        return new UndeletedSearchCondition();
    } else if (request.path.toString().startsWith('/books/')) {
        return new IdSearchCondition(request.params.id);
    }
}