<template>
	<el-dialog
		title="详细参数"
		:visible.sync="visible"
		width="80%"
		:close-on-click-modal="false"
		:close-on-press-escape="false">
		<el-row style="height: 480px;">
			<el-col :span="24">
				<el-upload
					action=""
					:file-list="fileList"
					accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
					:before-upload="handleBefore">
					<el-button size="small" type="primary">上传</el-button>
				</el-upload>
			</el-col>
			<el-col :span="24" v-if="tableData.excelData" style="height:450px;" class="result-content">
				<happy-scroll>	
					<p style="text-align:center;">
						PC{{tableData.fileName}}详细参数
						<el-button type="primary" class="copy-pc-detailed-parameters">复制</el-button>
					</p>
				  	<div class="pc-content">
			            <div class="p1200">
			                <table class="pro_infobox">
		                        <pc-table :tableData="tableData"></pc-table>
			                </table>
			            </div>
			        </div>
					<p style="text-align:center;">
						Mobile{{tableData.fileName}}详细参数
						<el-button type="primary" class="copy-mobile-detailed-parameters">复制</el-button>
					</p>
				  	<div class="mobile-content">
			           <mobile-table :tableData="tableData"></mobile-table>
			        </div>
				</happy-scroll>
			</el-col>
		</el-row>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary">确定</el-button>
		</span>
	</el-dialog>
</template>
<script>
	import { fileReader, readerTableData, copy } from './lib/main.js'
	export default{
		name: 'Parameter',
		data() {
			return {
				visible: true,
				fileList: [],
				tableData: {}
			}
		},
		components: {
			pcTable:{
				props: {
					tableData: {
						type: Object
					}
				},
				render (createElement){
					const h = createElement;
					return h('tbody', this.tableData.excelData.map((items, key) => {
						return h('tr', {
								attrs:{
									class: 'line'
								}
							}, items.map((item, index) => {
							if(item.name.indexOf('A') > -1){
								return h('th', {
									attrs:{
										colspan: item.unitMerge.cols,
										rowspan: item.unitMerge.rows,
										width: '140'
									}
								}, item.value);
							}else{
								if(index==0&&key==1&&items.length>2){
									return h('td', {
										attrs:{
											class: 'tdline3',
											colspan: item.unitMerge.cols,
											rowspan: item.unitMerge.rows,
											width: '160'
										}
									}, item.value);
								}else{
									if(this.tableData.excelData[0].length >3 && index==0){
										return h('td', {
											attrs:{
												class: 'tdline3',
												colspan: item.unitMerge.cols,
												rowspan: item.unitMerge.rows,
												width: parseInt(660/(this.tableData.excelData[0].length-2)*item.unitMerge.cols)
											}
										}, item.value);
									}else{
										return h('td', {
											attrs:{
												class: 'tdline3',
												colspan: item.unitMerge.cols,
												rowspan: item.unitMerge.rows
											}
										}, item.value);
									}
								}
							}
						}))
					}));
				}
			},
			mobileTable:{
				props: {
					tableData: {
						type: Object
					}
				},
				render (createElement){
					const h = createElement;
					const renderTitle = (bData, aData) => {
						if(bData.length > 0){
							return [
								h('div', {
									attrs: {
										class: 'title left-charts'
									}
								}, aData.map((item, index) => {
									if(item.unitMerge.rows){
										return h('p', {
											attrs: {
												class: 'height-'+ item.unitMerge.rows + 'Mults'
											}
										}, item.value);
									}else{
										return h('p', item.value);
									}
								})),
								h('div', {
									attrs: {
										class: 'sub-title left-charts'
									}
								}, bData.map((item, index) => {
									if(item.unitMerge.rows > 1){
										return h('p', {
											attrs: {
												class: 'height-'+ item.unitMerge.rows + 'lines'
											}
										}, item.value);
									}else{
										return h('p', item.value);
									}
								}))
							]
						}else{
							return [h('div', {
								attrs: 'title only_one left-charts'
							}, aData.map((item, index) => {
								if(item.unitMerge.rows){
									return h('p', {
										attrs: {
											class: 'height-'+ item.unitMerge.rows + 'Mults'
										}
									}, item.value);
								}else{
									return h('p', item.value);
								}
							}))];
						}
					}
					return h('div', {
						attrs: {
							class: 'charts'
						}
					}, renderTitle(this.tableData.bData, this.tableData.aData).concat(
						h('div', {
							attrs: {
								class: 'right-charts'
							}
						}, [h('table', 
								[h('tbody', this.tableData.mobileData.map((items, index) => {
										return h('tr', items.map((item, i) => {
											if(index == 0){
												return h('td', {
													attrs: {
														colspan: item.unitMerge.cols,
														rowspan: item.unitMerge.rows
													}
												}, [h('p', {
													attrs: {
														style: 'min-width:' + (item.value.length * 8) + 'px'
													}
												}, item.value)])
											}else{
												return h('td', {
													attrs: {
														colspan: item.unitMerge.cols,
														rowspan: item.unitMerge.rows
													}
												}, [h('p', item.value)])
											}
										}));
									})
								)]
							)]
						)
					));
				}
			}
		},
		methods:{
			handleBefore(file) {
				if(file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && file.type !== 'application/vnd.ms-excel'){
					this.$message.error('文件类型无效');
					return false;
				}
				fileReader(file).then((data) => {
					this.tableData = readerTableData(2, data, file.name);
					
				}).catch((err) => {
					this.$message.error('文件解析失败');
				});
				return false;
			}
		},
		mounted() {
			copy('.result-content .copy-pc-detailed-parameters','.result-content .pc-content','PC');
			copy('.result-content .copy-mobile-detailed-parameters','.result-content .mobile-content','Mobile');
		}
	}
</script>
<style>
table{
    border-spacing: 0;
}
.p1200 {
    width: 1200px;
    margin: 0 auto;
}
.pro_infobox {
    border: 1px solid #DCDCDC;
    margin-bottom: 60px;
    margin-top: 30px;
    width: 100%;
    font-family: '微软雅黑';
    border-collapse:collapse;
}
.pro_infobox th {
    border-right: 1px solid #DCDCDC;
    color: #4B4B4B;
    font-size: 18px;
    padding: 4px 10px 4px 14px;
    background: none;
    height: 30px;
    font-weight: normal;
    text-align: left;
}
.pro_infobox .tdline3 {
    border-right: 1px solid #DCDCDC;
    font-size: 14px;
    padding: 5px 10px;
}
.pro_infobox .sptd{
    margin: 0px;
    padding: 0px;
    border: none;
}
.pro_infobox tr.line {
    border-top: 1px solid #DCDCDC;
}
.pro_infobox td {
    color: #4B4B4B;
    font-size: 14px;
    padding: 5px 15px;
    border: 1px solid #DCDCDC;
    height: 15px;
}
.pro_infobox .tdline {
    border-bottom: 1px solid #DCDCDC;
    border-right: 1px solid #DCDCDC;
}
.pro_infobox .tdline2 {
    border-bottom: 1px solid #DCDCDC;
    border-right: none;
}

.charts {
    position: relative;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
	width: 960px;
    margin: 0 auto;
}

.charts .left-charts {
    background-color: #f8f8f8;
    border-right: 1px solid #d2d2d2;
}
        .charts .left-charts p {
            height: 36px;
            padding: 2px 5px;
            font-size: 12px;
            color: #4c4c4c;
            border-top: 1px solid #d2d2d2;
            display: -webkit-box;
            -webkit-box-align: center;
        }
        
        .charts .title.only_one p{
            width: 115px;
        }

        .charts .left-charts p:last-child {
            border-bottom: 1px solid #d2d2d2;
        }
        
        .charts .title .height-2Mults{
            height: 72px;
        }

        .charts .title .height-3Mults{
            height: 108px;
        }
        
        .charts .title .height-4Mults{
            height: 144px;
        }

        .charts .title .height-5Mults{
            height: 180px;
        }
        
        .charts .title .height-6Mults{
            height: 216px;
        }

        .charts .title .height-7Mults{
            height: 252px;
        }
        
        .charts .title .height-8Mults{
            height: 288px;
        }
        
        .charts .title .height-9Mults{
            height: 324px;
        }

        .charts .title .height-10Mults{
            height: 360px;
        }

        .charts .title .height-11Mults{
            height: 396px;
        }

        .charts .title .height-12Mults{
            height: 432px;
        }

        .charts .title .height-13Mults{
            height: 468px;
        }

        .charts .title .height-14Mults{
            height: 504px;
        }

        .charts .title .height-15Mults{
            height: 540px;
        }

        .charts .title .height-16Mults{
            height: 576px;
        }

        .charts .title .height-17Mults{
            height: 612px;
        }

        .charts .title .height-18Mults{
            height: 648px;
        }

        .charts .title .height-19Mults{
            height: 684px;
        }

        .charts .title .height-20Mults{
            height: 720px;
        }

        .charts .title .height-21Mults{
            height: 756px;
        }

        .charts .title .height-22Mults{
            height: 792px;
        }
        
        .charts .title .height-23Mults{
            height: 864px;
        }

        .charts .title .height-24Mults{
            height: 864px;
        }

        .charts .title .height-25Mults{
            height: 900px;
        }

        .charts .title p{
            width: 35px;
            height: 36px;
            display: -webkit-box;
            -webkit-box-align: center;
        }

        .charts .sub-title p {
            width: 58px;
        }

        .charts .sub-title .height-2lines{
            height: 77px;
        }

        .charts .sub-title .height-3lines{
            height: 118px;
        }
        
        .charts .sub-title .height-4lines{
            height: 159px;
        }

        .charts .sub-title .height-5lines{
            height: 200px;
        }


    .charts .right-charts {
        width: 100%;
        overflow-x: auto;
        -webkit-box-flex: 1;
    }
        .charts table {
            width: 100%;
			border-top: 1px solid #dcdcdc;
        }

        .charts table td {
            height: 36px;
            padding: 1px 15px;
            color: #3d3d3d;
            vertical-align: middle;
            border-right: 1px solid #d2d2d2;
            border-bottom: 1px solid #d2d2d2;
        }

.charts .firstRow td {
    border-top: 1px solid #d2d2d2;
}
</style>