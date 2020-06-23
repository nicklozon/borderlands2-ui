import { v4 as uuidv4 } from 'uuid'
import * as React from 'react'
const classNames = require('classnames')
import { Weapon, Manufacturer, Type, ElementalEffect, StatType, Stat } from 'borderlands2'
import { ManufacturerSelectorInput, WeaponTypeSelectorInput, ElementalEffectSelectorInput } from './enum_selector_inputs'
import { Button, FormGroup, InputGroup, Classes, HTMLSelect, Switch, Overlay, ControlGroup } from '@blueprintjs/core'
import { RedTextEnum } from 'borderlands2'

interface WeaponFormProps {
  isOpen?: boolean,
  onSave: (weapon: Weapon) => void,
  onCancel: () => void
}

interface WeaponFormState {
  id?: string;
  name?: string;
  manufacturer?: Manufacturer;
  type?: Type;
  damage?: string; // number
  fireRate?: string; // number
  reloadSpeed?: string; // number
  magazineSize?: string; // number
  pellets?: string; // number
  unlistedPellets?: string; // number
  ammoPerShot?: string; // number
  dealsBonusElementalDamage?: boolean;
  critHitDamage?: string; // number in stats
  elementalEffect?: ElementalEffect;
  elementalChance?: string; // number
  elementalDps?: string; // number
  isEtech?: boolean;
  redText?: RedTextEnum;
}

export class WeaponForm extends React.Component<WeaponFormProps, WeaponFormState> {
  constructor(props: WeaponFormProps) {
    super(props)

    this.state = this.initialState()
  }
  
  initialState(): WeaponFormState {
    return {
      id: undefined,
      name: undefined,
      manufacturer: undefined,
      type: undefined,
      damage: undefined,
      fireRate: undefined,
      reloadSpeed: undefined,
      magazineSize: undefined,
      elementalEffect: undefined,
      pellets: undefined,
      unlistedPellets: undefined,
      ammoPerShot: undefined,
      dealsBonusElementalDamage: undefined,
      elementalChance: undefined,
      elementalDps: undefined,
      isEtech: undefined,
      redText: undefined,
      critHitDamage: undefined
    }
  }

  onChange(field: keyof WeaponFormState) {
    return (value: any) => {
      this.setState({
        [field]: value
      } as Pick<WeaponFormState, keyof WeaponFormState>)
    }
  }

  onChangeEvent(field: keyof WeaponFormState) {
    return (event: any) => {
      this.setState({
        [field]: event.target.value
      } as Pick<WeaponFormState, keyof WeaponFormState>)
    }
  }

  // This is disgusting
  onBooleanChangeEvent(field: 'dealsBonusElementalDamage'|'isEtech') {
    return (event: any) => {
      this.setState({
        [field]: !this.state[field]
      } as Pick<Weapon, 'dealsBonusElementalDamage'|'isEtech'>)
    }
  }

  hasDOT(elementalEffect: ElementalEffect) : boolean {
    return [ElementalEffect.Incendiary, ElementalEffect.Corrosive, ElementalEffect.Shock].includes(elementalEffect)
  }

  handleSave = () => {
    const state = this.state

    if(this.isValidWeapon()) {
      this.props.onSave({
        id: uuidv4(),
        name: state.name,
        manufacturer: state.manufacturer,
        type: state.type,
        damage: parseInt(state.damage),
        fireRate: parseFloat(state.fireRate),
        reloadSpeed: parseFloat(state.reloadSpeed),
        magazineSize: parseInt(state.magazineSize),
        pellets: state.pellets ? parseInt(state.pellets) : undefined,
        ammoPerShot: state.ammoPerShot ?  parseInt(state.ammoPerShot) : undefined,
        dealsBonusElementalDamage: state.dealsBonusElementalDamage,
        elementalEffect: state.elementalEffect,
        elementalChance: state.elementalChance ? parseFloat(state.elementalChance) : undefined,
        elementalDps: state.elementalDps ? parseFloat(state.elementalDps) : undefined,
        isEtech: state.isEtech,
        redText: state.redText,
        stats: state.critHitDamage ? [{type: StatType.CritHitDamage, value: parseFloat(state.critHitDamage)}] : undefined
      })
      this.setState(this.initialState())
    }
  }

  handleCancel = () => {
    this.props.onCancel()
  }

  isValidWeapon = () => {
    const weapon = this.state

    return weapon.name &&
      weapon.manufacturer &&
      weapon.damage &&
      weapon.fireRate &&
      weapon.reloadSpeed &&
      weapon.magazineSize
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

    const elementalMarkup = state.elementalEffect && this.hasDOT(state.elementalEffect) ? <>
      <FormGroup
        label="Elemental DPS"
        labelFor="elementalDps"
      >
        <InputGroup id="elementalDps" value={state.elementalDps || ''} onChange={this.onChangeEvent('elementalDps')} />
      </FormGroup>
      <FormGroup
        label="Elemental Chance"
        labelFor="elementalChance"
      >
        <InputGroup id="keyof WeaponelementalChance" value={state.elementalChance || ''} onChange={this.onChangeEvent('elementalChance')} />
      </FormGroup>
     </> : null

    return (
      <Overlay isOpen={isOpen}>
        <div className={classes}>
          <FormGroup
            label="Name"
            labelFor="name"
            helperText="Does not affect any calculation"
          >
            <InputGroup id="name" placeholder="Name of the weapon" value={state.name || ''} onChange={this.onChangeEvent('name')} />
          </FormGroup>
          <div style={containerStyle}>
            <FormGroup
              label="Damage X pellets"
              labelFor="damage"
            >
              <ControlGroup>
                <InputGroup id="damage" value={state.damage || ''} onChange={this.onChangeEvent('damage')} />
                <InputGroup id="pellets" placeholder="1" value={state.pellets || ''} onChange={this.onChangeEvent('pellets')} />
              </ControlGroup>
            </FormGroup>
            <FormGroup
              label="Fire Rate"
              labelFor="fireRate"
            >
              <InputGroup id="fireRate" value={state.fireRate || ''} onChange={this.onChangeEvent('fireRate')} />
            </FormGroup>
            <FormGroup
              label="Reload Speed"
              labelFor="reloadSpeed"
            >
              <InputGroup id="reloadSpeed" value={state.reloadSpeed || ''} onChange={this.onChangeEvent('reloadSpeed')} />
            </FormGroup>
            <FormGroup
              label="Magazine Size"
              labelFor="magazineSize"
            >
              <InputGroup id="magazineSize" value={state.magazineSize || ''} onChange={this.onChangeEvent('magazineSize')} />
            </FormGroup>
          </div>
          <FormGroup
            label="Manufacturer"
            labelFor="manufacturer"
          >
            <ManufacturerSelectorInput selectedValue={state.manufacturer || ''} onChange={this.onChange('manufacturer')} />
          </FormGroup>
          <FormGroup
            label="Type"
            labelFor="type"
          >
            <WeaponTypeSelectorInput selectedValue={state.type || ''} onChange={this.onChange('type')} />
          </FormGroup>
          <FormGroup
            label="Elemental Damage Type"
            labelFor="elemental_damage_type"
          >
            <ElementalEffectSelectorInput selectedValue={state.elementalEffect} onChange={this.onChange('elementalEffect')} />
          </FormGroup>
          <div style={containerStyle}>
            <FormGroup
              label="Red Text"
              labelFor="red_text"
            >
              <HTMLSelect value={state.redText || ''} onChange={this.onChangeEvent('redText')}>
                <option>None</option>
                {Object.values(RedTextEnum).map(text => <option key={text}>{text}</option>)}
              </HTMLSelect>
            </FormGroup>
            {elementalMarkup}
            <FormGroup
              label="Ammo Per Shot"
              labelFor="ammo_per_shot"
            >
              <InputGroup id="ammoPerShot" placeholder="1" value={state.ammoPerShot || ''} onChange={this.onChangeEvent('ammoPerShot')} />
            </FormGroup>
            <FormGroup
              label="Critical Hit Damage"
              labelFor="criticalHitDamage"
            >
              <InputGroup id="criticalHitDamage" value={state.critHitDamage || ''} onChange={this.onChangeEvent('critHitDamage')} />
            </FormGroup>
          </div>
          <div style={containerStyle}>
            <FormGroup
              label="Bonuses"
            >
              <Switch label="Deals bonus elemental damage" checked={state.dealsBonusElementalDamage === true} onChange={this.onBooleanChangeEvent('dealsBonusElementalDamage')} large />
              <Switch label="E-Tech" checked={state.isEtech === true} onChange={this.onBooleanChangeEvent('isEtech')} large />
            </FormGroup>
          </div>
          {this.isValidWeapon() && <Button onClick={this.handleSave} intent="primary">Save {state.manufacturer || ''} {state.type || ''}</Button>}
          <Button onClick={this.handleCancel} intent="danger">Cancel</Button>
        </div>
      </Overlay>
    )
  }
}