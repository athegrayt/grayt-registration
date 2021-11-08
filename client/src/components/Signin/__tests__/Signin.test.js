/* eslint-disable no-undef */
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
  test('email and password inputs indicate errors with empty input', async () => {
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

  test('email input indicates non-registered account errors with non-registered account input', async () => {
    render(<MockSignin />);

    const emailInputElement = screen.getByTestId('account-email');
    const passwordInputElement = screen.getByTestId('account-password');
    fireEvent.change(emailInputElement, {
      target: { value: 'nonUser@gmail.com' },
    });
    fireEvent.change(passwordInputElement, {
      target: { value: 'zxcvbnm123' },
    });
    const submitElement = screen.getByRole('button', { type: 'submit' });

    fireEvent.click(submitElement);
    const emailHelperTextElement = await screen.findByText(
      /We don't seem to have that email in our database./i
    );

    expect(emailHelperTextElement).toBeInTheDocument();
  });
  test('password input indicates email and password mismatch errors with wrong password input', async () => {
    render(<MockSignin />);

    const emailInputElement = screen.getByTestId('account-email');
    const passwordInputElement = screen.getByTestId('account-password');
    fireEvent.change(emailInputElement, {
      target: { value: 'currentUser@gmail.com' },
    });
    fireEvent.change(passwordInputElement, {
      target: { value: 'zxcvbnm123' },
    });
    const submitElement = screen.getByRole('button', { type: 'submit' });

    fireEvent.click(submitElement);
    const passwordHelperTextElement = await screen.findByText(
      /Email and password don't match/i
    );

    expect(passwordHelperTextElement).toBeInTheDocument();
  });
  test('email input indicates invalid email error with invalid email input', async () => {
    render(<MockSignin />);

    const emailInputElement = screen.getByTestId('account-email');
    const passwordInputElement = screen.getByTestId('account-password');
    fireEvent.change(emailInputElement, {
      target: { value: 'invalidEmail' },
    });
    fireEvent.change(passwordInputElement, {
      target: { value: 'zxcvbnm123' },
    });
    const submitElement = screen.getByRole('button', { type: 'submit' });

    fireEvent.click(submitElement);
    const emailHelperTextElement = await screen.findByText(
      /Please enter a valid email/i
    );

    expect(emailHelperTextElement).toBeInTheDocument();
  });
  test('only password input indicates invalid password syntax error with valid email but invalid password input', async () => {
    render(<MockSignin />);

    const emailInputElement = screen.getByTestId('account-email');
    const passwordInputElement = screen.getByTestId('account-password');
    fireEvent.change(emailInputElement, {
      target: { value: 'validEmail@gmail.com' },
    });
    fireEvent.change(passwordInputElement, {
      target: { value: 'zxcvbnm' },
    });
    const submitElement = screen.getByRole('button', { type: 'submit' });

    fireEvent.click(submitElement);
    const emailHelperTextElement = screen.queryByText(
      /Please enter a vaild email/i
    );
    const passwordHelperTextElement = await screen.findByText(
      /Password must contain a number/i
    );

    expect(emailHelperTextElement).not.toBeInTheDocument();
    expect(passwordHelperTextElement).toBeInTheDocument();
  });
});
