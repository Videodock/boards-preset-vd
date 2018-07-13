import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { providers } from '../../utils';
import styles from './{{pascalCased}}.styles';

export class {{pascalCased}} extends Component {
  render() {
    return (
      <React.Fragment>
        <Typography component="p">
          {{pascalCased}} screen skeleton. This component can be rendered while the JS chunk is being loaded.<br />
          Prevent dependencies in this component and only render the component skeleton. <br />
          <br />
          <br/>
          edit this file: <code>src/screens/{{pascalCased}}/{{pascalCased}}.skeleton.jsx</code>
        </Typography>
      </React.Fragment>
    );
  }
}

export default providers(
  {{pascalCased}},
  withStyles(styles),
);
