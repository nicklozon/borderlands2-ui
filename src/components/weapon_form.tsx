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
  level?: number;
  damage?: number;
  fireRate?: number;
  reloadSpeed?: number;
  magazineSize?: number;
  elementalEffect?: ElementalEffect;
  accuracy?: number;
  pellets?: number;
  unlistedPellets?: number;
  ammoPerShot?: number;
  dealsBonusElementalDamage?: boolean;
  stats?: Stat[];
  elementalChance?: number;
  elementalDps?: number;
  isEtech?: boolean;
  redText?: RedTextEnum;
}

export class WeaponForm extends React.Component<WeaponFormProps, WeaponFormState> {
  constructor(props: WeaponFormProps) {
    super(props)

    this.state = {
      id: undefined,
      name: undefined,
      manufacturer: undefined,
      type: undefined,
      level: undefined,
      damage: undefined,
      fireRate: undefined,
      reloadSpeed: undefined,
      magazineSize: undefined,
      elementalEffect: undefined,
      accuracy: undefined,
      pellets: undefined,
      unlistedPellets: undefined,
      ammoPerShot: undefined,
      dealsBonusElementalDamage: undefined,
      stats: undefined,
      elementalChance: undefined,
      elementalDps: undefined,
      isEtech: undefined,
      redText: undefined,
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

  onChangeFloatEvent(field: keyof Weapon) {
    return (event: any) => {
      this.setState({
        [field]: parseFloat(event.target.value)
      })
    }
  }

  // This is the only stat that a weapon can have that nees to be added
  // The Stat[] should be removed from the weapon in the library
  onCritHitDamageChange = (event: any) => {
    this.setState({
      stats: [{
        type: StatType.CritHitDamage,
        value: parseFloat(event.target.value)
      }]
    })
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
    if(this.isValidWeapon()) {
      //@ts-ignore
      this.props.onSave({ ...this.state, id: uuidv4() })
    }
  }

  handleCancel = () => {
    this.props.onCancel()
  }

  isValidWeapon = () => {
    const weapon = this.state

    return typeof weapon.name === 'string' &&
      typeof weapon.manufacturer === 'string' &&
      typeof weapon.damage === 'number' &&
      typeof weapon.fireRate === 'number' &&
      typeof weapon.reloadSpeed === 'number' &&
      typeof weapon.magazineSize === 'number'
  }

  getStringValue = (value: number|boolean) => {
    return !value && value !== 0 ? '' : value.toString()
  }

  getCritHitDamageValue = (): string => {
    const { stats } = this.state
    if(!stats || stats.length === 0) return ''

    return stats[0].value.toString()
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
        <InputGroup id="elementalDps" value={this.getStringValue(state.elementalDps)} onChange={this.onChangeFloatEvent('elementalDps')} />
      </FormGroup>
      <FormGroup
        label="Elemental Chance"
        labelFor="elementalChance"
      >
        <InputGroup id="keyof WeaponelementalChance" value={this.getStringValue(state.elementalChance)} onChange={this.onChangeFloatEvent('elementalChance')} />
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
                <InputGroup id="damage" value={this.getStringValue(state.damage)} onChange={this.onChangeFloatEvent('damage')} />
                <InputGroup id="pellets" placeholder="1" value={this.getStringValue(state.pellets)} onChange={this.onChangeFloatEvent('pellets')} />
              </ControlGroup>
            </FormGroup>
            <FormGroup
              label="Fire Rate"
              labelFor="fireRate"
            >
              <InputGroup id="fireRate" value={this.getStringValue(state.fireRate)} onChange={this.onChangeFloatEvent('fireRate')} />
            </FormGroup>
            <FormGroup
              label="Reload Speed"
              labelFor="reloadSpeed"
            >
              <InputGroup id="reloadSpeed" value={this.getStringValue(state.reloadSpeed)} onChange={this.onChangeFloatEvent('reloadSpeed')} />
            </FormGroup>
            <FormGroup
              label="Magazine Size"
              labelFor="magazineSize"
            >
              <InputGroup id="magazineSize" value={this.getStringValue(state.magazineSize)} onChange={this.onChangeFloatEvent('magazineSize')} />
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
            <ElementalEffectSelectorInput selectedValue={state.elementalEffect || ''} onChange={this.onChange('elementalEffect')} />
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
              <InputGroup id="ammoPerShot" placeholder="1" value={this.getStringValue(state.ammoPerShot)} onChange={this.onChangeFloatEvent('ammoPerShot')} />
            </FormGroup>
            <FormGroup
              label="Critical Hit Damage"
              labelFor="criticalHitDamage"
            >
              <InputGroup id="criticalHitDamage" value={this.getCritHitDamageValue()} onChange={this.onCritHitDamageChange} />
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