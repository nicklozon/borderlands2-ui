
import * as React from 'react'
import { Button, Dialog, Classes } from '@blueprintjs/core'
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