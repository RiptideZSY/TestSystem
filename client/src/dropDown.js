import React from 'react';

class DropDown extends React.Component {
	constructor(props) {
		super(props);
		this.shrink = this.shrink.bind(this);
		this.toggle = this.toggle.bind(this);
		this.select = this.select.bind(this);
		this.mousedownOut = this.mousedownOut.bind(this);
		this.state = {
			open: false,
			value: "" //当前选择的值
		};
	}
	//隐藏list
	shrink() {
		this.setState({
			open: false
		});
		removeEventListener("mousedown", this.mousedownOut);
	}
	//list的展示和隐藏
	toggle() {
		!this.state.open && addEventListener("mousedown", this.mousedownOut);
		this.setState({
			open: !this.state.open
		});
	}
	//处理用户点击选项事件
	select(value) {
		console.log("value!" + value);
		if (this.state.value !== value) {
			this.shrink();
			this.setState({
				value
			}, () => this.props.onChange && this.props.onChange(value));
		}
	}
	//为了处理在list展示的情况下，点击页面其他区域后，隐藏list
	mousedownOut(e) {
		for (var node = e.target; node; node = node.parentNode)
			if (this.refs.dropDownNode == node) return;
		this.shrink();
	}

	render() {
		let list = this.props.list || [];
		//如果list是key-value形式的数据，则自动转换成[{name:'',value:''}]格式
		if (typeof list === 'object' && !Array.isArray(list)) {
			list = Object.keys(list).map(key => ({
				name: list[key],
				value: key
			}));
		}
		//如果list是字符串数组
		list = list.map(o => typeof o === 'string' ? {
			name: o,
			value: o
		} : o);

		let selected = this.state.value;
		let title = list.find(o => o.value == selected);
		title = title && title.name || '';
		return (
			<div ref='dropDownNode' className="dropDown">
				<div className="title" onClick={this.toggle}>
					<span>{title}</span>
					<span className="icon"></span>
				</div>	
				<div className="list" style={{display: this.state.open ? 'block' : 'none'}}>
					<ul>
						{list.map(o=><li 
							key={o.value} 
							
							onClick={()=>this.select(o.value)}>
							{o.name}
						</li>)}
					</ul>
				</div>
			</div>
		);
	}
}
export default DropDown;