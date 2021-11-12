/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
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
  test('modal alerts server error', async () => {
    render(
      <MemoryRouter initialEntries={['/reset-password/id']}>
        <ResetPassword />
      </MemoryRouter>
    );
    const passwordInputElement = screen.getByTestId('password-resetPassword');
    fireEvent.change(passwordInputElement, {
      target: { value: 'zxcvbnm123' },
    });
    const passwordVerifyInputElement = screen.getByTestId(
      'passwordVerify-resetPassword'
    );
    fireEvent.change(passwordVerifyInputElement, {
      target: { value: 'zxcvbnm123' },
    });
    const submitButtonElement = screen.getByRole('button', {
      type: 'submit',
    });
    fireEvent.click(submitButtonElement);
    const modalTextElement = await screen.findByText(/Oops/);
    expect(modalTextElement).toBeInTheDocument();
  });
  test('modal alerts password was successfully updated', async () => {
    render(
      <MemoryRouter initialEntries={['/reset-password/id']}>
        <ResetPassword />
      </MemoryRouter>
    );
    const passwordInputElement = screen.getByTestId('password-resetPassword');
    fireEvent.change(passwordInputElement, {
      target: { value: 'abcdefg123' },
    });
    const passwordVerifyInputElement = screen.getByTestId(
      'passwordVerify-resetPassword'
    );
    fireEvent.change(passwordVerifyInputElement, {
      target: { value: 'abcdefg123' },
    });
    const submitButtonElement = screen.getByRole('button', {
      type: 'submit',
    });
    fireEvent.click(submitButtonElement);
    const modalTextElement = await screen.findByText(
      /Password was updated successfully/
    );
    expect(modalTextElement).toBeInTheDocument();
  });
});
