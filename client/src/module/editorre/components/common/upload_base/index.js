import Vue from 'vue'
import main from './main'

let dialogInstance;

let DialogConstructor = Vue.extend(main);
var UploadDialog = function(options){
	// if(dialogInstance){
	// 	dialogInstance.open();
	// 	return dialogInstance.vm;
	// }
	dialogInstance = new DialogConstructor({
		data: options
	});

	let id = 'ud-' + new Date().getTime();
	dialogInstance.id = id;
	dialogInstance.vm = dialogInstance.$mount();
	dialogInstance.dom = dialogInstance.vm.$el;
	document.body.appendChild(dialogInstance.dom);
	dialogInstance.open();
	return dialogInstance.vm;
};

export default UploadDialog;
