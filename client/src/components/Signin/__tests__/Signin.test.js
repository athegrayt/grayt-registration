import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signin from '../Signin';

describe('FollowersList', () => {
  test('renders Signout on link click', async () => {
    render(<App />);
    const signinElement = await screen.findByRole("heading", {name: Signin});
    expect(signinElement).toBeInTheDocument();
  });
  
});
