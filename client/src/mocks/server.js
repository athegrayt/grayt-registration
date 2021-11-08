// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node';
import handlers from './handlers';

export default setupServer(...handlers);
