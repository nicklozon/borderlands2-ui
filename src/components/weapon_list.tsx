import * as React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Card, Button, H5, Colors } from '@blueprintjs/core'
import { RootState } from '../store'
import { closeWeaponModal } from '../store/app/actions'
import { addWeapon, removeWeapon, updateWeapon } from '../store/weapon/actions'
import { deselectWeapon, toggleWeapon } from '../store/context/actions'
import { Weapon, ElementalEffect } from 'borderlands2'
import { WeaponForm } from './weapon_form'
import { ManufacturerLogos } from '../assets/manufacturers'
import { WeaponTypeLogos } from '../assets/weapons'

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
    let { weapons, selectedWeaponIds } = this.props

    weapons = weapons.sort((weaponA, weaponB) => {
      if(selectedWeaponIds.includes(weaponA.id) && !selectedWeaponIds.includes(weaponB.id)) {
        return -1
      }

      if(!selectedWeaponIds.includes(weaponA.id) && selectedWeaponIds.includes(weaponB.id)) {
        return 1
      }

      return 0
    })

    return weapons.map(weapon => {
      let style: React.CSSProperties = {}

      if(!selectedWeaponIds.includes(weapon.id)) {
        style.background = Colors.GRAY5
      }

      if(weapon.elementalEffect) {
        style.border = 'solid'

        switch(weapon.elementalEffect) {
          case ElementalEffect.Corrosive:
            style.borderColor = 'green'
            break
          case ElementalEffect.Explosive:
            style.borderColor = 'yellow'
            break
          case ElementalEffect.Incendiary:
            style.borderColor = 'orange'
            break
          case ElementalEffect.Shock:
            style.borderColor = 'blue'
            break
          case ElementalEffect.Slag:
            style.borderColor = 'purple'
            break
        }
      }

      return <Card key={weapon.id} interactive onClick={this.selectWeapon(weapon.id)} style={{padding: '5px', margin: '0.25rem', position: 'relative', ...style}}>
        <H5>{weapon.name}</H5>
        <div>
          <img src={ManufacturerLogos[weapon.manufacturer]} alt="Manufacturer Logo" style={{height: '1.5rem', marginRight: '0.5rem'}} />
          <img src={WeaponTypeLogos[weapon.type]} alt="Weapon Type" style={{height: '1.5rem'}} />
        </div>
        <div style={{position: 'absolute', bottom: 0, right: 0}}>
          <Button onClick={() => alert('this doesn\'t do anything yet')} icon='duplicate' minimal style={{marginRight: '0.2rem', marginBottom: '0.2rem'}} />
          <Button onClick={() => alert('this doesn\'t do anything yet')} icon='edit' minimal style={{marginRight: '0.2rem', marginBottom: '0.2rem'}} />
          <Button onClick={this.removeWeapon(weapon.id)} icon='trash' intent='danger' minimal style={{marginRight: '0.2rem', marginBottom: '0.2rem'}} />
        </div>
      </Card>
    })
  }

  render() {
    // weapon form doesn't really belong here since it is more global
    return <div>
      <div>
        {this.renderWeapons()}
      </div>
      <WeaponForm isOpen={this.props.weaponModal} onSave={this.handleSaveWeapon} onCancel={this.handleCancelWeapon} />
    </div>
  }
}

export let WeaponList = connector(WeaponListComponent)