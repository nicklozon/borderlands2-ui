import * as React from 'react'
//import { openBuildModal } from '../../store/app/actions'
import { Button, Dialog, Classes, InputGroup, ControlGroup } from '@blueprintjs/core'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store'
import { BuildService } from '../../lib/build_service'
import { createBuild } from '../../store/build/actions'

const mapState = (state: RootState) => ({
})

const mapDispatch = {
  createBuild
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

interface State {
  isOpen: boolean,
  url: string,
}

class BuildButtonComponent extends React.Component<PropsFromRedux, State> {
  constructor(props: PropsFromRedux) {
    super(props)

    this.state = {
      isOpen: false,
      url: ''
    }
  }

  openDialog = () => {
    this.setState({ isOpen: true })
  }

  closeDialog = () => {
    this.setState({ isOpen: false })
  }

  handleChange = (fieldName: 'url') => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({[fieldName]: event.target.value})
    }
  }

  parseBuild = () => {
    const { url } = this.state

    let build = BuildService.parseUrl(url)
    if(!build) {
      alert('Invalid Build')
      return
    }

    this.props.createBuild(build)

    if(build) this.setState({url: ''})
  }

  render() {
    const { isOpen, url } = this.state

    return (
      <>
        <Button
          className="bp3-minimal"
          icon="layout-hierarchy"
          text="Builds"
          onClick={this.openDialog}
        />
        <Dialog isOpen={isOpen} onClose={this.closeDialog} title='Manage Builds'>
          <div className={Classes.DIALOG_BODY}>
            <ControlGroup fill>
              <InputGroup leftIcon='link' placeholder='bl2skills.com link' value={url} onChange={this.handleChange('url')} />
              <Button icon='arrow-right' className={Classes.FIXED} onClick={this.parseBuild} />
            </ControlGroup>
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

export let BuildButton = connector(BuildButtonComponent)