import * as React from 'react'
import { Navbar } from '@blueprintjs/core'
import { BadassRankingButton } from './bar_button'
import { AddWeaponButton } from './add_weapon_button'
import { GearButton } from './gear_button'
import { BuildButton } from './build_button'
import { AboutButton } from './about_button'

export class NavBar extends React.Component {
  render() {
    return (
      <Navbar fixedToTop>
        <Navbar.Group>
          <Navbar.Heading><img src='./src/assets/logo.png' /></Navbar.Heading>
          <Navbar.Heading><strong>Borderlands 2 Damage Calculator</strong></Navbar.Heading>
          <Navbar.Divider />
          <AddWeaponButton />
          <GearButton />
          <BuildButton />
          <BadassRankingButton />
        </Navbar.Group>
        <Navbar.Group align="right">
          <AboutButton />
        </Navbar.Group>
      </Navbar>
    )
  }
}