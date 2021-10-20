import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import App from '../../App'

test('active link changes color', () => {
    const history = createMemoryHistory()
    const { getByText, getByTestId } = render(
        <App  />
    );
  const homeMenuContent = getByText("Home");
  expect(homeMenuContent).toHaveStyle(`color: 'red'`);
  userEvent.click(getByTestId('menu-Signin'))
  const signinMenuContent=getByTestId('menu-Signin')
  expect(signinMenuContent).toHaveStyle({color: 'red'});
});

