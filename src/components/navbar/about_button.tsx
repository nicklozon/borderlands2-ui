
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