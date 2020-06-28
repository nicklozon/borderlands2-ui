import { v4 as uuidv4 } from 'uuid'
import * as React from 'react'
const classNames = require('classnames')
import { Gear, Manufacturer, StatType, Decorator, GearType, RedTextEnum } from 'borderlands2'
import { Button, FormGroup, InputGroup, Classes, HTMLSelect, Switch, ControlGroup, Dialog } from '@blueprintjs/core'
import { GearTypeSelectorInput } from '../enum_selector_inputs'

interface GearFormProps {
  isOpen?: boolean,
  onSave: (gear: Gear) => void,
  onCancel: () => void
}

interface GearFormState {
  id?: string,
  name?: string,
  type: GearType,
  //manufacturer?: Manufacturer,
  stats: [],
  redText: RedTextEnum,
  decorator?: Decorator
}

export class GearForm extends React.Component<GearFormProps, GearFormState> {
  constructor(props: GearFormProps) {
    super(props)

    this.state = this.initialState()
  }
  
  initialState(): GearFormState {
    return {
      id: undefined,
      name: undefined,
      type: undefined,
      //manufacturer: undefined,
      stats: [],
      redText: undefined,
      decorator: undefined
    }
  }

  onChange(field: keyof GearFormState) {
    return (value: any) => {
      this.setState({
        [field]: value
      } as Pick<GearFormState, keyof GearFormState>)
    }
  }

  onChangeEvent(field: keyof GearFormState) {
    return (event: any) => {
      this.setState({
        [field]: event.target.value
      } as Pick<GearFormState, keyof GearFormState>)
    }
  }

  handleSave = () => {
    const state = this.state

    if(this.isValidGear()) {
      let gearItem = new Gear(state.type, state.stats, state.decorator, state.redText)
      gearItem.id = uuidv4()
      gearItem.name = state.name

      this.props.onSave(gearItem)
      this.setState(this.initialState())
    }
  }

  handleCancel = () => {
    this.props.onCancel()
  }

  isValidGear = () => {
    const gearItem = this.state

    return gearItem.name &&
      gearItem.stats
  }

  render() {
    const state = this.state
    const { isOpen } = this.props

    // this needs to be css/sass
    const containerStyle = {
      display: 'flex'
    }

    return (
      <Dialog isOpen={isOpen} onClose={this.handleCancel} icon="box" title="Add New Gear" style={{width: 800}} canOutsideClickClose canEscapeKeyClose>
        <div className={Classes.DIALOG_BODY}>
          <FormGroup
            label="Name"
            labelFor="name"
            helperText="Does not impact any calculation"
          >
            <InputGroup id="name" placeholder="Name of the weapon" value={state.name || ''} onChange={this.onChangeEvent('name')} />
          </FormGroup>
          <div style={containerStyle}>
            <FormGroup
              label="Gear Type"
              labelFor="type"
            >
              <GearTypeSelectorInput selectedValue={state.type || ''} onChange={this.onChange('type')} />
            </FormGroup>
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            {this.isValidGear() && <Button onClick={this.handleSave} intent="primary">Save {state.type || ''}</Button>}
            <Button onClick={this.handleCancel} intent="danger">Cancel</Button>
          </div>
        </div>
      </Dialog>
    )
  }
}