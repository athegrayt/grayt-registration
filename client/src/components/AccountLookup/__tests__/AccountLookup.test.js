import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AccountLookup from '../AccountLookup';

const MockAccountLookup = () => (
  <BrowserRouter>
    <AccountLookup />
  </BrowserRouter>
);

describe('AccountLookup', () => {
  test('email and password inputs indicate errors with invalid input', async () => {
    render(<MockAccountLookup />);

    const submitElement = screen.getByRole('button', { type: 'submit' });

    fireEvent.click(submitElement);
    const emailHelperTextElement = await screen.findByText(
      /Please enter a valid email/i
    );

    expect(emailHelperTextElement).toBeInTheDocument();
  });
});
