import React from 'react'
import PropTypes from 'prop-types'
import {
  autorun
} from 'mobx'
//import d3 from 'd3'

export default class D3Component extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
  }
  componentDidMount() {
    autorun(() => this.renderGraph(this.g, this.props))
  }
  renderGraph = () => {
    console.log('请实现renderGraph方法');
  }

  render() {
    return (
      <g ref={(g) => { this.g = g }} width={this.props.width} height={this.props.height} />
    )
  }
}