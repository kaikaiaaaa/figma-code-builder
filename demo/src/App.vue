<template>
	<div id="app">
		<div class='device-item'><div class='img'>
		</div>
			<div class='info'>
				<div class='type'>rain
				</div>
				<div class='value'>1.2mm
				</div>
			</div></div>
	</div>
</template>

<script>
import figma from '../src/assets/figma'

let map = {
	layoutMode: {
		HORIZONTAL: "display:flex;flex-direction:row;",
		VERTICAL: "display:flex;flex-direction:column;",
	},
	counterAxisAlignItems: {
		CENTER: "align-items: center;",
		MIN: "align-items: flex-start;",
		MAX: "align-items: flex-end;"
	},
	primaryAxisAlignItems: {
		SPACE_BETWEEN: "justify-content: space-between;",
		MIN: "justify-content: flex-start;",
		MAX: "justify-content: flex-end;",
		CENTER: "justify-content: Center;"
	},
	paddingLeft: "padding-left:",
	paddingRight: "padding-right:",
	paddingTop: "padding-top:",
	paddingBottom: "padding-bottom:",
	backgroundColor: "backgroundColor:",
	width: "width",
	height: "height",
	fontFamily: "font-family",
	fontWeight: "font-weight",
	fontSize: "font-size",
	letterSpacing: "letter-spacing",
	lineHeightPx: "line-height"
}
export default {
	name: 'App',
	components: {},
	data() {
		return {
			figma,
			str: '',
			map
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			let obj = figma
			let className = ''
			className = obj.nodes['220:71'].document.name
			const data = this.trans(obj.nodes['220:71'].document.children);
			const style = this.styleTrans(obj.nodes['220:71'].document.children);
			let temp = `<div class='${this.toStrigula(className)}'>${data}</div>`
			this.str = temp
			console.log('this.str', this.str);
			console.log('this.style', style);
		},
		/**
		 * children转换
		 * @param data
		 * @returns {string}
		 */
		trans(data) {
			const result = []
			//.img {
			//
			// }
			for (const datum of data) {
				result.push(`<div class='${this.toStrigula(datum.name)}'>${datum.type === 'TEXT' ? datum['characters'] : ''}`);
				for (const datumKey in datum) {
					if (datumKey === 'children') {
						result.push(this.trans(datum[datumKey]))
					}
				}
				result.push('</div>')
			}
			return result.join('\r\n');
		},
		//样式转换
		styleTrans(data) {
			let style = []
			for (const datum of data) {
				console.log('----2',datum.fills.length > 0 ? 'rgba('+
					Math.floor(datum.fills[0]['color']['r']*255) + ','+
					Math.floor(datum.fills[0]['color']['g']*255) + ','+
					Math.floor(datum.fills[0]['color']['b']*255) + ','+
					Math.floor(datum.fills[0]['color']['a']*255) + ')' : '--');
				style.push(`.${this.toStrigula(datum.name)}{
				${
					datum.absoluteBoundingBox ? 'width' + ':' + datum.absoluteBoundingBox.width + 'px;' : null
				}
				${
					datum.absoluteBoundingBox ? 'height' + ':' + datum.absoluteBoundingBox.height + 'px;' : ''
				}
				${
					datum.fills.length > 0 ? 'color' + ':' +
						'rgba('+
						Math.floor(datum.fills[0]['color']['r']*255) + ','+
						Math.floor(datum.fills[0]['color']['g']*255) + ','+
						Math.floor(datum.fills[0]['color']['b']*255) + ','+
						Math.floor(datum.fills[0]['color']['a']*255) + ');' : ''
				}
				`)
				for (const datumKey in datum) {
					if (datumKey === 'children') {
						style.push(this.styleTrans(datum[datumKey]))
					}
				}
				style.push('}')
			}
			return style.join('\r\n');
		},
		/**
		 * 驼峰转短横线
		 * @param name
		 * @returns {string}
		 */
		toStrigula(str) {
			let name = str.replace(/([A-Z])/g, "-$1").toLowerCase();
			console.log('name', name);
			if (name.startsWith('-')) {
				let n = name.replace('-', '')
				return n
			}
			return name
		}
	}
}
</script>

<style lang="less" scoped>
.img{
	width:36px;
	height:35px;
	color:rgba(154,163,245,255);

}
.info{
	width:38px;
	height:36px;


	.type{
		width:23px;
		height:13px;
		color:rgba(181,36,36,255);

	}
	.value{
		width:38px;
		height:13px;
		color:rgba(55,47,47,255);

	}
}
</style>
