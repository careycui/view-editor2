<template>
	<div class="mouse-wrapper cus-box pro-banner">
		<div class="pro-banner__safe" :data-buy-comkey="data.id">
			<div class="pro-banner__price" :class="[data.pos]" :style="formatterPos" v-get-dom="setDom">
				<div class="pro-banner__price-seckill" v-if="data.type == 'seckill'">
					<p class="price">
						<span class="ft24">秒杀价:</span>
						<span class="price-sign">¥</span>
						<span class="price-num">500</span>
						<span class="price-range">(起)</span>
						<span class="price-desc">立省¥100起</span>
					</p>
					<p class="price-tip uline">
						厂商指导价:¥600起
					</p>
				</div>
				<div class="pro-banner__price-presell" v-else-if="data.type == 'book'">
					<p class="price">
						<span class="ft24">预售价:</span>
						<span class="price-sign">¥</span>
						<span class="price-num">500</span>
						<span class="price-range">(起)</span>
						<span class="price-desc">定金¥100抵¥200,尾款¥300起</span>
					</p>
					<p class="price-tip uline">
						厂商指导价:¥600起
					</p>
				</div>
				<div class="pro-banner__price-off"  v-else-if="data.type == 'manjian'">
					<p class="price">
						<span class="price-sign">¥</span><span class="price-num">499</span>
					</p>
					<p class="price-tip" style="font-size: 16px;">
						满999减100,满799减50,满499减20
					</p>
				</div>
				<div class="pro-banner__price-normal" v-else>
					<p class="price">
						<span class="price-sign">¥</span><span class="price-num">500</span>
						<span class="price-range">(起)</span>
					</p>
					
					<p class="price-tip uline" style="font-size: 16px;">
						厂商指导价:¥600起
					</p>
				</div>
			</div>
		</div>
		<a href="javascript:;" class="buy-btn" :style="formatterBtnPos">立即购买</a>
	</div>
</template>
<script>
import BASE from './../../utils/base'

const formatter = BASE.formatter;

	export default {
		name: 'cartBtn',
		directives:{
			getDom:{
				update: function(el, binding){
					binding.value(el);
				}
			}
		},
		props:{
			data:{
				type: Object,
				default () {
					return {
						id: '',
						label: 'YS购买按钮',
						pos: 'pos-left',
						type: 'normal',
						btnMargin: '90',
						enableDrag: false,
						style:{
							top: '300',
							left: '40',
							right: '40'
						}
					}
				}
			}
		},
		data() {
			return {
				priceDom: '',
				priceW: 0
			}
		},
		computed: {
			formatterPos(){
				let pos = {};
				pos.top = this.data.style.top + 'px';
				if(this.data.pos == 'pos-left'){
					pos.left = this.data.style.left + 'px';
				}else if(this.data.pos == 'pos-right'){
					pos.right = this.data.style.right + 'px';
				}
				return pos;
			},
			formatterBtnPos() {
				let pos = {};
				pos.top = ( this.data.style.top + this.data.btnMargin ) + 'px';
				if(this.data.pos == 'pos-left'){
					pos.marginLeft = -( 600 - this.data.style.left ) + 'px';
				}else if(this.data.pos == 'pos-center'){
					pos.marginLeft = '-95px';
				}else if(this.data.pos == 'pos-right'){
					pos.marginLeft = ( 600 - this.data.style.right - this.priceW) + 'px';
				}
				return pos;
			},
			formatterStyle () {
				return;
			}
		},
		methods:{
			_getPriceW() {
				return getComputedStyle(this.priceDom, null).getPropertyValue('width').replace(/px/g, '');
			},
			setDom(el) {
				this.$nextTick(() => {
					this.priceDom = el;
					this.priceW = this._getPriceW();
				});
			}
		}
	}
</script>
<style lang="scss">
.cus-box{
 	position:absolute;
    width:1200px;
    height: 100%;
    left:50%;
    margin-left:-600px;
    top:0;
}
.pro-banner__safe {
    position:absolute;
    width:1200px;
    height: 100%;
    left:50%;
    margin-left:-600px;
    top:0;
    z-index: 1;
}
.pro-banner__price {
    position:absolute;
    top:386px;
    left:40px;
	
	&.pos-left {
	    left:40px;
	    text-align: left;
	}
	&.pos-right {
	    left:auto;
	    right:40px;
	    text-align: left;
	}
	&.pos-center {
	    width:100%;
	    left:50%;
	    margin-left:-600px;
	    text-align:center;
	}
	& .price{
	    line-height:1.5;
	    vertical-align:bottom;
	    font-size:36px;
	    color:#ff6a02;
	    word-spacing: -6px;

	    & .price-sign {
		    font-size:24px;
		    letter-spacing:-2px;
		    vertical-align:middle;
		}
		& .price-range {
		    margin-bottom:0;
		    font-size:16px;
		    vertical-align:middle;
		}
		& .price-desc {
		    display:inline-block;
		    padding:6px 10px;
		    margin-bottom:7px;
		    margin-left:8px;
		    line-height:1;
		    vertical-align:middle;
		    font-size:16px;
		    border:1px solid #ff6a02;
		    border-radius:2px;
		    box-sizing:border-box;
		}
	}
	& span{
		display:inline-block;
	 	word-spacing: 0px;
	}
	& .price-tip{
		font-size:18px;
	    line-height:30px;
	    color:#666;
	}
	& .uline {
	    text-decoration:line-through;
	    font-size: 16px;
	}
}
.ft24 {
    font-size:24px
}
.buy-btn{
    display: inline-block;
	position: absolute;
    top: 0;
    left: 50%;
    width: 190px;
    height: 48px;
    border: 1px solid #f75c20;
    border-radius: 5px;
    line-height: 48px;
    font-size: 18px;
    color: #fff;
    filter: none;
    background-color: #ff6102;
    background-image: linear-gradient(#ff6202,#ff7d02);
    text-align: center;
    text-indent: 0;
    z-index: 1;
    text-decoration: none;
}
</style>