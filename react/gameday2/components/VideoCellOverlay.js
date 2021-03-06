import React, { PropTypes } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import WebcastSelectionPanel from './WebcastSelectionPanel'
import SwapPanel from './SwapPanel'
var classNames = require('classnames');

var VideoCellOverlay = React.createClass({
  propTypes: {
    mouseOverContainer: PropTypes.bool.isRequired,
    webcast: PropTypes.object.isRequired,
    location: PropTypes.number.isRequired
  },
  getInitialState: function() {
    return {
      showWebcastSelectionPanel: false
    };
  },
  onCloseClicked: function() {
    this.props.removeWebcast(this.props.webcast.id);
  },
  showWebcastSelectionPanel: function() {
    this.setState({showWebcastSelectionPanel: true})
  },
  hideWebcastSelectionPanel: function() {
    this.setState({showWebcastSelectionPanel: false})
  },
  showSwapPanel: function() {
    this.setState({showSwapPanel: true})
  },
  hideSwapPanel: function() {
    this.setState({showSwapPanel: false})
  },
  webcastSelected: function(webcastId) {
    this.props.addWebcastAtLocation(webcastId, this.props.location)
    this.hideWebcastSelectionPanel()
  },
  handleSwap: function(destinationLocation) {
    this.props.swapWebcasts(this.props.location, destinationLocation)
    this.hideSwapPanel()
  },
  shouldShow: function() {
    return (this.props.mouseOverContainer || this.isOverlayExpanded())
  },
  isOverlayExpanded: function() {
    return this.state.showWebcastSelectionPanel || this.state.showSwapPanel
  },
  render: function() {
    var classes = classNames({
      'hidden': !this.shouldShow(),
      'panel': true,
      'panel-default': true,
      'video-cell-overlay': true,
      'expanded': this.isOverlayExpanded()
    });
    if (this.props.webcast) {
      const closeTooltip = (<Tooltip>Close webcast</Tooltip>)
      const changeWebcastTooltip = (<Tooltip>Change webcast</Tooltip>)
      const swapWebcastTooltip = (<Tooltip>Swap webcast position</Tooltip>)
      return (
        <div className={classes}>
          <div className="panel-heading">
            <h3 className="panel-title">{this.props.webcast.name}</h3>
            <div className="overlay-button-container">
              <OverlayTrigger placement="bottom" overlay={swapWebcastTooltip}>
                <i className="material-icons overlay-button" onClick={this.showSwapPanel}>compare_arrows</i>
              </OverlayTrigger>
              <OverlayTrigger placement="bottom" overlay={changeWebcastTooltip}>
                <i className="material-icons overlay-button" onClick={this.showWebcastSelectionPanel}>videocam</i>
              </OverlayTrigger>
              <OverlayTrigger placement="bottom" overlay={closeTooltip}>
                <i className="material-icons overlay-button button-close" onClick={this.onCloseClicked}>close</i>
              </OverlayTrigger>
            </div>
          </div>
          <WebcastSelectionPanel
            webcasts={this.props.webcasts}
            webcastsById={this.props.webcastsById}
            displayedWebcasts={this.props.displayedWebcasts}
            enabled={this.state.showWebcastSelectionPanel}
            webcastSelected={this.webcastSelected}
            closeWebcastSelectionPanel={this.hideWebcastSelectionPanel} />
          <SwapPanel
            location={this.props.location}
            layoutId={this.props.layoutId}
            enabled={this.state.showSwapPanel}
            close={this.hideSwapPanel}
            swapToLocation={this.handleSwap} />
        </div>
      )
    }
  }
});

export default VideoCellOverlay;
