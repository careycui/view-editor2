<template>
	<div class="list">
		<div class="project-card" v-if="!isFolder && folders.length > 0" v-for="folder in folders">
			<div class="project-card--folder" @click="jumpToFolder(folder)">
				<h3>
					<i class="fa fa-folder-o"></i>
				</h3>
				<p>{{folder.name}}</p>
			</div>
		</div>
		<div class="project-card" v-if="pageList.length > 0" v-for="page in pageList">
			<div class="project-card--img">
				<img :src="page.img_cover">
			</div>
			<div class="project-card--title">
				{{ page.title || '未命名页面' }}
			</div>
			<div class="project-card--desc">
				{{ page.desc || '未添加描述' }}
			</div>
			<div class="bottom-bar">
				<el-button-group>
					<el-button size="mini" class="bottom-bar--btn" @click="openEditDialog(page)">
						<i class="fa fa-cog bottom-bar--icon"></i>
						<span class="text">设置</span>
					</el-button>
					<el-button size="mini" class="bottom-bar--btn" @click="shiftOutFolder(page)" v-if="page.folder_id">
						<i class="fa fa-sign-out bottom-bar--icon"></i>
						<span class="text">移出</span>
					</el-button>
					<el-button size="mini" class="bottom-bar--btn" @click="appendToFolder(page)" v-if="!page.folder_id">
						<i class="fa fa-sign-in bottom-bar--icon"></i>
						<span class="text">移入</span>
					</el-button>
					<el-button size="mini" class="bottom-bar--btn" @click="copyPage(page)">
						<i class="fa fa-copy bottom-bar--icon"></i>
						<span class="text">复制</span>
					</el-button>
					<el-button size="mini" class="bottom-bar--btn" @click="excel(page)">
						<i class="fa fa-table bottom-bar--icon"></i>
						<span class="text">参数</span>
					</el-button>
					<el-button size="mini" type="danger" class="bottom-bar--btn" @click="deletePage(page)">
						<i class="fa fa-trash bottom-bar--icon"></i>
						<span class="text">删除</span>
					</el-button>
				</el-button-group>
			</div>
			<div class="project-card--btns">
				<span class="update-time">
					更新时间：{{ page.update_time || page.create_time }}
				</span>
				<div class="el-dropdown" v-trigger-hover>
					<el-button size="small" class="plain-btn">
						<i class="fa fa-eye bottom-bar--icon"></i> 预览 <i class="el-icon-arrow-down el-icon--right"></i>
					</el-button>
					<ul class="el-dropdown-menu el-popper" style="top:35px;display:none;">
						<li class="el-dropdown-menu__item" @click="goPreview(page, 0)">PC</li> 
						<li class="el-dropdown-menu__item" @click="goPreview(page, 1)">Mobile</li>
					</ul>
				</div>
				<div class="el-dropdown" v-trigger-hover>
					<el-button size="small" class="plain-btn">
						<i class="fa fa-pencil bottom-bar--icon"></i> 编辑 <i class="el-icon-arrow-down el-icon--right"></i>
					</el-button>
					<ul class="el-dropdown-menu el-popper" style="top:35px;display:none;">
						<li class="el-dropdown-menu__item" @click="goEditor(page.pc,page.t_type)">PC</li> 
						<li class="el-dropdown-menu__item" @click="goEditor(page.mobile,page.t_type)">Mobile</li>
					</ul>
				</div>
			</div>
			<div class="project-card--sign">
				<img src="//mfs.ys7.com/mall/1749a21b9221474c593e251dc32c739d.png" v-if="page.page_type === 0">
				<img src="//mfs.ys7.com/mall/91b7d8245f8a0006f45e35fbb21734cb.png" v-if="page.page_type === 1">
			</div>
		</div>
		<div class="project-card" v-if="pageList.length < 1">
			<div class="project-card--empty" @click="jumpToCreat">
				<h3><i class="el-icon-plus"></i></h3>
				<p>新建页面</p>
			</div>
		</div>
	</div>
</template>
<script>
	import Parameter from './parameter'
	export default {
		name:'pageList',
		directives: {
			triggerHover: {
				bind: function(el, binding){
					const listDom = el.querySelector('.el-dropdown-menu');

					el.querySelector('button').addEventListener('click',function(){
						if(listDom.style.display == 'none'){
							listDom.style.display = 'block';
						}else{
							listDom.style.display = 'none';
						}
					},false);
					listDom.querySelectorAll('li').forEach((dom, i) => {
						dom.addEventListener('click', function(e){
							listDom.style.display = 'none';
						}, false);
					});
				}
			}
		},
		props:{
			pageList:{
				type: Array,
				default: []
			},
			isFolder:{
				type: Boolean,
				default: false
			},
			folders:{
				type: Array,
				default: () => {
					return [];
				}
			}
		},
		data (){
			return {
				page_type: ''
			}
		},
		beforeMount (){
			if(!this.isFolder){
				let path = this.$route.path;
		    	let type = path.indexOf('info')>-1?'pro':(path.indexOf('topic')>-1?'topic':'');
		    	this.page_type = type;
			}
		},
		methods:{
			openEditDialog (page){
				this.$emit('openEditDialog',page);
			},
			appendToFolder (page){
				this.$emit('appendToFolder', page);
			},
			copyPage (page){
				this.$emit('copyPage', page);
			},
			deletePage (page){
				this.$emit('deletePage', page);
			},
			goPreview (page, platform){
				this.$emit('goPreview', {page:page, platform: platform});
			},
			goEditor (id,type){
				window.location.href="/module/editorre.html?key="+id+'&t_type='+type;
			},
			jumpToCreat (){
				this.activeName = '';
				this.$router.push('/create');
			},
			jumpToFolder (folder){
				this.$router.push('/folder/'+ this.page_type +'/'+folder.id);
			},
			shiftOutFolder (page){
				this.$emit('shiftOutFolder', page);
			},
			excel (page){
				const ins = Parameter();
			}
		}
	}
</script>
<style lang="scss">
.project-card--empty,.project-card--folder{
	width: 100%;
	height: 100px;
	margin-top: 70px;
	text-align: center;
	cursor: pointer;

	& h3{
		color: #d6d6d6;
		font-size: 36px;
		transition: all .3s;
	}
	& p{
		color: #d6d6d6;
		font-size: 18px;
		transition: all .3s;
	}
}
.project-card--folder:hover{
	& h3{
		color: #20A0FF;
	}
	& p{
		color: #20A0FF;
	}
}
</style>