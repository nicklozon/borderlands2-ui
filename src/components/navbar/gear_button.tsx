import * as React from 'react'
import { openGearModal } from '../../store/app/actions'
import { Button } from '@blueprintjs/core'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store'

const mapState = (state: RootState) => ({
})

const mapDispatch = {
  openGearModal
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

class GearButtonComponent extends React.Component<PropsFromRedux> {
  constructor(props: PropsFromRedux) {
    super(props)
  }

  render() {
    return (
      <Button
        className="bp3-minimal"
        icon="shield"
        text="Gear"
        onClick={this.props.openGearModal}
      />
    )
  }
}

export let GearButton = connector(GearButtonComponent)