import * as React from 'react'
import { Weapon, Manufacturer, Type } from 'borderlands2'
import { Button } from '@material-ui/core'
import WeaponManufacturerInput from './weapon_manufacturer_input'

interface WeaponFormPropsInterface {

}

export default class WeaponForm extends React.Component<WeaponFormPropsInterface, Weapon> {
  constructor(props: WeaponFormPropsInterface) {
    super(props)

    this.state = {
      manufacturer: Manufacturer.Bandit,
      damage: 123,
      fireRate: 10,
      magazineSize: 12,
      name: 'My gun',
      reloadSpeed: 1.8,
      type: Type.Pistol
    }
  }

  onChange(field: keyof Weapon) {
    return (value: any) => {
      this.setState({
        [field]: value
      } as Pick<Weapon, keyof Weapon>)
    }
  }

  render() {
    const { manufacturer } = this.state

    return (
      <div>
        <div>
          <WeaponManufacturerInput manufacturer={manufacturer} onChange={this.onChange('manufacturer')} />
        </div>
        <div>
          <Button variant="contained" color="primary">Save {manufacturer} Weapon</Button>
        </div>
      </div>
    )
  }
}
