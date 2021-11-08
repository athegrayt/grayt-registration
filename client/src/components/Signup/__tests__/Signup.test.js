/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../Signup';

const MockSignup = () => (
  <BrowserRouter>
    <Signup />
  </BrowserRouter>
);

describe('Signup', () => {
  test('email and password inputs indicate errors with invalid input', async () => {
    render(<MockSignup />);

    const submitElement = screen.getByRole('button', { type: 'submit' });

    fireEvent.click(submitElement);
    const firstNameHelperTextElement = await screen.findByText(
      /Please enter first name/i
    );
    const lastNameHelperTextElement = await screen.findByText(
      /Please enter last name/i
    );
    const emailHelperTextElement = await screen.findByText(
      /Please enter email/i
    );
    const passwordHelperTextElement = await screen.findByText(
      /Please enter password/i
    );

    expect(firstNameHelperTextElement).toBeInTheDocument();
    expect(lastNameHelperTextElement).toBeInTheDocument();
    expect(emailHelperTextElement).toBeInTheDocument();
    expect(passwordHelperTextElement).toBeInTheDocument();
  });
});
