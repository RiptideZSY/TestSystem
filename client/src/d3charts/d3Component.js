import React from 'React'
//import d3 from 'd3'

export default class D3Components extends React.Component {

	constructor(props) {
		super(props);
		this.renderGraph = this.renderGraph.bind(this);
	}

	renderGraph = () => {
   		console.log('请实现renderGraph方法')
  	}

  	render() {
   		return (
     		<g ref={(g) => { this.g = g }} width={this.props.width} height={this.props.height} />
    	)
  	}
}