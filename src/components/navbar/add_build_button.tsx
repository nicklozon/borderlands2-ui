import * as React from 'react'
//import { openBuildModal } from '../../store/app/actions'
import { Button } from '@blueprintjs/core'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store'

const mapState = (state: RootState) => ({
})

const mapDispatch = {
  //openBuildModal
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

class AddBuildButtonComponent extends React.Component<PropsFromRedux> {
  constructor(props: PropsFromRedux) {
    super(props)
  }

  render() {
    return (
      <Button
        className="bp3-minimal"
        icon="layout-hierarchy"
        text="Add Build"
        //onClick={this.props.openBuildModal}
      />
    )
  }
}

export let AddBuildButton = connector(AddBuildButtonComponent)