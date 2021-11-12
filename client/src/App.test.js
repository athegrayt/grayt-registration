/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react';

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App.js', () => {
  test('modal verifies that email was sent', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const registerLinkElement = screen.getByTestId('menu-register');
    fireEvent.click(registerLinkElement);
    const forgotPasswordElement = await screen.findByText(/forgot password/i);
    fireEvent.click(forgotPasswordElement);
    const accountLookupElement = screen.getByTestId('email-account-lookup');
    fireEvent.change(accountLookupElement, {
      target: { value: 'validEmail@gmail.com' },
    });
    const submitButtonElement = screen.getByText('Send Email');
    fireEvent.click(submitButtonElement);
    const modalElement = await screen.findByText(/Email sent successfully/i);
    expect(modalElement).toBeInTheDocument();
  });
});
