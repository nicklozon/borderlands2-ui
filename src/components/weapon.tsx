import * as React from 'react'
import { Weapon, Manufacturer, Type } from 'borderlands2'
import { Button } from '@material-ui/core'

interface WeaponFormPropsInterface {

}

interface WeaponFormState {
  weapon: Weapon
}

export default class WeaponForm extends React.Component<WeaponFormPropsInterface> {
  constructor(props: WeaponFormPropsInterface) {
    super(props)

    this.state = {
      weapon: {
        manufacturer: Manufacturer.Bandit,
        damage: 123,
        fireRate: 10,
        magazineSize: 12,
        name: 'My gun',
        reloadSpeed: 1.8,
        type: Type.Pistol
      }
    }
  }

  render() {
    return (<Button variant="contained" color="primary">Save Weapon</Button>)
  }
}
