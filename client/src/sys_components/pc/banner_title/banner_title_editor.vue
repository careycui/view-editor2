<template>
	<div class="banner-panel">
		<el-tabs v-model="acitveTab">
			<el-tab-pane label="内容&样式" name="style" class="editor-pane">
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:60px">ID</label>
					<div class="el-form-item__content" style="margin-left:60px;">
						<el-input size="small" class="br2" v-model="data.id" placeholder="html元素ID"></el-input>
					</div>
				</div>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:60px">组件名</label>
					<div class="el-form-item__content" style="margin-left:60px;">
						<el-input size="small" class="br2" v-model="data.label" placeholder="名称"></el-input>
					</div>
				</div>
				<div class="el-form-item">
					<label>标题文本</label>
					<div class="el-form-item__content">
						<el-input size="small" class="br2" v-model="data.text" placeholder="标题文本"></el-input>
					</div>
				</div>
				<div class="tab-line">
					<div class="tab-line--title">基本样式</div>
				</div>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:50px;">透明度</label>
					<div class="el-form-item__content" style="margin-left:50px;">
						<el-input-number size="small" controls-position="right" v-model="data.style.opacity" :step="0.1" :min="0" :max="1"></el-input-number>
					</div>
				</div>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:40px;">边距</label>
					<el-row style="margin-left:40px;">
						<el-col :span="12">
							<label class="el-form-item__label" style="width:40px;text-align:center;">PT ↑</label>
							<div class="el-form-item__content" style="margin-left:40px;">
								<el-input-number size="small" controls-position="right" :max="1920" v-model="data.style.paddingTop"></el-input-number>
							</div>
						</el-col>
						<el-col :span="12">
							<label class="el-form-item__label" style="width:40px;text-align:center;">PB ↓</label>
							<div class="el-form-item__content" style="margin-left:40px;">
								<el-input-number size="small" controls-position="right" :max="1920" v-model="data.style.paddingBottom"></el-input-number>
							</div>
						</el-col>
					</el-row>
				</div>
				<ft v-model="data.style.ft"></ft>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import Ft from './../../../editor_components/ft/ft'
	export default {
		name: 'bannerEditor',
		components:{
			Ft
		},
		props:{
			data: {
				type: Object
			}
		},
		data () {
			return {
				acitveTab: 'style'
			}
		}
	}
</script>
<style lang="scss" scoped>
	.banner-panel{
		width: 100%;
		background-color: #D3DCE6;
		box-sizing: border-box;
	}
	.tag-item{
		display: inline-block;
		height: 100%;
		padding: 0 8px;
	}
</style>