import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signin from '../Signin';

const MockSignin = () => (
  <BrowserRouter>
    <Signin />
  </BrowserRouter>
);

describe('Signin', () => {
  test('email and password inputs indicate errors with invalid input', async () => {
    render(<MockSignin />);

    const submitElement = screen.getByRole('button', { type: 'submit' });

    fireEvent.click(submitElement);
    const emailHelperTextElement = await screen.findByText(
      /Please enter email/i
    );
    const passwordHelperTextElement = await screen.findByText(
      /Please enter password/i
    );

    expect(emailHelperTextElement).toBeInTheDocument();
    expect(passwordHelperTextElement).toBeInTheDocument();
  });
});