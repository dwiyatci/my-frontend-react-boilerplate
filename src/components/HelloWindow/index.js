/**
 * Created by glenn on 01/03/16.
 */

import './styles';
import React from 'react';
import $ from 'jquery';

const HelloWindow = React.createClass({

  getDefaultProps() {
    return {
      width     : 600,
      height    : 300,
      position  : {
        top : 100,
        left: '20%',
      },
      title     : 'About Glenn Dwiyatcita',
      visible   : false,
      resizable : false,
      scrollable: false,
      actions   : [
        'Pin',
        'Minimize',
        'Maximize',
        'Close',
      ],
    };
  },

  componentDidMount() {
    $(this.window_)
      .kendoWindow(this.props)
      .data('kendoWindow')
      .open();
  },

  componentWillUnmount() {
    $(this.window_)
      .data('kendoWindow')
      .destroy();
  },

  render() {

    return (
      <div className="window container-fluid" ref={n => this.window_ = n}>
        <div className="row">
          <div className="profpic text-sm-center col-sm-4">
            <img
              src={require('img/glenn-dwiyatcita-foto.256x256.jpg')}
              className="profpic-image img-circle center-block m-b-1"
              alt="Glenn Dwiyatcita"
            />
            Glenn Dwiyatcita
          </div>
          <div className="col-sm-6">
            <p>
              <b>Hello!</b> I'm Glenn, a 26 year-old JavaScript programmer based
              in Bonn, Germany.
            </p>
            <p>
              I have a very big passion in programming and am keen to learn
              cutting-edge and future-proof new technology in the frontend
              ecosystem. I always aim to develop my code towards high quality of
              clean code, perfection attitude, and simplicity, while applying
              software patterns and respecting best practices in object-oriented
              design principles.
            </p>
          </div>
        </div>
      </div>
    );
  },
});

export { HelloWindow as default, HelloWindow };
