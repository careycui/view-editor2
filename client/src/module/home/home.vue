<template>
	<el-container id="home">
		<el-header class="top-bar">
			<h3 class="top-bar--title"> Home - <small>页面编辑器 V 2.0.0</small> </h3>
		</el-header>
		<el-container class="container">
			<el-aside class="project-bar">
				<div class="project-bar--box">
					<div class="project-bar--btns">
						<el-button type="primary" size="large" icon="plus" @click="openPage">
							创建页面
						</el-button>
					</div>
					<hr class="hr-line">
					<el-menu 
						:default-active="activeName"
						:unique-opened="true"
						class="el-menu-vertical-demo no-border"
						background-color= '#324157'
				      	text-color="#fff"
						:router="true"
						@select="hangdleSelect">
						<el-menu-item index="/info/pro" :route="{path:'/info/pro'}">
								<i class="el-icon-document"></i>详情页
						</el-menu-item>
						<el-menu-item index="/topic/topic" :route="{path:'/topic/topic'}">
							<i class="el-icon-document"></i>专题活动页
						</el-menu-item>
						<el-submenu index="3">
							<template slot="title">
								<i class="el-icon-menu"></i>
								素材库
							</template>
							<el-menu-item index="/assetimg" :route="{path:'/assetimg'}">
								<i class="el-icon-picture"></i>
								图片
							</el-menu-item>
								<el-menu-item index="/assettmp" :route="{path:'/assettmp'}">
								<i class="el-icon-document"></i>
								模板
							</el-menu-item>
						</el-submenu>
				    </el-menu>
				    <hr class="hr-line">
				    <div v-if="page_type">
					    <div class="folders">
					    	<div class="folders-title">
					    		{{ page_type==='pro'?'详情页':'专题' }}
					    	</div>
					    	<ul class="folders-list el-menu-vertical-demo no-border el-menu" style="background-color:#324157;">
					    		<li class="folders-list__item el-menu-item" v-for="folder in folders" @click="jumpToFolder(folder)">
					    			<i class="fa fa-folder-o el-icon"></i>
					    			{{ folder.name }}
					    			<i class="el-icon-delete" @click.stop="deleteFolder(folder)"></i>
					    			<i class="el-icon-setting" @click.stop="folderSetting(folder)"></i>
					    		</li>
					    	</ul>
					    </div>
						<div class="project-bar--btns">
							<el-button class="dashed-btn" icon="plus" @click="addFolder">
								创建文件夹
							</el-button>
						</div>
				    </div>
				</div>
			</el-aside>
			<el-main class="main">
				<router-view @openBase="openBase" @openPreview="openPreview" :folders="folders"></router-view>
			</el-main>
		</el-container>
		<el-dialog title="页面信息" :visible.sync="baseDialogVisible" :close-on-click-modal="false" custom-class="dialog-size" v-loading.body="loading">
			<el-row v-if="editPage">
				<el-col :md="10" :xs="24" :sm="24" style="text-align:center;">
					<div class="project-card" style="margin:0;">
    					<div class="project-card--img">
    						<img :src="editPage.img_cover">
    					</div>
    					<div class="project-card--title">
    						{{ editPage.title || '未命名页面' }}
    					</div>
    					<div class="project-card--desc">
    						{{ editPage.desc || '未添加描述' }}
    					</div>
    					<div class="project-card--sign">
    						<img src="//mfs.ys7.com/mall/1749a21b9221474c593e251dc32c739d.png" v-if="editPage.page_type === 0">
    						<img src="//mfs.ys7.com/mall/91b7d8245f8a0006f45e35fbb21734cb.png" v-if="editPage.page_type === 1">
    					</div>
    				</div>
				</el-col>
				<el-col :md="14" :xs="24" :sm="24">
					<el-form label-position="top" label-width="80px">
						<el-form-item label="封面图" :form="editPage">
							<el-input size="small" v-model="editPage.img_cover">
								<template slot="prepend">URL</template>
							</el-input>
						</el-form-item>
						<el-form-item label="页面名称">
							<el-input size="small" v-model="editPage.title"></el-input>
						</el-form-item>
						<el-form-item label="页面描述">
							<el-input type="textarea" :rows="3" size="small" v-model="editPage.desc"></el-input>
						</el-form-item>
						<el-form-item label="页面类型">
							<el-input :disabled="true" :value="editPage.page_type === 0?'BASE':'H5'"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="baseDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitBase">确 定</el-button>
		  	</div>
		</el-dialog>
		<preview :visible="isPreview" :srcdoc="html" @updateVisible="updateVisible" :pt="viewPt"></preview>
	</el-container>
</template>
<script>
	import Preview from './components/preview_dialog'
	import { Message,MessageBox } from 'element-ui'
	export default {
		name: 'home',
		components:{
			Preview
		},
		data () {
			return {
				activeName: '',
				baseDialogVisible: false,
				editPage: '',
				loading: false,
				isPreview: false,
				html: '',
				viewPt: 0,
				folders:[],
				page_type: 'pro'
			}
		},
		watch:{
			page_type (n, o){
				if(n && n !== o){
					this.setFolders(n);
				}
			},
			'$route' (to, from){
				this.activeName = to.path;
			}
		},
		beforeMount () {
			this.activeName = this.$route.path;
			let path = this.$route.path;
	    	let type = (path.indexOf('info')>-1||path.indexOf('pro')>-1)?'pro':(path.indexOf('topic')>-1?'topic':'');
	    	this.page_type = type;
		},
		mounted (){
			if(this.page_type){
				this.setFolders(this.page_type);
			}
		},
		methods : {
			setFolders (type){
				let _this = this;
				this.$http({
					url: G.C.apiPath + 'folder/get/' + type,
						method: 'GET',
						responseType: 'json'
					}).then(function(res){
						_this.folders = res.data;
					}, function(err,xhr){

					});
			},
			hangdleSelect (index, indexPath) {
				this.activeName = index;
				this.page_type = indexPath[0].indexOf('info')>-1?'pro':(indexPath[0].indexOf('topic')>-1?'topic':'');
			},
			openPage () {
				this.activeName = '';
				this.$router.push('/create');
			},
			submitBase () {
				var _this = this;
				this.loading = true;
				this.$http({
					url: G.C.apiPath + 'base/update',
						method: 'POST',
						data:_this.editPage,
						responseType: 'json'
					}).then(function(res){
						_this.baseDialogVisible = false;
						_this.loading = false;
					}, function(err,xhr){
						Message({
							message: '保存失败,请稍后再试',
							showClose: true,
							type: 'error'
						});
						_this.loading = false;
					});
			},
			openBase (page) {
				if(page){
					this.baseDialogVisible = true;
					this.editPage = page;
				}else{
					Message({
						message: '获取页面数据失败',
						showClose: true,
						type: 'error'
					});
				}
			},
			openPreview (data) {
				const _this = this;
				let pageId;
				let t_type = data.page.page_type == 0? 'pro' : 'topic';
				this.loading = true;
				if(data.platform == 0){
					pageId = data.page.pc;
				}else{
					pageId = data.page.mobile;
				}
				this.$http({
					url: G.C.apiPath + t_type + '/getPage/' + pageId,
						method: 'GET',
						data:_this.editPage,
						responseType: 'json'
					}).then(function(res){
						const page = res.data.page;
						_this.loading = false;

						let html = JSON.parse(page.html_data);

						let css = '<link rel="stylesheet" type="text/css" href="'+ G.C.staticPath +'static/component.css" />' ;
					  	let css1 = '<link rel="stylesheet" type="text/css" href="'+ G.C.staticPath +'static/animate-min.css" />' ;
					  	let lib = '\<script type="text/javascript" src="'+ G.C.staticPath +'static/jquery.min.js"\>\<\/script\>';
					  	let lib1 = '\<script type="text/javascript" src="'+ G.C.staticPath +'static/img-slide-min.js"\>\<\/script\>';
					  	let lib2 = '\<script type="text/javascript" src="'+ G.C.staticPath +'static/aniview-min.js"\>\<\/script\>';
					  	let pagejs = '\<script type="text/javascript" src="'+ G.C.staticPath +'static/page.js"\>\<\/script\>';

				      	let mcss = '<link rel="stylesheet" type="text/css" href="'+ G.C.staticPath +'static/ezviz-m.css" />';
		     			let mcss1 = '<link rel="stylesheet" type="text/css" href="'+ G.C.staticPath +'static/animate-min.css" />';

				      	let pt = page.platform_type;
				      	let src;
				      	if(pt === 1){
				      		src = mcss + mcss1  + html;
				      	}else{
				      		src = css + css1 + html + lib + lib1 + lib2 + pagejs;
				      	}

						if(!html){
							Message({
								message: '还未添加页面内容',
								showClose: true,
								type: 'error'
							});
							return;
						}
						_this.viewPt = pt;
						_this.html = src;
						_this.isPreview = true;

					}, function(err,xhr){
						Message({
							message: '获取页面数据失败,请稍后再试',
							showClose: true,
							type: 'error'
						});
						_this.loading = false;
				});
			},
		    updateVisible (val) {
		      this.isPreview = val;
		    },
		    addFolder (){
		    	let type = this.page_type;

		    	let _this = this;
		    	MessageBox.prompt('请输入文件夹名称', '提示', {
		    		confirmButtonText: '确定',
		    		cancelButtonText: '取消'
		    	}).then(({value}) => {
		    		_this.$http({
						url: G.C.apiPath +'folder/create',
						method: 'POST',
						data:{name:value,type:type},
						responseType: 'json'
					}).then(function(res){
						_this.folders.push(res.data);
					}, function(err,xhr){
						Message({
							message: '创建文件夹失败,请稍后再试',
							showClose: true,
							type: 'error'
						});
					});
		    	}).catch(() => {

		    	});
		    	
		    },
		    deleteFolder (folder){
		    	const _this = this;
		    	MessageBox.confirm('确定删除该文件夹？', '提示', {
		    		confirmButtonText: '确定',
		    		cancelButtonText: '取消',
		    		type: 'warning'
		    	}).then(({value}) => {
		    		_this.$http({
							url: G.C.apiPath +'folder/delete',
							method: 'POST',
							data:{id:folder.id, trash: 0},
							responseType: 'json'
						}).then(function(res){
							_this.setFolders(_this.page_type);
							Message({
				    			type: 'success',
				    			message: '删除成功'
				    		});
						}, function(err,xhr){
							Message({
								message: '删除失败',
								showClose: true,
								type: 'error'
							});
						});
		    		
		    	}).catch(() => {
		    		
		    	});
		    },
		    folderSetting (folder){
		    	const h = this.$createElement;
		    	const _this = this;
		    	let tmpName = folder.name;
		    	MessageBox({
		    		title: '文件夹编辑',
		    		message: h(
		    			'div',
		    			{
		    				class:{
		    					'el-form-item': true
		    				},
		    				style:{
		    					marginBottom: 0
		    				}
		    			},[
		    				h('label',
		    					{
		    						class:{
		    							'el-form-item__label':true
		    						},
		    						style:{
		    							width:'60px'
		    						}
		    					},
		    					 '文件名'),
		    				h('div',{
		    						 class:{
		    							'el-form-item__content':true
		    						},
		    						style:{
		    							marginLeft: '60px'
		    						}
		    				},[
			    				h('input', 
			    					{
			    						class:{
			    							'el-input__inner': true
			    						},
			    						domProps:{
			    							value: folder.name
			    						},
			    						on: {
								      			input: function (value) {
									        		tmpName = event.target.value
							     	 			}
									    }
			    					},
			    					null
			    				)
		    					])
		    			]
	    			),
	    			showCancelButton: true,
		    		confirmButtonText: '确定',
		    		cancelButtonText: '取消'
		    	}).then((value) => {
		    		if(tmpName !== folder.name){
		    			_this.$http({
							url: G.C.apiPath +'folder/update',
							method: 'POST',
							data:{id:folder.id, name:tmpName, type:folder.type},
							responseType: 'json'
						}).then(function(res){
							folder.name = tmpName;
						}, function(err,xhr){
							Message({
								message: '更新文件夹失败,请稍后再试',
								showClose: true,
								type: 'error'
							});
						});
		    		}
		    	}).catch(() => {
		    		tmpName = '';
		    	});
		    },
		    jumpToFolder (folder){
		    	this.$router.push('/folder/'+ this.page_type +'/'+folder.id);
		    }
		}
	}
</script>
<style lang="scss">
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.ani.active{
		-webkit-animation-play-state: running;
		-moz-animation-play-state: running;
		animation-play-state: running;
	}
	.ani.delay{
		animation-delay: .4s;
	}
	#home{
		width: 100%;
		height: 100%;
	}
	.project-bar{
		height: 100%;
		overflow-y: auto;
		background-color: #324157;
		border-right: 2px solid #e6e6e6;

		& .project-bar--box{
			margin-top: 20px;
		}
	}
	.project-bar--btns{
		width: 100%;
		padding-bottom: 20px;
		text-align: center;
	}
	.hr-line{
		border: 0;
		border-top: 1px solid #475669;
	}
	.project-card--sign{
		position: absolute;
		left: 0;
		top: 0;
	}
	.project-body--box{
		background-color: #D3DCE6;
		height: 100%;
		overflow: auto;
		& .project-body--title{
			background-color: #fff;

			& h3{
				margin-bottom: 0;
				padding: 0 40px;
				height: 60px;
				line-height: 60px;
				vertical-align: middle;
				color: #475669;
				font-weight: 400;
			}
		}

		& .project-body--body{

			& .el-tabs__header{
				padding: 0 40px;
				background-color: #fff;
			}
			& .el-tabs__content{
				padding: 0 40px;
			}
		}
	}
	.top-bar{
		width: 100%;
		height: 40px;
		padding-left: 10px;
		background-color: #20A0FF;
		background-image: linear-gradient(45deg,#20A0FF,#a8de69);
		z-index: 100;

		box-shadow: 0 0 10px rgba(0,0,0,.4);
	}
	.top-bar--title{
	    height: 60px;
	    vertical-align: middle;
	    line-height: 60px;
	    color: #f1f1f1;

	    & h3{
	    	font-weight: normal;

		    & small{
		    	color: #F1F1F1;
		    }
	    }
	}
	.list{
		margin: 20px 0 40px 0;
	}
	.container{
		height: calc(100% - 60px);
	}
	.main{
		min-height: 100%;
		padding: 0;
	}
	.project-card{
		position: relative;
		display:inline-block;
		vertical-align: top;
		width: 200px;
		height: 240px;
		margin-right: 30px;
		margin-bottom: 20px;
		background-color: #fff;
		border-radius: 5px;
		overflow: hidden;
		box-shadow: 0 2px 4px rgba(0,0,0,0.05);
		-webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
		-ms-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);

		-webkit-transition: all .45s ease-out;
		-moz-transition: all .45s ease-out;
		transition: all .45s ease-out;

		& .project-card--img{
			width: 100%;
			height: 180px;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			overflow: hidden;
			text-align: center;

			& img{
				display: inline-block;
				height: 100%;
				max-width: 100%;
			}
		}
		& .project-card--title{
			padding: 5px 10px;
			text-align: center;
		    text-overflow: ellipsis;
		    overflow: hidden;
		    white-space: nowrap;
		    color: #324057;
		}
		& .project-card--desc{
			padding: 0px 10px;
			font-size: 12px;
			text-align: center;
		    text-overflow: ellipsis;
		    overflow: hidden;
		    white-space: nowrap;
		    color: #99A9BF;
		}
		& .project-card--btns{
			position: absolute;
			left: 0;
			top: 0;
			padding-top: 50px;
			width: 200px;
			height: 180px;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			text-align: center;
			z-index: 10;
			background-color: rgba(0,0,0, .6);
			visibility: hidden;
			opacity: 0;

			-webkit-transition: all .3s ease-out;
			-moz-transition: all .3s ease-out;
			transition: all .3s ease-out;

			& .update-time{
				display: block;
				color: #fff;
				text-align:center;
				line-height: 1.5;
				font-size: 12px;
			}

		}
		.bottom-bar{
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 35px;
			padding: 4px 10px;
			background-color: #fff;
			word-spacing: -8px;
			text-align: right;
			-webkit-transform: translate3d(0, 40px, 0);
			-moz-transform: translate3d(0, 40px, 0);
			-ms-transform: translate3d(0, 40px, 0);
			transform: translate3d(0, 40px, 0);
			-webkit-transition: all .25s ease-out;
			-moz-transition: all .25s ease-out;
			-ms-transition: all .25s ease-out;
			transition: all .25s ease-out;
		}

		&:hover{
			box-shadow: 0 8px 15px rgba(0,0,0,0.15);
			-webkit-transform: translate3d(0, -5px, 0);
			-moz-transform: translate3d(0, -5px, 0);
			-ms-transform: translate3d(0, -5px, 0);
			transform: translate3d(0, -5px, 0);

			& .project-card--btns{
				visibility:	visible;
				opacity: 1;
			}

			& .bottom-bar{
				-webkit-transform: translate3d(0, 0, 0);
				-moz-transform: translate3d(0, 0, 0);
				-ms-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
			}
		}
	}
	.dialog-size{
		max-width: 800px;
		background-color: #D3DCE6;
	}
	.bottom-bar--btn{
		overflow:hidden;
		text-align: center;
		padding: 7px 6px;
		width: 25px;
		& span.text{
			display: inline-block;
			opacity: 0;
		}
		&:hover{
			width: 60px;

			& span.text{
				opacity: 1;
			}
		}
	}
	.el-button.plain-btn{
		background-color: transparent;
		color: #fff;
	}
	.el-button.dashed-btn{
		margin-top: 40px;
		width: 80%;
		border-radius: 0;
		border: 1px dashed #607d8b;
		background-color: transparent;
		color: #607d8b;
	}
	.el-icon{
		margin-right: 5px;
		width: 24px;
		text-align: center;
	}
	.fade-bottom-enter-active{
		transition: all .5s;
		transform-origin: right top;
	}
	.fade-bottom-leave-active{
		transition: all .5s;
		transform-origin: right top;
	}
	.fade-bottom-enter{
		transform: translate(0, 40px);
	}
	.fade-bottom-leave-to{
		transform: scale(0, 40px);
	}
	.folders-title{
		padding-left: 20px;
		height: 56px;
		line-height: 56px;
		vertical-align: middle;
		color: #bfcbd9;
	}
	.folders-list__item{
		color: #fff;
		&:hover{
			background-color: #324157;
		}
		& .el-icon-setting, & .el-icon-delete{
		    position: absolute;
		    right: 20px;
		    top: 50%;
		    margin-top: -7px;
		}
		& .el-icon-delete{
			right: 50px;
			// color: #20a0ff;
		}
	}
	.no-border{
		border: 0 !important;
	}
</style>