import React from 'react';
import ReactDOM from 'react-dom';
import { provided } from '../../testUtils';
import {{pascalCased}} from './{{pascalCased}}';

test('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(provided(<{{pascalCased}} />), div);
});
