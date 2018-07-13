import Sys from '@/sys_components/sys-ui'
export default {
	install (Vue, options) {
		const path = '@/sys_components/pc/pc_config';
		const coms = () => import('@/sys_components/pc/pc_config');
		const c = coms();
		c.then(({SYS_UI_DESC}) => {
			console.log(SYS_UI_DESC);
		});
		Sys.install(Vue,options);
	}
}