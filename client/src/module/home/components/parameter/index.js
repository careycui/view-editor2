import Vue from 'vue';
import ParameterInit from './Parameter.vue';
import merge from 'element-ui/src/utils/merge';

const defaults = {
	title: '详细参数',
	visible: true
}
const ELDialog = Vue.extend(ParameterInit);

const Parameter = ( options ) => {
	const instance = new ELDialog(merge({}, defaults, options));
	const vm = instance.$mount();
	instance.vm = vm;
	instance.dom = vm.$el;
	document.body.appendChild(instance.dom);

	return instance;
} 
export default Parameter;