import * as React from 'react'
const classNames = require('classnames')
import { Weapon, Manufacturer, Type } from 'borderlands2'
import { ManufacturerSelectorInput, WeaponTypeSelectorInput, ElementalEffectSelectorInput } from './enum_selector_inputs'
import { Button, FormGroup, InputGroup, ControlGroup, Overlay, Classes, HTMLSelect, Switch } from '@blueprintjs/core'
import { RedTextEnum } from 'borderlands2/dist/domain/player/object/red_text'

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
    const { manufacturer, type, elementalEffect } = this.state

    const classes = classNames(
        Classes.CARD,
        Classes.ELEVATION_4
    );

    // this needs to be css/sass
    const containerStyle = {
      display: 'flex'
    }

    return (
      <Overlay isOpen>
        <div className={classes}>
          <FormGroup
            label="Name"
            labelFor="name"
            helperText="Does not affect any calculation"
          >
            <InputGroup id="name" placeholder="Name of the weapon" />
          </FormGroup>
          <div style={containerStyle}>
            <FormGroup
              label="Damage"
              labelFor="damage"
            >
              <InputGroup id="damage" placeholder="Damage" />
            </FormGroup>
            <FormGroup
              label="Pellets"
              labelFor="pellets"
            >
              <InputGroup id="pellets" placeholder="1" />
            </FormGroup>
            <FormGroup
              label="Fire Rate"
              labelFor="firerate"
            >
              <InputGroup id="firerate" />
            </FormGroup>
            <FormGroup
              label="Magazine Size"
              labelFor="magazine"
            >
              <InputGroup id="magazine" />
            </FormGroup>
            <FormGroup
              label="Ammo Per Shot"
              labelFor="ammo_per_shot"
            >
              <InputGroup id="ammo_per_shot" placeholder="1" />
            </FormGroup>
          </div>
          <FormGroup
            label="Manufacturer"
            labelFor="manufacturer"
          >
            <ManufacturerSelectorInput selectedValue={manufacturer} onChange={this.onChange('manufacturer')} />
          </FormGroup>
          <FormGroup
            label="Type"
            labelFor="type"
          >
            <WeaponTypeSelectorInput selectedValue={type} onChange={this.onChange('type')} />
          </FormGroup>
          <FormGroup
            label="Red Text"
            labelFor="red_text"
          >
            <Switch label="Deals bonus elemental damage" />
            <Switch label="E-Tech" />
          </FormGroup>
          <FormGroup
            label="Elemental Damage Type"
            labelFor="elemental_damage_type"
          >
            <ElementalEffectSelectorInput selectedValue={elementalEffect} onChange={this.onChange('elementalEffect')} />
          </FormGroup>
          <div style={containerStyle}>
            <FormGroup
              label="Elemental DPS"
              labelFor="elementalDps"
            >
              <InputGroup id="elementalDps" />
            </FormGroup>
            <FormGroup
              label="Elemental Chance"
              labelFor="elementalChance"
            >
              <InputGroup id="elementalChance" />
            </FormGroup>
          </div>
          <FormGroup
            label="Red Text"
            labelFor="red_text"
          >
            <HTMLSelect>
              <option>None</option>
              {Object.values(RedTextEnum).map(text => <option>{text}</option>)}
            </HTMLSelect>
          </FormGroup>
          <Button intent="primary">Save {manufacturer} {type}</Button>
        </div>
      </Overlay>
    )
  }
}