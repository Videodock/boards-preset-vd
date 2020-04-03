import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import styles from './{{pascalCased}}.styles';

const useStyles = makeStyles(styles);

export default function {{pascalCased}} () {
  const pathname = useSelector(state => state.router.location.pathname, shallowEqual);
  const classes  = useStyles();
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Helmet>
        <title>{{pascalCased}} screen</title>
        <meta name="description" content="{{pascalCased}} screen description" />
        <meta property="og:title" content="{{pascalCased}}" />
      </Helmet>
      <header>
        <Typography type="title">Welcome to the "{{pascalCased}}" screen skeleton</Typography>
      </header>
      <Typography paragraph>
        To get started, edit <code>src/screens/{{pascalCased}}/{{pascalCased}}.skeleton.jsx</code> and save to reload.
      </Typography>
      <Typography paragraph>
        Your current location is {pathname}
      </Typography>
    </React.Fragment>
  );
}
