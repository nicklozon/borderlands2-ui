import * as React from 'react'
const classNames = require('classnames')
import { Weapon, Manufacturer, Type, ElementalEffect } from 'borderlands2'
import { ManufacturerSelectorInput, WeaponTypeSelectorInput, ElementalEffectSelectorInput } from './enum_selector_inputs'
import { Button, FormGroup, InputGroup, Classes, HTMLSelect, Switch, Overlay } from '@blueprintjs/core'
import { RedTextEnum } from 'borderlands2/dist/domain/player/object/red_text'

interface WeaponFormProps {
  isOpen?: boolean,
  handleSave: (weapon: Weapon) => void
}

export default class WeaponForm extends React.Component<WeaponFormProps, Weapon> {
  constructor(props: WeaponFormProps) {
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

  onChangeEvent(field: keyof Weapon) {
    return (event: any) => {
      this.setState({
        [field]: event.target.value
      } as Pick<Weapon, keyof Weapon>)
    }
  }

  // This is disgusting
  onBooleanChangeEvent(field: 'dealsBonusElementalDamage'|'isEtech') {
    return (event: any) => {
      this.setState({
        [field]: event.target.value === 'on'
      } as Pick<Weapon, 'dealsBonusElementalDamage'|'isEtech'>)
    }
  }

  hasDOT(elementalEffect: ElementalEffect) : boolean {
    return [ElementalEffect.Incendiary, ElementalEffect.Corrosive, ElementalEffect.Shock].includes(elementalEffect)
  }

  onSave = () => {
    this.props.handleSave(this.state)
  }

  getStringValue = (value: number|boolean) => {
    return !value && value !== 0 ? '' : value.toString()
  }

  render() {
    const state = this.state
    const { isOpen } = this.props

    const classes = classNames(
        Classes.CARD,
        Classes.ELEVATION_4
    );

    // this needs to be css/sass
    const containerStyle = {
      display: 'flex'
    }

    const elementalMarkup = this.hasDOT(state.elementalEffect) ? <div style={containerStyle}>
      <FormGroup
        label="Elemental DPS"
        labelFor="elementalDps"
      >
        <InputGroup id="elementalDps" value={this.getStringValue(state.elementalDps)} onChange={this.onChangeEvent('elementalDps')} />
      </FormGroup>
      <FormGroup
        label="Elemental Chance"
        labelFor="elementalChance"
      >
        <InputGroup id="keyof WeaponelementalChance" value={this.getStringValue(state.elementalChance)} onChange={this.onChangeEvent('elementalChance')} />
      </FormGroup>
    </div> : null

    // TODO: Needs custom stats
    return (
      <Overlay isOpen={isOpen}>
        <div className={classes}>
          <FormGroup
            label="Name"
            labelFor="name"
            helperText="Does not affect any calculation"
          >
            <InputGroup id="name" placeholder="Name of the weapon" value={state.name} onChange={this.onChangeEvent('name')} />
          </FormGroup>
          <div style={containerStyle}>
            <FormGroup
              label="Damage"
              labelFor="damage"
            >
              <InputGroup id="damage" type="number" value={this.getStringValue(state.damage)} onChange={this.onChangeEvent('damage')} />
            </FormGroup>
            <FormGroup
              label="Fire Rate"
              labelFor="fireRate"
            >
              <InputGroup id="fireRate" type="number" value={this.getStringValue(state.fireRate)} onChange={this.onChangeEvent('fireRate')} />
            </FormGroup>
            <FormGroup
              label="Reload Speed"
              labelFor="reloadSpeed"
            >
              <InputGroup id="reloadSpeed" type="number" value={this.getStringValue(state.reloadSpeed)} onChange={this.onChangeEvent('reloadSpeed')} />
            </FormGroup>
            <FormGroup
              label="Magazine Size"
              labelFor="magazineSize"
            >
              <InputGroup id="magazineSize" type="number" value={this.getStringValue(state.magazineSize)} onChange={this.onChangeEvent('magazineSize')} />
            </FormGroup>
            <FormGroup
              label="Pellets"
              labelFor="pellets"
            >
              <InputGroup id="pellets" placeholder="1" type="number" value={this.getStringValue(state.pellets)} onChange={this.onChangeEvent('pellets')} />
            </FormGroup>
            <FormGroup
              label="Unlisted Pellets"
              labelFor="unlistedPellets"
            >
              <InputGroup id="unlistedPellets" placeholder="0" type="number" value={this.getStringValue(state.unlistedPellets)} onChange={this.onChangeEvent('unlistedPellets')} />
            </FormGroup>
            <FormGroup
              label="Ammo Per Shot"
              labelFor="ammo_per_shot"
            >
              <InputGroup id="ammoPerShot" placeholder="1" type="number" value={this.getStringValue(state.ammoPerShot)} onChange={this.onChangeEvent('ammoPerShot')} />
            </FormGroup>
          </div>
          <FormGroup
            label="Manufacturer"
            labelFor="manufacturer"
          >
            <ManufacturerSelectorInput selectedValue={state.manufacturer} onChange={this.onChange('manufacturer')} />
          </FormGroup>
          <FormGroup
            label="Type"
            labelFor="type"
          >
            <WeaponTypeSelectorInput selectedValue={state.type} onChange={this.onChange('type')} />
          </FormGroup>
          <FormGroup
            label="Elemental Damage Type"
            labelFor="elemental_damage_type"
          >
            <ElementalEffectSelectorInput selectedValue={state.elementalEffect} onChange={this.onChange('elementalEffect')} />
          </FormGroup>
          {elementalMarkup}
          <div style={containerStyle}>
            <FormGroup
              label="Bonuses"
            >
              <Switch label="Deals bonus elemental damage" checked={state.dealsBonusElementalDamage === true} onChange={this.onBooleanChangeEvent('dealsBonusElementalDamage')} large />
              <Switch label="E-Tech" checked={state.isEtech === true} onChange={this.onBooleanChangeEvent('isEtech')} large />
            </FormGroup>
            <FormGroup
              label="Red Text"
              labelFor="red_text"
            >
              <HTMLSelect value={state.redText} onChange={this.onChangeEvent('redText')}>
                <option>None</option>
                {Object.values(RedTextEnum).map(text => <option>{text}</option>)}
              </HTMLSelect>
            </FormGroup>
          </div>
          <Button onClick={this.onSave} intent="primary">Save {state.manufacturer} {state.type}</Button>
        </div>
      </Overlay>
    )
  }
}