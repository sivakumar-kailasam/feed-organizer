import Ember from 'ember';
import CollectionActionsMixin from '../../../mixins/collection-actions';
import { module, test } from 'qunit';

module('CollectionActionsMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var CollectionActionsObject = Ember.Object.extend(CollectionActionsMixin);
  var subject = CollectionActionsObject.create();
  assert.ok(subject);
});
