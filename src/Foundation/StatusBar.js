import React, { Component } from "react"
import { MdSwapVert as ExpandIcon } from "react-icons/md"
import { inject, observer } from "mobx-react"
import Colors from "../Theme/Colors"
import AppStyles from "../Theme/AppStyles"
import { getPlatformName, getPlatformDetails } from "../Lib/platformHelpers"
import DeviceSelector from "./DeviceSelector"

const Styles = {
  container: {
    backgroundColor: Colors.backgroundSubtleLight,
    borderTop: `1px solid ${Colors.chromeLine}`,
    color: Colors.foregroundDark,
    boxShadow: `0px 0px 30px ${Colors.glow}`,
  },
  content: {
    backgroundColor: Colors.subtleLine,
    height: 85,
    paddingLeft: 10,
    paddingRight: 10,
    ...AppStyles.Layout.hbox,
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentOpen: {
    cursor: "auto",
    height: 85,
  },
  connectionInfo: {
    color: Colors.foregroundLight,
    textAlign: "center",
  },
  connections: {
    display: "flex",
    overflowX: "auto",
    overflowY: "hidden",
    flexWrap: "nowrap",
    height: "100%",
  },
  expandIcon: {
    cursor: "pointer",
  },
}

@inject("session")
@observer
class StatusBar extends Component {
  handleOpenStatusBar = () => {
    this.props.session.ui.openStatusBar()
  }

  handleCloseStatusBar = () => {
    this.props.session.ui.closeStatusBar()
  }

  handleDeviceSelected = device => {
    this.props.session.setSelectedConnection(device)
  }

  areAnyDifferent() {
    const { connections } = this.props.session

    // Dump out early if we can
    if (!connections || connections.length === 0) return false

    const firstName = connections[0].name

    return connections.some(c => c.name !== firstName)
  }

  renderCollapsed() {
    const { session } = this.props

    let selectedDevice = `Waiting for connection on port ${session.port}`

    if (session.selectedConnection) {
      selectedDevice = `${getPlatformName(session.selectedConnection)} ${getPlatformDetails(
        session.selectedConnection
      )}`
    }

    let selectedSessionId = ""

    if (session.selectedConnection) {
      selectedSessionId = session.selectedConnection.clientId
    }

    return (
      <div style={{ ...Styles.content, justifyContent: 'center' }} onClick={this.handleOpenStatusBar}>
        {selectedDevice === `Waiting for connection on port ${session.port}` && <div style={Styles.connectionInfo}>device: {selectedDevice}</div>}
        {session.connections.map(item => (
          <DeviceSelector
            key={item.id}
            selectedDeviceClientId={selectedSessionId}
            device={item}
            showName={this.areAnyDifferent()}
            onSelect={this.handleDeviceSelected}
          />
        ))}
      </div>
    )
  }

  render() {
    const {
      session: { ui },
    } = this.props

    return (
      <div style={Styles.container}>
        {this.renderCollapsed()}
      </div>
    )
  }
}

export default StatusBar
