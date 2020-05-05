import * as React from 'react'
import { ButtonGroup, Button, PropTypes } from '@material-ui/core'
import { Manufacturer } from 'borderlands2'

interface WeaponManufacturerInputProps {
  manufacturer?: Manufacturer,
  onChange: (key: Manufacturer) => void
}

export default class WeaponManufacturerInput extends React.Component<WeaponManufacturerInputProps> {
  constructor(props: any) {
    super(props)
  }

  onChange(value: Manufacturer) {
    return () => {
      this.props.onChange(value)
    }
  }

  renderButtons() {
    const {manufacturer} = this.props

    return Object.values(Manufacturer).map((key: Manufacturer) => {
      let color : PropTypes.Color = manufacturer === key ? 'primary' : 'default'

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