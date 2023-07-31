const VALID_URL_EXPRESSION = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/i;

const allowedCors = [
  'https://theory-web.nomoredomains.sbs',
  'https://api.theory-web.nomoreparties.co',
  'localhost:3000',
  'http://theory-web.nomoredomains.sbs',
  'http://api.theory-web.nomoreparties.co',
  'http://localhost:3000',
  'http://localhost:3000/',
  'http://localhost',
  'localhost',
  'https://localhost:3000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  VALID_URL_EXPRESSION,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
