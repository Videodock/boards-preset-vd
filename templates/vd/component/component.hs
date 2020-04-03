import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import * as PropTypes from 'prop-types';
import styles from './{{pascalCased}}.styles';

const useStyles = makeStyles(styles);

export default function {{pascalCased}} () {
  const { t }   = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span>{t('hello')} from component/{{pascalCased}}/{{pascalCased}}.jsx!</span>
    </div>
  );
}

{{pascalCased}}.propTypes = {};

{{pascalCased}}.defaultProps = {};
