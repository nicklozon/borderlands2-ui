import * as React from 'react'
import { ButtonGroup, Button, PropTypes } from '@material-ui/core'
import { Manufacturer, Type } from 'borderlands2'

interface EnumSelectorInputProps {
  selectedValue?: string,
  onChange: (key: string) => void
}

function test(E: any) {
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

    return Object.values(E).map((key: string) => {
      let color : PropTypes.Color = selectedValue === key ? 'primary' : 'default'

      return <Button
        variant='contained'
        onClick={this.onChange(key)}
        key={key}
        color={color}
      >
        {key}
      </Button>
    })
  }

  render() {
    return (
      <ButtonGroup>
        {this.renderButtons()}
      </ButtonGroup>
    )
  }
}
}

export class ManufacturerSelectorInput extends test(Manufacturer) {}
export class WeaponTypeSelectorInput extends test(Type) {}