import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { providers } from '../../utils';
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

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default providers(
  {{pascalCased}},
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
);
