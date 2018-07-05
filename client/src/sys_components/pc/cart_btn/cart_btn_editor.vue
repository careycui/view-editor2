<template>
	<div class="cart-btn-panel">
		<el-tabs v-model="activeTab">
			<el-tab-pane label="内容&样式" name="style" class="editor-pane">
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:60px">ID</label>
					<div class="el-form-item__content" style="margin-left:60px;">
						<el-input size="small" v-model="data.id" class="br2" placeholder="html元素ID"></el-input>
					</div>
				</div>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:60px">组件名</label>
					<div class="el-form-item__content" style="margin-left:60px;">
						<el-input size="small" class="br2" v-model="data.label" placeholder="名称"></el-input>
					</div>
				</div>
				<div class="tab-line">
					<div class="tab-line--title">基础</div>
				</div>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:60px">类型</label>
					<div class="el-form-item__content" style="margin-left:60px;">
						<el-select v-model="data.type" size="small">
							<el-option
								v-for="item in typeOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:60px">位置</label>
					<div class="el-form-item__content" style="margin-left:60px;">
						<el-select v-model="data.pos" size="small">
							<el-option
								v-for="item in posOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="tab-line">
					<div class="tab-line--title">位置</div>
				</div>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:60px;">按钮间距</label>
					<div class="el-form-item__content" style="margin-left:60px;">
						<el-input-number controls-position="right" size="small" :max="1920" v-model="data.btnMargin" style="width:100%;"></el-input-number>
					</div>
				</div>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:40px;">位置</label>
					<el-row style="margin-left:40px;">
						<el-col :span="12">
							<label class="el-form-item__label" style="width:40px;text-align:center;">T</label>
							<div class="el-form-item__content" style="margin-left:40px;">
								<el-input-number controls-position="right" size="small" :max="1920" v-model="data.style.top"></el-input-number>
							</div>
						</el-col>
						<el-col :span="12" v-if="data.pos == 'pos-left'">
							<label class="el-form-item__label" style="width:40px;text-align:center;">L</label>
							<div class="el-form-item__content" style="margin-left:40px;">
								<el-input-number controls-position="right" size="small" :max="1920" v-model="data.style.left"></el-input-number>
							</div>
						</el-col>
						<el-col :span="12" v-else-if="data.pos == 'pos-right'">
							<label class="el-form-item__label" style="width:40px;text-align:center;">R</label>
							<div class="el-form-item__content" style="margin-left:40px;">
								<el-input-number controls-position="right" size="small" :max="1920" v-model="data.style.right"></el-input-number>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	export default {
		name: 'cartBtnEditor',
		components:{
		},
		props:{
			data:{
				type: Object
			}
		},
		data () {
			return {
				activeTab: 'style',
				posOptions:[{
					value: 'pos-left',
					label: '居左'
				},{
					value: 'pos-center',
					label: '居中'
				},{
					value: 'pos-right',
					label: '居右'
				}],
				typeOptions:[{
					value: 'seckill',
					label: '秒杀'
				},{
					value: 'book',
					label: '预售'
				},{
					value: 'manjian',
					label: '满减'
				},{
					value: 'normal',
					label: '正常'
				}]
			}
		}
	}
</script>
<style lang="scss">
	.cart-btn-panel{
		width: 100%;
		background-color: #D3DCE6;
		box-sizing: border-box;
	}
</style>