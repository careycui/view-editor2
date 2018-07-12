<template>
	<el-dialog
		title="页面信息"
		:visible.sync="baseDialogVisible"
		:close-on-click-modal="false"
		custom-class="dialog-size"
		v-loading.body="loading">
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
</template>
<script>
	export default{
		name: 'pageBase',
		props: {
			baseData: {
				type: Object,
				default: {
					
				}
			}
		},
		data () {
			return {
				baseDialogVisible: true
			}
		}
	}
</script>