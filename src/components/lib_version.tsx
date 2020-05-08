import * as React from 'react'
const lib = require('borderlands2/package.json')

export default class LibVersion extends React.Component {
  constructor(props: any) {
    super(props)
  }

  render() {
    const style = {
      position: 'absolute' as 'absolute',
      bottom: '0px',
      right: '0px'
    }
    return <div style={style}>borderlands2-lib version: {lib['version']}</div>
  }
}