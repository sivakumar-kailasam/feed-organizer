import Ember from 'ember';
import FeedActionsMixin from '../../../mixins/feed-actions';
import { module, test } from 'qunit';

module('FeedActionsMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var FeedActionsObject = Ember.Object.extend(FeedActionsMixin);
  var subject = FeedActionsObject.create();
  assert.ok(subject);
});
