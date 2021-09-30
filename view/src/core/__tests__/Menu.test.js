import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import Routes from '../../Routes'

test('active link changes color', () => {
    const history = createMemoryHistory()
    const { getByText, getByTestId } = render(
        <Routes  />
    );
  const homeMenuContent = getByText("Home");
  expect(homeMenuContent).toHaveStyle(`color: 'red'`);
  userEvent.click(getByTestId('menu-Signin'))
  const signinMenuContent=getByTestId('menu-Signin')
  expect(signinMenuContent).toHaveStyle({color: 'red'});
});

