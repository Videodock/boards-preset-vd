import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './{{pascalCased}}.styles';

class {{pascalCased}} extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div>
        <span>Hello from component/{{pascalCased}}/{{pascalCased}}.jsx!</span>
      </div>
    );
  }
}

export default withStyles(styles)({{pascalCased}});
