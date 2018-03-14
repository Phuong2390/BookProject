 const Publisher = require('./publisher');

class PublisherFactory {
    static make(publisherRaw) {
        let publisher = new Publisher(publisherRaw.name);
        publisher.setAddress(publisherRaw.address);
        publisher.setPhone(publisherRaw.phone);
        return publisher;
    }
}

module.exports = PublisherFactory;