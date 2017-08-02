/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImageFigure.scss';

class ImageFigure extends Component {
  render() {
    let range = {
      left: this.props.range.position.left,
      top: this.props.range.position.top,
      transform: `rotate(${this.props.range.rotate}deg)`,
    };

    return (
      <figure className={s.imageFigure} style={range}>
        <img src={this.props.fileName} alt={this.props.title} />
        <figcaption>
          <h2 className={s.imageTitle}>{this.props.title}</h2>
        </figcaption>
      </figure>
    );
  }
}

ImageFigure.propTypes = {
  range: PropTypes.object.isRequired,
  fileName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

// function ImageFigure(props) {
//   return (
//     <figure>
//       <img src = {props.data.fileName} alt = {props.data.title} />
//       <figcaption>
//         <h2>{props.data.title}</h2>
//       </figcaption>
//     </figure>
//   );
// }

export default withStyles(ImageFigure, s);
