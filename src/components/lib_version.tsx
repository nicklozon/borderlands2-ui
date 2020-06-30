import * as React from 'react'
const lib = require('borderlands2/package.json')

export default class LibVersion extends React.Component {
  constructor(props: any) {
    super(props)
  }

  render() {
    return <div>borderlands2-lib version: {lib['version']}</div>
  }
}