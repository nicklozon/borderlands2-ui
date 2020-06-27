import * as React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Card, Button, H5, Colors } from '@blueprintjs/core'
import { RootState } from '../store'
import { closeWeaponModal } from '../store/app/actions'
import { addWeapon, removeWeapon, updateWeapon } from '../store/weapon/actions'
import { deselectWeapon, toggleWeapon } from '../store/context/actions'
import { Weapon } from 'borderlands2'
import { WeaponForm } from './weapon_form'

const mapState = (state: RootState) => ({
  weaponModal: state.appReducer.weaponModal,
  weapons: state.weaponReducer.weapons,
  selectedWeaponIds: state.contextReducer.selectedWeaponIds
})

const mapDispatch = {
  addWeapon,
  closeWeaponModal,
  updateWeapon,
  removeWeapon,
  deselectWeapon,
  toggleWeapon,
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

class WeaponListComponent extends React.Component<PropsFromRedux> {
  constructor(props: PropsFromRedux) {
    super(props)
  }

  handleSaveWeapon = (weapon: Weapon) => {
    this.props.addWeapon(weapon)
    this.props.closeWeaponModal()
  }

  handleCancelWeapon = () => {
    this.props.closeWeaponModal()
  }

  selectWeapon(weaponId: string) {
    return () => this.props.toggleWeapon(weaponId)
  }

  removeWeapon(weaponId: string) {
    return (event: React.MouseEvent<any>) => {
      event.stopPropagation()

      // Event based system would be better...
      this.props.deselectWeapon(weaponId)
      this.props.removeWeapon(weaponId)
    }
  }

  renderWeapons() {
    const { weapons, selectedWeaponIds } = this.props

    return weapons.map(weapon => {
      if(selectedWeaponIds.includes(weapon.id)) {
        var style = { background: Colors.GREEN5 }
      }

      return <Card key={weapon.id} interactive onClick={this.selectWeapon(weapon.id)} style={{margin: '0.25rem', position: 'relative', minWidth: '7rem', ...style}}>
        <H5>{weapon.name}</H5>
        <p>
          Manufacturer: {weapon.manufacturer}<br />
          Type: {weapon.type}
        </p>
        <div style={{position: 'absolute', bottom: 0, right: 0}}>
          <Button onClick={() => alert('this doesn\'t do anything yet')} icon='duplicate' minimal style={{marginRight: '0.2rem', marginBottom: '0.2rem'}} />
          <Button onClick={() => alert('this doesn\'t do anything yet')} icon='edit' minimal style={{marginRight: '0.2rem', marginBottom: '0.2rem'}} />
          <Button onClick={this.removeWeapon(weapon.id)} icon='trash' intent='danger' minimal style={{marginRight: '0.2rem', marginBottom: '0.2rem'}} />
        </div>
      </Card>
    })
  }

  render() {
    return <div style={{display: 'flex', marginBottom: '1rem'}}>
      <div style={{overflowX: 'auto', whiteSpace: 'nowrap', display: 'flex'}}>
        {this.renderWeapons()}
      </div>
      <WeaponForm isOpen={this.props.weaponModal} onSave={this.handleSaveWeapon} onCancel={this.handleCancelWeapon} />
    </div>
  }
}

export let WeaponList = connector(WeaponListComponent)