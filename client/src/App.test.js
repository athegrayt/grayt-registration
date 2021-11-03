import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
jest.mock('./auth/index.js');

const MockApp = () => (
  <Router history={history}>
    <App />
  </Router>
);

test.skip('signin page renders when not authenticated', () => {
  const history = createMemoryHistory();
  history.push('/signup');
  render(<MockApp />);
  const signupContent = screen.getAllByText(/Sign in/i);
  expect(signupContent).toBeTruthy();
});
