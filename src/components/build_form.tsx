import * as React from 'react'
import { RootState } from '../store'
import { connect, ConnectedProps } from 'react-redux'
import { Card, H4, EditableText, ControlGroup, Button, Classes, AnchorButton, InputGroup, FormGroup, Intent, Icon, IconName } from '@blueprintjs/core'
import { createBuild, deleteBuild, updateBuild } from '../store/build/actions'
import { Build, Stat } from 'borderlands2'
import { BuildService } from '../lib/build_service'

interface OwnProps {
  buildId: string
}

const mapState = (state: RootState, ownProps: OwnProps) => {
  const build = state.buildReducer.builds.find(build => build.id === ownProps.buildId)
  return { build: Object.assign({}, build) } // make object immutable
}

const mapDispatch = {
  createBuild,
  deleteBuild,
  updateBuild
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

interface State {
  build: Build,
  url: string,
  hasSaved: boolean
}

class Component extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      build: props.build,
      url: BuildService.buildUrl(props.build),
      hasSaved: false
    }
  }

  handleBuildChange = (field: keyof Build) => {
    return (value: any) => {
      const { build } = this.state
      build[field] = value

      this.setState({ hasSaved: false, build })
    }
  }

  handleChange = (field: keyof State) => {
    return (event: any) => {
      this.setState({
        hasSaved: false,
        [field]: event.target.value
      } as Pick<State, keyof State>)
    }
  }

  duplicateBuild = () => {
    const { build } = this.state

    let newBuild = new Build(
      build.clazz,
      build.skills,
      build.name + ' Copy'
    )

    this.props.createBuild(newBuild)
  }

  updateBuild = () => {
    let { build, url } = this.state

    let parsed = BuildService.parseUrl(url)
    build.clazz = parsed.clazz
    build.skills = parsed.skills

    this.props.updateBuild(build)
    this.setState({ hasSaved: true })
  }

  deleteBuild = () => {
    this.props.deleteBuild(this.state.build.id)
  }

  render() {
    const { build, url, hasSaved } = this.state

    let saveButtonIntent: Intent = hasSaved ? 'success' : 'primary'
    let saveButtonIcon: IconName = hasSaved ? 'saved' : 'floppy-disk'
    let saveButtonText: string = hasSaved ? 'Saved' : 'Save'

    return <Card>
        <H4><EditableText placeholder='Build Name' value={build.name} onChange={this.handleBuildChange('name')} /></H4>
        <FormGroup label="bl2skills.com Build Link">
          <ControlGroup fill>
            <InputGroup placeholder='bl2skills.com link' value={url} onChange={this.handleChange('url')} />
            <AnchorButton href={url} className={Classes.FIXED} icon='share' target='_blank' />
          </ControlGroup>
        </FormGroup>
        <ControlGroup fill>
          <Button icon='duplicate' onClick={this.duplicateBuild}>Duplicate</Button>
          <Button intent={saveButtonIntent} icon={saveButtonIcon} onClick={this.updateBuild}>{saveButtonText}</Button>
          <Button intent='danger' icon='trash' onClick={this.deleteBuild}>Delete</Button>
        </ControlGroup>
      </Card>
  }
}

export let BuildForm = connector(Component)