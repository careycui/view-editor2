<template>
  <div class="top-bar">
    <el-row>
      <el-col class="top-bar__title" :span="6">
            <span class="back-home">
              <a href="/module/home.html">
                <i class="fa fa-home fa-2x"></i>
              </a>
            </span>
            <h3>页面编辑器 <small>V 0.1.0</small></h3>
      </el-col>
      <el-col class="top-bar__data" :span="6" :offset="3">
        <div class="base-title" @click="openBaseEditor">
          {{ base.title }}
          <i class="el-icon-edit"></i>
        </div>
      </el-col>
      <el-col class="top-bar__btn" :span="6" :offset="3">
            <el-tooltip :open-delay="500" content="导出购买按钮" v-if="platform_type == 0">
              <el-button class="cus-btn" @click="exportBuyBtn" type="text">
                <i class="fa fa-code"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip :open-delay="500" content="页面设置">
              <el-button class="cus-btn" @click="openGlobal" type="text">
                <i class="fa fa-cogs"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip :open-delay="500" content="导出HTML">
              <el-button class="cus-btn" @click="openCodeDialog" type="text">
                <i class="fa fa-codepen"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip :open-delay="500" content="保存">
              <el-button class="cus-btn" @click="handleSave" type="text">
                <i class="fa fa-floppy-o"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip :open-delay="500" content="预览">
              <el-button class="cus-btn" @click="preview" type="text">
                <i class="fa fa-eye"></i>
              </el-button>
            </el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
	name: 'topBar',
	props: ['innerHtml'],
  data () {
    return {
      baseDialogVisible: false
    }
  },
  computed:{
    base () {
      return this.$store.getters.getBaseData;
    },
    platform_type() {
      return this.$store.getters.getPlatformType;
    }
  },
	methods : {
		barChange (type) {
			this.$emit('barChange', type);
		},
		openCodeDialog () {
			this.$emit('openCode');
		},
		preview () {
			this.$emit('openPreview');
		},
		handleSave () {
      this.$emit('savePage');
		},
    openBaseEditor () {
      this.$emit('openBaseData');
    },
    openGlobal () {
      this.$emit('openGlobal');
    },
    exportBuyBtn () {
      this.$emit('exportBuyBtn');
    }  
	}
}
</script>
<style scoped lang="scss">
.top-bar{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  font-size: 16px;
  background-color: #20A0FF;
  background-image: linear-gradient(45deg, #20A0FF, #a8de69);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  z-index: 100;
}
.top-bar__title, .top-bar__btn{
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  color: #f1f1f1;

  & .back-home{
    display: block;
    float: left;
    width: 60px;
    margin: 10px 0;
    line-height: 20px;
    text-align: center;
    border-right: 1px solid rgba(255,255,255, 0.3);
    cursor: pointer;

    & a{
      color: #fff;
    }
  }

  & h3{
    margin:0 60px 0;
    padding-left: 10px;
    font-weight: normal;
    font-size: 18px;

    & small{
      color: #F1F1F1;
    }
  }
}
.top-bar__data{
  padding: 5px 0;
  height: 40px;
  color: #f1f1f1;
  text-align: center;

  & .base-title{
    position: relative;
    border-radius: 5px;
    line-height: 30px;
    vertical-align: middle;
    background-color: rgba(0,0,0, .3);
  }
}
.top-bar__btn{
  padding-right: 20px;
  text-align: right;
}
.ys-btn--c{
  padding: 0;
  text-align: center;
  width: 40px;
  color: #f1f1f1;

  & i{
    vertical-align: middle;
  }
}
.ys-btn--c:hover{
  background-color: rgba(0,0,0, .3);
}
.dialog-size{
    max-width: 800px;
    background-color: #D3DCE6;
    z-inex: 3000;
  }
  .cus-btn{
    color: #fff;

    &:hover{
      color: #66b1ff;
    }
  }
</style>