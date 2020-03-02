import React from 'react';
import configureMockStore from 'redux-mock-store';
import { renderWithStore } from '../../testUtils';
import {{pascalCased}} from './{{pascalCased}}';

const mockStore   = configureMockStore();
const createStore = store => mockStore({
  ...store,
});

describe('<{{pascalCased}} />', () => {
  it('renders and matches the snapshot', () => {
    const { container } = renderWithStore(<{{pascalCased}} />, createStore({}));

    expect(container).toMatchSnapshot();
  });
});
