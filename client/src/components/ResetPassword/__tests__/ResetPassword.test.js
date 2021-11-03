import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ResetPassword from '../ResetPassword';

const MockResetPassword = () => (
  <BrowserRouter>
    <ResetPassword />
  </BrowserRouter>
);

describe('ResetPassword', () => {
  test('password and passwordVerify inputs indicate errors with invalid input', async () => {
    render(<MockResetPassword />);

    const submitElement = screen.getByRole('button', { type: 'submit' });

    fireEvent.click(submitElement);
    const passwordHelperTextElement = await screen.findByText(
      /Please enter password/i
    );

    expect(passwordHelperTextElement).toBeInTheDocument();
  });
});
