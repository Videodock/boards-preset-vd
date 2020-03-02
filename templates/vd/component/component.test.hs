import React from 'react';
import { render } from '../../testUtils';
import {{pascalCased}} from './{{pascalCased}}';

describe('<{{pascalCased}} />', () => {
  it('renders and matches the snapshot', () => {
    const { container } = render(<{{pascalCased}} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
