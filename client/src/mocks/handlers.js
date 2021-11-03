import { rest } from 'msw';
import { formValidate } from './utils';

export default [
  // Handles a POST /signin request
  rest.post('http://localhost/api/signin', (req, res, ctx) => {
    console.log('Mock Request: /sign');
    if (formValidate(req.body)) {
      return res(ctx.status(400), ctx.json({ error: formValidate(req.body) }));
    }
    return res(ctx.status(200));
  }),
  // Handles a POST /signin request
  rest.post('http://localhost/api/signup', (req, res, ctx) => {
    console.log('Mock Request: /signup');
    if (formValidate(req.body)) {
      return res(ctx.status(400), ctx.json({ error: formValidate(req.body) }));
    }
    return res(ctx.status(200));
  }),
  // Handles a POST /account-lookup request
  rest.post('http://localhost/api/account-lookup', (req, res, ctx) => {
    console.log('Mock Request: /account-lookup');
    if (formValidate(req.body)) {
      return res(ctx.status(400), ctx.json({ error: formValidate(req.body) }));
    }
    return res(ctx.status(200));
  }),
  // Handles a PUT /api/reset-password/:id request
  rest.put(
    'http://localhost:8000/api/reset-password/undefined',
    (req, res, ctx) => {
      console.log('Mock Request: /reset-password');
      if (formValidate(req.body)) {
        return res(
          ctx.status(400),
          ctx.json({ error: formValidate(req.body) })
        );
      }
      return res(ctx.status(200));
    }
  ),
];
