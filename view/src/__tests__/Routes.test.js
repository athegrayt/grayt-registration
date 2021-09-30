import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { MemoryRouter } from 'react-router'
import '@testing-library/jest-dom/extend-expect'
import Routes from '../Routes'

test('home page renders', () => {
    const history = createMemoryHistory()
    const { getByText } = render(
        <Router history={ history }>
            <Routes />
        </Router>);
  const homeContent = getByText(/home/);
  expect(homeContent).toBeInTheDocument();
});
test('signin page renders', () => {
    const history = createMemoryHistory()
    history.push('/signup')
    const { getByText } = render(
        <Router history={ history }>
            <Routes />
        </Router>);
  const signupContent = getByText(/signup/i);
  expect(signupContent).toBeInTheDocument();
});
