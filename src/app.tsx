import * as React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from './store'
import LibVersion from './components/lib_version'
import { WeaponList } from './components/weapon_list'
import { DamageTable } from './components/damage_table'
import { NavBar } from './components/navbar/navbar'

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

  render() {
    return (
      <>
        <NavBar />
        <WeaponList />
        <DamageTable />
        <LibVersion />
      </>
    )
  }
}

// Experimenting with react-redux
export let App = connector(AppComponent)