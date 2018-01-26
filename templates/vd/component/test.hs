import React from 'react';
import ReactDOM from 'react-dom';
import {{pascalCased}} from './{{pascalCased}}';
import { provided } from '../{{dirUp}}../testUtils';

test('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(provided(<{{pascalCased}} />), div);
});
