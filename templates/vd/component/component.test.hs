import React from 'react';
import ReactDOM from 'react-dom';
import { baseProvided } from '../../../testUtils';
import {{pascalCased}} from './{{pascalCased}}';

test('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(baseProvided(<{{pascalCased}} />), div);
});
