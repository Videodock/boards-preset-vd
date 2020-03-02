import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import styles from './{{pascalCased}}.styles';

const useStyles = makeStyles(styles);

export default function {{pascalCased}} () {
  const pathname = useSelector(state => state.router.location.pathname, shallowEqual);
  const dispatch = useDispatch();
  const { t }    = useTranslation();
  const classes  = useStyles();

  return (
    <div className={classes.root}>
      <span>{t('hello')} from container/{{pascalCased}}/{{pascalCased}}.jsx!</span>
    </div>
  );
}

{{pascalCased}}.propTypes = {};

{{pascalCased}}.defaultProps = {};
