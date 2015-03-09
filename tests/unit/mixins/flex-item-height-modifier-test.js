import Ember from 'ember';
import FlexItemHeightModifierMixin from '../../../mixins/flex-item-height-modifier';
import { module, test } from 'qunit';

module('FlexItemHeightModifierMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var FlexItemHeightModifierObject = Ember.Object.extend(FlexItemHeightModifierMixin);
  var subject = FlexItemHeightModifierObject.create();
  assert.ok(subject);
});
