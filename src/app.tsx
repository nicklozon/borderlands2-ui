import * as React from 'react'
import { Button } from '@blueprintjs/core'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from './store'
import { closeWeaponModal, openWeaponModal } from './store/app/actions'
import { addWeapon } from './store/weapon/actions'
import WeaponForm from "./components/weapon_form"
import LibVersion from './components/lib_version'
import { Weapon } from 'borderlands2'

const mapState = (state: RootState) => ({
  weaponModal: state.appReducer.weaponModal,
  weapons: state.weaponReducer.weapons
})

const mapDispatch = {
  addWeapon,
  openWeaponModal,
  closeWeaponModal
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

class AppComponent extends React.Component<PropsFromRedux> {
  constructor(props: any) {
    super(props)
  }

  handleSaveWeapon = (weapon: Weapon) => {
    this.props.addWeapon(weapon)
    this.props.closeWeaponModal()
  }

  handleCancelWeapon = () => {
    this.props.closeWeaponModal()
  }

  renderWeapons = () => {
    const { weapons } = this.props

    return weapons.map(weapon => (<div>{weapon.name}</div>))
  }

  render() {
    return (
      <>
        <Button onClick={this.props.openWeaponModal}>Add Weapon</Button>
        <WeaponForm isOpen={this.props.weaponModal} onSave={this.handleSaveWeapon} onCancel={this.handleCancelWeapon} />
        {this.renderWeapons()}
        <LibVersion />
      </>
    )
  }
}

// Experimenting with react-redux
export let App = connector(AppComponent)