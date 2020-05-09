import * as React from 'react'
import { Weapon, Manufacturer, Type } from 'borderlands2'
import { Button, Container, FormControl, InputLabel, Input, FormHelperText, FormControlLabel, TextField } from '@material-ui/core'
import { ManufacturerSelectorInput, WeaponTypeSelectorInput } from './enum_selector_inputs'

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
    const { manufacturer, type } = this.state

    return (
      <Container>
        <TextField id="name" label="Weapon Name" helperText="The name of the weapon. Does not affect any calculations." fullWidth/>
        <FormControlLabel
          label="Manufacturer"
          control={<ManufacturerSelectorInput selectedValue={manufacturer} onChange={this.onChange('manufacturer')} />}
        />
        <FormControlLabel
          label="Weapon Type"
          control={<WeaponTypeSelectorInput selectedValue={type} onChange={this.onChange('type')} />}
        />
          <br />
          <Button variant="contained" color="primary">Save {manufacturer} Weapon</Button>
      </Container>
    )
  }
}