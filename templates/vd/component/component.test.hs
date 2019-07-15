import React from 'react';
import { render } from '../../testUtils';
import {{pascalCased}} from './{{pascalCased}}';

describe('<{{pascalCased}} />', () => {
  test('renders and matches snapshot', () => {
    const { container } = render(<{{pascalCased}} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  // add your unit tests here
});
