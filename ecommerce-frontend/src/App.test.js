import { render, screen } from '@testing-library/react';
import App from './App';

test('renders heading', () => {
  const { getByText} = render(<App />);
  const heading = getByText(/Hello from React/);
  expect(heading).toBeInTheDocument();
});
