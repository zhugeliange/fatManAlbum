/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.scss';
import ImageFigure from '../ImageFigure';
// import Feedback from '../Feedback';
// import Footer from '../Footer';
import data from '../../data.json';

class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      onSetTitle: PropTypes.func,
      onSetMeta: PropTypes.func,
      onPageNotFound: PropTypes.func,
    }),
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    onSetTitle: PropTypes.func.isRequired,
    onSetMeta: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      imageState: {
        0: {
          position: {
            left: 0,
            top: 0,
          },
          rotate: 0,
        },
      },
    };
  }

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      onSetTitle: context.onSetTitle || emptyFunction,
      onSetMeta: context.onSetMeta || emptyFunction,
      onPageNotFound: context.onPageNotFound || emptyFunction,
    };
  }

  componentWillMount() {
    const { insertCss } = this.props.context;
    this.removeCss = insertCss(s);

    this.constant = {
      centerPosition: {
        left: 0,
        top: 0,
      },
      horizontalPosition: {
        left: [0, 0],
        right: [0, 0],
        y: [0, 0],
      },
      verticalposition: {
        x: [0, 0],
        y: [0, 0],
      },
    };
  }

  componentDidMount() {
    const stageDom = ReactDOM.findDOMNode(this.refs.stage);
    const stageWidth = stageDom.scrollWidth;
    const stageHeight = stageDom.scrollHeight;
    const halfStageWidth = Math.ceil(stageWidth / 2);
    const halfStageHeight = Math.ceil(stageHeight / 2);

    const imageFigureDom = ReactDOM.findDOMNode(this.refs.imageFigure0);
    const imageWidth = imageFigureDom.scrollWidth;
    const imageHeight = imageFigureDom.scrollHeight;
    const halfImageWidth = Math.ceil(imageWidth / 2);
    const halfImageHeight = Math.ceil(imageHeight / 2);

    this.constant = {
      centerPosition: {
        left: halfStageWidth - halfImageWidth,
        top: halfStageHeight - halfImageHeight,
      },
      horizontalPosition: {
        left: [halfImageWidth, halfStageWidth - halfImageWidth * 3],
        right: [halfStageWidth + halfImageWidth, stageWidth - halfImageWidth],
        y: [-halfImageHeight, stageHeight - halfImageHeight],
      },
      verticalposition: {
        x: [halfStageWidth - imageWidth, halfStageWidth],
        y: [halfImageHeight, halfStageHeight - halfImageHeight * 3],
      },
    };

    const getAreaRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

    const get30DegreeRandom = () => 30 - Math.ceil(Math.random() * 60);

    const reRange = (centerIndex) => {
      const imageState = Object.keys(this.state.imageState).map((value) => value);
      const constant = this.constant;
      const centerPosition = constant.centerPosition;
      const horizontalPosition = constant.horizontalPosition;
      const verticalposition = constant.verticalposition;
      const horizontalPositionLeft = horizontalPosition.left;
      const horizontalPositionRight = horizontalPosition.right;
      const horizontalPositionY = horizontalPosition.y;
      const verticalpositionX = verticalposition.x;
      const verticalpositionY = verticalposition.y;

      let imageTopArea = [];
      const imageTopNumber = Math.floor(Math.random() * 2);
      let imageTopIndex = 0;
      const imageCenterPosition = imageState.splice(centerIndex, 1);
      imageCenterPosition[0] = {
        position: centerPosition,
        rotate: 0,
      };

      imageTopIndex = Math.floor(Math.random() * (imageState.length - imageTopNumber));
      imageTopArea = imageState.splice(imageTopIndex, imageTopNumber);

      imageTopArea.forEach((value, index) => {
        imageTopArea[index] = {
          position: {
            left: getAreaRandom(verticalpositionX[0], verticalpositionX[1]),
            top: getAreaRandom(verticalpositionY[0], verticalpositionY[1]),
          },
          rotate: get30DegreeRandom(),
        };
      });

      for (let i = 0, j = imageState.length, k = j / 2; i < j; i++) {
        const horizontalPositionLeftOrRight = (i < k) ? horizontalPositionLeft : horizontalPositionRight;

        imageState[i] = {
          position: {
            left: getAreaRandom(horizontalPositionLeftOrRight[0], horizontalPositionLeftOrRight[1]),
            top: getAreaRandom(horizontalPositionY[0], horizontalPositionY[1]),
          },
          rotate: get30DegreeRandom(),
        };
      }

      if (imageTopArea && imageTopArea[0]) {
        imageState.splice(imageTopIndex, 0, imageState[0]);
      }

      imageState.splice(centerIndex, 0, imageCenterPosition[0]);

      this.setState({ imageState: imageState });
    };

    reRange(0);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  render() {
    let controllerUnits = [];
    let imageFigures = [];

    data.forEach((value, index) => {
      if (!this.state.imageState[index]) {
        this.state.imageState[index] = {
          position: {
            left: 0,
            top: 0,
          },
          rotate: 0,
        };
      }

      imageFigures.push(<ImageFigure key={index} range={this.state.imageState[index]} fileName={value.fileName} title={value.title} ref={`imageFigure${index}`} />);
    });

    return !this.props.error ? (
      <div className={s.content}>
        <section className={s.stage} ref="stage">
          <section className={s.imageContent}>
            {imageFigures}
          </section>
          <nav className={s.controllerContent}>
            {controllerUnits}
          </nav>
        </section>
      </div>
    ) : this.props.children;
  }

}

export default App;
