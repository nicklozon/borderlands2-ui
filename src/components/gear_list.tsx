import * as React from 'react'
import { closeGearModal } from '../store/app/actions'
import { addGear, updateGear, removeGear } from '../store/gear/actions'
import { RootState } from '../store'
import { connect, ConnectedProps } from 'react-redux'
import { Gear } from 'borderlands2'
import { GearForm } from './navbar/gear_form'

const mapState = (state: RootState) => ({
  gearModal: state.appReducer.gearModal,
  gear: state.gearReducer.gear
})

const mapDispatch = {
  addGear,
  closeGearModal,
  updateGear,
  removeGear,
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

class GearListComponent extends React.Component<PropsFromRedux> {
  constructor(props: PropsFromRedux) {
    super(props)
  }

  handleSaveGear = (gear: Gear) => {
    this.props.addGear(gear)
    this.props.closeGearModal()
  }

  handleCancelGear = () => {
    this.props.closeGearModal()
  }

  selectGear(gearItemId: string) {
    //return () => this.props.toggleGear(gearItemId)
  }

  render() {
    return (
      <>
        <div>GearList</div>,
        <GearForm isOpen={this.props.gearModal} onSave={this.handleSaveGear} onCancel={this.handleCancelGear} />
      </>
    )
  }
}

export let GearList = connector(GearListComponent)