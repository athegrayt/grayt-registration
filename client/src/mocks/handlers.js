import { rest } from 'msw';
import { formValidate } from './utils';

export default [
  // Handles a POST /signin request
  rest.post('http://localhost/api/signin', (req, res, ctx) => {
    const { email, password } = req.body;

    if (email === 'nonUser@gmail.com') {
      return res(
        ctx.status(400),
        ctx.json({
          error: `We don't seem to have that email in our database.`,
        })
      );
    }
    if (email === 'invalidEmail') {
      return res(
        ctx.status(400),
        ctx.json({
          error: `Please enter a valid email`,
        })
      );
    }
    if (email === 'currentUser@gmail.com' && password === 'zxcvbnm123') {
      return res(
        ctx.status(401),
        ctx.json({
          error: `Email and password don't match`,
        })
      );
    }
    if (formValidate({ email, password })) {
      return res(ctx.status(400), ctx.json({ error: formValidate(req.body) }));
    }
    return res(ctx.status(200));
  }),
  // Handles a POST /signin request
  rest.post('http://localhost/api/signup', (req, res, ctx) => {
    if (formValidate(req.body)) {
      return res(ctx.status(400), ctx.json({ error: formValidate(req.body) }));
    }
    return res(ctx.status(200));
  }),
  // Handles a POST /account-lookup request
  rest.post('http://localhost/api/account-lookup', (req, res, ctx) => {
    if (formValidate(req.body)) {
      return res(ctx.status(400), ctx.json({ error: formValidate(req.body) }));
    }
    return res(ctx.status(200));
  }),
  // Handles a PUT /api/reset-password/:id request
  rest.put(
    'http://localhost:8000/api/reset-password/undefined',
    (req, res, ctx) => {
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
