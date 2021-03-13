import React from 'react'
import {common} from '@lanzou/core'

export class PersistGate extends React.Component<any, {isReady: boolean}> {
  constructor(props) {
    super(props)
    this.state = {isReady: false}
  }

  componentDidMount() {
    common.on('init', () => this.setState({isReady: true}))
  }

  render() {
    return this.state.isReady ? <>{this.props.children}</> : null
  }
}
