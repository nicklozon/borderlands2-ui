import * as React from 'react'
import { Button, Dialog, FormGroup, Classes, InputGroup } from '@blueprintjs/core'
import { RootState } from '../../store'
import { updateBadassRanking } from '../../store/badass_ranking/actions'
import { connect, ConnectedProps } from 'react-redux'
import { StatType } from 'borderlands2'

const mapState = (state: RootState) => ({
  stats: state.badassRankingReducer.stats
})

const mapDispatch = {
  updateBadassRanking
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

interface State {
  isOpen: boolean,
  stats: {
    [key: string]: string|undefined
  }
}

class Component extends React.Component<PropsFromRedux, State> {
  constructor(props: PropsFromRedux) {
    super(props)

    this.state = {
      isOpen: false,
      stats: {
        [StatType.GrenadeDamage]: this.getPropsStatValue(StatType.GrenadeDamage),
        [StatType.GunDamage]: this.getPropsStatValue(StatType.GunDamage),
        [StatType.FireRate]: this.getPropsStatValue(StatType.FireRate),
        [StatType.ReloadSpeed]: this.getPropsStatValue(StatType.ReloadSpeed),
        [StatType.ElementalEffectChance]: this.getPropsStatValue(StatType.ElementalEffectChance),
        [StatType.ElementalEffectDamage]: this.getPropsStatValue(StatType.ElementalEffectDamage),
        [StatType.CritHitDamage]: this.getPropsStatValue(StatType.CritHitDamage),
      }
    }
  }

  getPropsStatValue(statType: StatType) {
    let stat = this.props.stats.find((stat) => stat.type === statType)

    if(stat && stat.value) {
      return stat.value.toString()
    }
  }

  handleSave = () => {
    const { stats } = this.state

    this.props.updateBadassRanking([{
        type: StatType.GrenadeDamage,
        value: parseFloat(stats[StatType.GrenadeDamage])
      },{
        type: StatType.GunDamage,
        value: parseFloat(stats[StatType.GunDamage])
      },{
        type: StatType.FireRate,
        value: parseFloat(stats[StatType.FireRate])
      },{
        type: StatType.ReloadSpeed,
        value: parseFloat(stats[StatType.ReloadSpeed])
      },{
        type: StatType.ElementalEffectChance,
        value: parseFloat(stats[StatType.ElementalEffectChance])
      },{
        type: StatType.ElementalEffectDamage,
        value: parseFloat(stats[StatType.ElementalEffectDamage])
      },{
        type: StatType.CritHitDamage,
        value: parseFloat(stats[StatType.CritHitDamage])
      }
    ])

    this.setState({ isOpen: false })
  }

  openDialog = () => {
    this.setState({ isOpen: true })
  }

  closeDialog = () => {
    this.setState({ isOpen: false })
  }

  handleChange = (statType: StatType) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { stats } = this.state

      stats[statType] = event.target.value

      this.setState({ stats })
    }
  }

  renderInputField = (statType: StatType) => {
    const value = this.state.stats[statType]

    return (
      <FormGroup
        label={statType}
        //labelFor="name"
      >
        <InputGroup title={statType} value={value || ''} onChange={this.handleChange(statType)} />
      </FormGroup>
    )
  }

  render() {
    const { isOpen } = this.state

    const statTypes = [
      StatType.GrenadeDamage,
      StatType.GunDamage,
      StatType.FireRate,
      StatType.ReloadSpeed,
      StatType.ElementalEffectChance,
      StatType.ElementalEffectDamage,
      StatType.CritHitDamage
    ]

    const statInputsMarkup = statTypes.map((statType) => this.renderInputField(statType))

    return (
      <>
        <Button
          className="bp3-minimal"
          icon="badge"
          text="Badass Ranking"
          onClick={this.openDialog}
        />
        <Dialog isOpen={isOpen} onClose={this.closeDialog} title="Badass Ranking">
          <div className={Classes.DIALOG_BODY}>
            {statInputsMarkup}
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={this.handleSave} intent="primary">Save</Button>
              <Button onClick={this.closeDialog} intent="danger">Cancel</Button>
            </div>
          </div>
        </Dialog>
      </>
    )
  }
}

export let BadassRankingButton = connector(Component)