import * as React from 'react'
import { Navbar } from '@blueprintjs/core'
import { BadassRankingButton } from './bar_button'
import { AddWeaponButton } from './add_weapon_button'
import { AddGearButton } from './add_gear_button'
import { AddBuildButton } from './add_build_button'
import { AboutButton } from './about_button'
import LibVersion from '../lib_version'

export class NavBar extends React.Component {
  render() {
    return (
      <Navbar fixedToTop>
        <Navbar.Group>
          <Navbar.Heading><img src='./src/assets/logo.png' /></Navbar.Heading>
          <Navbar.Heading><strong>Borderlands 2 Damage Calculator</strong></Navbar.Heading>
          <Navbar.Divider />
          <AddWeaponButton />
          <AddGearButton />
          <AddBuildButton />
          <BadassRankingButton />
        </Navbar.Group>
        <Navbar.Group align="right">
          <AboutButton />
        </Navbar.Group>
      </Navbar>
    )
  }
}