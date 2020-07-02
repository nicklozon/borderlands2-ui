
import * as React from 'react'
import { Button, Dialog, Classes, H5 } from '@blueprintjs/core'
import LibVersion from '../lib_version'

interface State {
  isOpen: boolean,
}

export class AboutButton extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  openDialog = () => {
    this.setState({ isOpen: true })
  }

  closeDialog = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const { isOpen } = this.state

    return (
      <>
        <Button
          className="bp3-minimal"
          icon="info-sign"
          text="About"
          onClick={this.openDialog}
        />
        <Dialog isOpen={isOpen} onClose={this.closeDialog}>
          <div className={Classes.DIALOG_BODY}>
            <H5>What is this?</H5>
            <p>
              This is a weapon Damage/DPS calculator for Borderlands 2 that attempts to handle all aspects of the games; skill builds, red text on items, splash damage, elemental damage over time, manufacturer and weapon type specific bonuses, skill bonuses, etc. It is a work in progress and will never be perfect.
            </p>
            <p>
              Read about my inspiration and methodology <a href='https://github.com/nicklozon/borderlands-2-lib/blob/master/README.md' target='_blank'>here</a>.
            </p>
            <p>
              Use this tool if you're curious, but play the game the way you enjoy. You don't need this calculator; damage and DPS is only one aspect of the game. Just because I've obsessed over it doesn't mean you need to too.
            </p><br />
            <H5>Questions or Concerns?</H5>
            <p>
              I am <strong>Lulzagna</strong> on Borderlands' Discord server.
            </p><br />
            <H5>Links</H5>
            <ul>
              <li><a href="https://bl2skills.com" target='_blank'>BL2 Skills</a> (Used for Builds)</li>
              <li><a href="https://github.com/nicklozon/borderlands2-ui" target='_blank'>UI code repository</a></li>
              <li><a href="https://github.com/nicklozon/borderlands-2-lib" target='_blank'>Damage Library code repository</a></li>
            </ul><br />
            <LibVersion />
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={this.closeDialog} intent="primary">Close</Button>
            </div>
          </div>
        </Dialog>
      </>
    )
  }
}