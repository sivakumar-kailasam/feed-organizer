import Ember from 'ember';

export default Ember.Mixin.create({

	_changeWatcherProperty: '',

	prevCollectionName: null,

	newCollectionName: null,


	doesNewCollectionNameExist: function() {

		let existingCollectionNames = this.store.all('collection').getEach('label');
		let newCollectionName = this.get('newCollectionName');

		if (newCollectionName === this.get('prevCollectionName')) {
			return false;
		}

		return (existingCollectionNames.indexOf(newCollectionName) !== -1);

	}.property('newCollectionName'),


	_isSaveDisabled: function() {
		return Ember.isEmpty(this.get('newCollectionName')) && this.get('doesNewCollectionNameExist');
	}.property('newCollectionName', 'doesNewCollectionNameExist'),


	actions: {


		filterByCollection: function(collectionId) {
			Ember.debug(`Filtering by collection id : ${collectionId}`);
			this.set('collection', collectionId);
		},


		renameCollection: function(collection) {
			this.setProperties({
				'prevCollectionName': collection.get('label'),
				'newCollectionName': collection.get('label')
			});
			Ember.$('#collection-rename-dialog').openModal();
			Ember.$('input[name="newCollectionName"]').focus();
		},


		saveCollectionName: function() {

			if (this.get('_isSaveDisabled') || this.get('doesNewCollectionNameExist')) {
				return;
			}

			let newCollectionName = this.get('newCollectionName');
			let prevCollectionName = this.get('prevCollectionName');

			this.store.all('collection').forEach(collection => {
				if (collection.get('label') === prevCollectionName) {
					collection.set('label', newCollectionName);
				}
			});


			this.set('_changeWatcherProperty', Date.now());

			Ember.$('#collection-rename-dialog').closeModal();

			window.toast(`${prevCollectionName} is now called ${newCollectionName}`, 4000);

		},


		toggleCollectionVisibility: function(collectionToShare) {
			let _this = this;
			let newStatus;
			this.store.all('collection').filter(collection => {
				if (collectionToShare.get('id') === collection.get('id')) {
					Ember.debug(`Toggling visibility of collection ${collection.title}`);
					collection.toggleProperty('isShared');
					newStatus = collection.get('isShared');
					_this.set('_changeWatcherProperty', Date.now());
				}
			});

			let status = newStatus ? 'shared' : 'private';
			window.toast(`${collectionToShare.get('label')} is now a ${status} collection`, 4000);
		}

	}

});