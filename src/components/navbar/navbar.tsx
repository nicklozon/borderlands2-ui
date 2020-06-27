import * as React from 'react'
import { Navbar } from '@blueprintjs/core'
import { BadAssRankingButton } from './bar_button'
import { AddWeaponButton } from './add_weapon_button'

export class NavBar extends React.Component {
  render() {
    return (
      <Navbar fixedToTop>
        <Navbar.Group>
          <Navbar.Heading>Borderlands 2 Damage Calculator</Navbar.Heading>
          <Navbar.Divider />
          <AddWeaponButton />
          <BadAssRankingButton />
        </Navbar.Group>
      </Navbar>
    )
  }
}