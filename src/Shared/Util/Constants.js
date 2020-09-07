import React from 'react'
import { DashCircleFill } from 'react-bootstrap-icons'

class Constants {
  constructor () {
    this.serverUrl = 'https://store-line.herokuapp.com'
    this.productPageStyle = {
      height: '800px'
    }
    this.iconStyle = {
      'marginRight': '5px'
    }
    this.deleteStyle = {
      variant: 'warning',
      icon:    <DashCircleFill style={this.iconStyle}/>,
    }
  }
}

export default new Constants()