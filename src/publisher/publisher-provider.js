const Publisher  = require('./publisher');
const connection = require('../../database/connection');
const PublisherFactory = require('./publisher-factory');

class PublisherProvider {
	
	/**
	 *
	 * @param connection
	 */
	constructor(connection, factory) {
		//todo
		this.connection = connection;
	}
	
	providerById (publisherId) {
		return connection.select()
				.from('publishers')
				.where({id : publisherId})
				.then(results => {
					let publisher = new Publisher(results[0].name);
					publisher.setId(results[0].id);
					publisher.setAddress(results[0].address);
					publisher.setPhone(results[0].phone);
					return publisher;
				});
	}
	
	listProvider() {
		let factory = new PublisherFactory();
		return this.connection.select().from('publishers')
				.where({deleted_at: null})
				.then(publisherRaw => publisherRaw.map(element => factory.make(element)));
	}
}

module.exports = PublisherProvider;
