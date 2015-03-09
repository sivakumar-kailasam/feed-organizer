import Ember from 'ember';
import layout from '../templates/components/feeds-canvas';
import FlexItemHeightModifierMixin from '../mixins/flex-item-height-modifier';

export default Ember.Component.extend(FlexItemHeightModifierMixin, {


	tagName: 'section',


	heightPercentToSet: 50,


	layout: layout,


	classNames: ['feed-area']

});