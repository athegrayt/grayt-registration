const sgMail = require('@sendgrid/mail');

exports.sendEmail = async ({ email, message, link }) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: 'graytcommerce@gmail.com',
      subject: 'Graytcommerce Password Reset',
      text: `${message}`,
      html: `<p>${message}</p><br/><strong>${link}</strong>`,
    };
    await sgMail.send(msg);
    return 'success';
  } catch (error) {
    return error;
  }
};
