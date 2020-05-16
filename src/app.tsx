import * as React from 'react'
import { Button } from '@blueprintjs/core'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from './store'
import { closeWeaponModal, openWeaponModal } from './store/app/actions'
import { addWeapon } from './store/weapon/actions'
import WeaponForm from "./components/weapon_form"
import LibVersion from './components/lib_version'
import { Weapon, GameModeEnum, Player, Class, Battlefront, StatType, Type, Context, WeaponTypeGear } from 'borderlands2'
import { ClassMod } from 'borderlands2/dist/domain/gear/object/class_mod'
import { createContext } from './store/context/actions'
import { WeaponList } from './components/weapon_list'

const mapState = (state: RootState) => ({
  weaponModal: state.appReducer.weaponModal,
  weapons: state.weaponReducer.weapons
})

const mapDispatch = {
  addWeapon,
  openWeaponModal,
  closeWeaponModal,
  createContext
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

  addContext = () => {
    let gameMode = GameModeEnum.TrueVaultHunterMode

    let classMod = new ClassMod([
    ],[
      new Battlefront(4)
    ])

    let relic = new WeaponTypeGear([{
      type: StatType.GunDamage,
      value: 0.181
    },{
      type: StatType.FireRate,
      value: 0.49
    }], Type.Pistol)

    let player = new Player(
      Class.Commando,
      [],
      [],
      classMod,
      relic,
      //shield
    )

    let context: Context = {
      player,
      gameMode,
      effects: [],
      health: 1
    }

    console.log(context)

    this.props.createContext(context)
  }

  render() {
    //    <Button onClick={this.addContext}>Add Context</Button>
    return (
      <>
        <WeaponList />
        <WeaponForm isOpen={this.props.weaponModal} onSave={this.handleSaveWeapon} onCancel={this.handleCancelWeapon} />
        <LibVersion />
      </>
    )
  }
}

// Experimenting with react-redux
export let App = connector(AppComponent)