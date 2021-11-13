/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';

import Home from '../Home';

describe('Home', () => {
  test('home component renders modal w/ signin instructions', async () => {
    render(<Home />);
    const modalTextElement = await screen.findByText(/"Register"/);
    expect(modalTextElement).toBeInTheDocument();
  });
});
