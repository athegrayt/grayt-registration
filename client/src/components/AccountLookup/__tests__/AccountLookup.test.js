/* eslint-disable no-undef */
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
  test('email inputs indicate errors with invalid input', async () => {
    render(<MockAccountLookup />);

    const submitElement = screen.getByRole('button', { type: 'submit' });

    fireEvent.click(submitElement);
    const emailHelperTextElement = await screen.findByText(
      /Please enter email/i
    );

    expect(emailHelperTextElement).toBeInTheDocument();
  });
  test('modal verifies that email was sent', async () => {
    render(<MockAccountLookup />);
    const emailInputElement = screen.getByTestId('email-account-lookup');
    fireEvent.change(emailInputElement, {
      target: { value: 'validEmail@gmail.com' },
    });
    const submitButtonElement = screen.getByRole('button', {
      type: 'submit',
    });
    fireEvent.click(submitButtonElement);
    const modalTextElement = await screen.findByText('Email sent successfully');
    expect(modalTextElement).toBeInTheDocument();
  });
  test('modal alerts server error', async () => {
    render(<MockAccountLookup />);
    const emailInputElement = screen.getByTestId('email-account-lookup');
    fireEvent.change(emailInputElement, {
      target: { value: 'serverError@gmail.com' },
    });
    const submitButtonElement = screen.getByRole('button', {
      type: 'submit',
    });
    fireEvent.click(submitButtonElement);
    const modalTextElement = await screen.findByText(/Oops/);
    expect(modalTextElement).toBeInTheDocument();
  });
});
