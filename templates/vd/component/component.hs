import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import styles from './{{pascalCased}}.styles';
import { providers } from '../../../utils';

export class {{pascalCased}} extends Component {
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

export default providers(
  {{pascalCased}},
  withStyles(styles)
);
