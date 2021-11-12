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
    if (email === 'serverError@gmail.com') {
      return res();
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
          error: `You have entered an invalid email or password`,
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
    const { email } = req.body;
    if (email === 'serverError@gmail.com') {
      return res();
    }
    if (formValidate(req.body)) {
      return res(ctx.status(400), ctx.json({ error: formValidate(req.body) }));
    }
    return res(ctx.status(200));
  }),
  // Handles a POST /account-lookup request
  rest.post('http://localhost/api/account-lookup', (req, res, ctx) => {
    const { email } = req.body;
    if (email === 'serverError@gmail.com') {
      return res();
    }
    if (email === 'validEmail@gmail.com') {
      return res(ctx.status(200), ctx.json({ data: 'realAccount' }));
    }
    if (formValidate(req.body)) {
      return res(ctx.status(400), ctx.json({ error: formValidate(req.body) }));
    }
    return res(ctx.status(200));
  }),
  // Handles a PUT /api/reset-password/:id/:token request
  rest.put(
    'http://localhost/api/reset-password/undefined/undefined',
    (req, res, ctx) => {
      const { password } = req.body;
      if (password === 'zxcvbnm123') {
        return res();
      }
      if (password === 'abcdefg123') {
        return res(ctx.status(200), ctx.json({ data: 'password updated' }));
      }
      if (formValidate(req.body)) {
        return res(
          ctx.status(400),
          ctx.json({ error: formValidate(req.body) })
        );
      }
      return res(ctx.status(200));
    }
  ),
  // Handles a PUT /api/reset-password/:id/:token request
  rest.get('http://localhost/api/signout', (req, res, ctx) =>
    res(ctx.status(200))
  ),
];
