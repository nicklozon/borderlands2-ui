import * as React from 'react'
import { Manufacturer, Type, ElementalEffect } from 'borderlands2'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'

interface EnumSelectorInputProps {
  selectedValue?: string,
  onChange: (key: string) => void
}

function createEnumSelectorInput(E: any, allowNull?: boolean) {
  return class extends React.Component<EnumSelectorInputProps> {
    constructor(props: any) {
      super(props)
    }

    onChange(value: string) {
      return () => {
        this.props.onChange(value)
      }
    }

    renderButtons() {
      const {selectedValue} = this.props

      let buttons = Object.values(E).map((key: string) => {
        let intent : Intent = selectedValue === key ? Intent.PRIMARY : Intent.NONE

        return <Button
          onClick={this.onChange(key)}
          key={key}
          intent={intent}
        >
          {key}
        </Button>
      })

      if(allowNull) {
        let intent : Intent = selectedValue === undefined ? Intent.PRIMARY : Intent.NONE

        return [
          <Button
            onClick={this.onChange(undefined)}
            key='none'
            intent={intent}
          >
            None
          </Button>,
          ...buttons
        ]
      }

      return buttons
    }

    render() {
      return (
        <ButtonGroup fill>
          {this.renderButtons()}
        </ButtonGroup>
      )
    }
  }
}

export class ManufacturerSelectorInput extends createEnumSelectorInput(Manufacturer) {}
export class WeaponTypeSelectorInput extends createEnumSelectorInput(Type) {}
export class ElementalEffectSelectorInput extends createEnumSelectorInput(ElementalEffect, true) {}