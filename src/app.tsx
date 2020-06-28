import * as React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from './store'
import LibVersion from './components/lib_version'
import { WeaponList } from './components/weapon_list'
import { DamageTable } from './components/damage_table'
import { NavBar } from './components/navbar/navbar'
import { GearList } from './components/gear_list'
import { DamageService, TargetType } from 'borderlands2'

let tables = [{
  stats: [{
      name: 'Single Shot',
      field: 'singleShot',
      value: (ds: DamageService) => Math.round(ds.getDamage()),
    },{
      name: 'DPS',
      field: 'dps',
      value: (ds: DamageService) => Math.round(ds.getDps()),
    },{
      name: 'Crit Shot',
      field: 'critShot',
      value: (ds: DamageService) => Math.round(ds.getCritDamage()),
    },{
      name: 'Crit DPS',
      field: 'critDps',
      value: (ds: DamageService) => Math.round(ds.getCritDps()),
    }]
},{
  stats: [{
      name: 'Flesh Shot',
      field: 'fleshShot',
      value: (ds: DamageService) => Math.round(ds.getDamage(TargetType.Flesh)),
    },{
      name: 'Flesh DPS',
      field: 'fleshDps',
      value: (ds: DamageService) => Math.round(ds.getTargetTypeDps(TargetType.Flesh)),
    },{
      name: 'Flesh Crit Shot',
      field: 'fleshCritShot',
      value: (ds: DamageService) => Math.round(ds.getCritDamage(TargetType.Flesh)),
    },{
      name: 'Flesh Crit DPS',
      field: 'fleshCritDps',
      value: (ds: DamageService) => Math.round(ds.getTargetTypeCritDps(TargetType.Flesh)),
    }]
},{
  stats: [{
    name: 'Armor Shot',
    field: 'armorShot',
    value: (ds: DamageService) => Math.round(ds.getDamage(TargetType.Armor)),
  },{
    name: 'Armor DPS',
    field: 'armorDps',
    value: (ds: DamageService) => Math.round(ds.getTargetTypeDps(TargetType.Armor)),
  },{
    name: 'Armor Crit Shot',
    field: 'armorCritShot',
    value: (ds: DamageService) => Math.round(ds.getCritDamage(TargetType.Armor)),
  },{
    name: 'Armor Crit DPS',
    field: 'armorCritDps',
    value: (ds: DamageService) => Math.round(ds.getTargetTypeCritDps(TargetType.Armor)),
  }]
},{
  stats: [{
    name: 'Shield Shot',
    field: 'shieldShot',
    value: (ds: DamageService) => Math.round(ds.getDamage(TargetType.Shield)),
  },{
    name: 'Shield DPS',
    field: 'shieldDps',
    value: (ds: DamageService) => Math.round(ds.getTargetTypeDps(TargetType.Shield)),
  },{
    name: 'Shield Crit Shot',
    field: 'shieldCritShot',
    value: (ds: DamageService) => Math.round(ds.getCritDamage(TargetType.Shield)),
  },{
    name: 'Shield Crit DPS',
    field: 'shieldCritDps',
    value: (ds: DamageService) => Math.round(ds.getTargetTypeCritDps(TargetType.Shield)),
  }]
}]


const mapState = (state: RootState) => ({
})

const mapDispatch = {
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

class AppComponent extends React.Component<PropsFromRedux> {
  constructor(props: any) {
    super(props)
  }

  renderDamageTables() {
    return tables.map(table => {
      return <DamageTable table={table} />
    })
  }

  render() {
    return (
      <>
        <NavBar />
        <GearList />
        <WeaponList />
        {this.renderDamageTables()}
        <LibVersion />
      </>
    )
  }
}

// Experimenting with react-redux
export let App = connector(AppComponent)