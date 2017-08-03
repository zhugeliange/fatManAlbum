import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImageFigure.scss';

class ImageFigure extends Component {
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
    let state = {
      left: this.props.state.position.left,
      top: this.props.state.position.top,
      transform: `rotate(${this.props.state.rotate}deg)`,
    };

    if (this.props.state.opposite) {
      state.transform = 'translate(532px) rotateY(180deg)';
    }

    if (this.props.state.isCenter) {
      state.zIndex = 11;
    }

    return (
      <figure className={s.imageFigure} style={state} onClick={this.handleClick}>
        <img src={this.props.data.fileName} alt={this.props.data.title} />
        <figcaption>
          <h2 className={s.imageTitle}>{this.props.data.title}</h2>
          <div className={s.imageBackground} onClick={this.handleClick}>
            <p>
              {this.props.data.description}
            </p>
          </div>
        </figcaption>
      </figure>
    );
  }
}

ImageFigure.propTypes = {
  state: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  setOpposite: PropTypes.func.isRequired,
  setCenter: PropTypes.func.isRequired,
};

export default withStyles(ImageFigure, s);
