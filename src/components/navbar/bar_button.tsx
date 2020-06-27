import * as React from 'react'
import { Button } from '@blueprintjs/core'
import { RootState } from '../../store'

const mapState = (state: RootState) => ({
  stats: state.badassRankingReducer.stats
})

export class BadAssRankingButton extends React.Component {
  render() {
    return (
      <Button
        className="bp3-minimal"
        icon="badge"
        text="Badass Ranking"
      />
    )
  }
}