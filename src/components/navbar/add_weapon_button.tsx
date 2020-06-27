import * as React from 'react'
import { openWeaponModal } from '../../store/app/actions'
import { Button } from '@blueprintjs/core'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store'

const mapState = (state: RootState) => ({
})

const mapDispatch = {
  openWeaponModal
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

class AddWeaponButtonComponent extends React.Component<PropsFromRedux> {
  constructor(props: PropsFromRedux) {
    super(props)
  }

  render() {
    return (
      <Button
        className="bp3-minimal"
        icon="box"
        text="Add Weapon"
        onClick={this.props.openWeaponModal}
      />
    )
  }
}

export let AddWeaponButton = connector(AddWeaponButtonComponent)