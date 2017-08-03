import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ControllerUnit.scss';

class ControllerUnit extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.props.state.isCenter) {
      this.props.setOpposite();
    } else {
      this.props.setCenter();
    }

    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    let className = s.controllerUnit;

    if (this.props.state.opposite) {
      className += ` ${s.isOpposite}`;
    }

    if (this.props.state.isCenter) {
      className += ` ${s.isCenter}`;
    }

    return (
        <span className={className} onClick={this.handleClick} />
    );
  }
}

ControllerUnit.propTypes = {
  state: PropTypes.object.isRequired,
  setOpposite: PropTypes.func.isRequired,
  setCenter: PropTypes.func.isRequired,
};

export default withStyles(ControllerUnit, s);
