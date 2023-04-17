export const urbitConfig = {
  desk: 'boat',
  path: '/boat',
  agent: 'boat',
  ship: 'bus',
  url: 'http://localhost:8080',
  code: 'riddec-bicrym-ridlev-pocsef',
  event: console.log,
  err: console.error,
  quit: console.log,
};

export const authSubConfig = {
  ship: window?.ship || process.env.REACT_APP_SHIP_NAME || '',
  url: window?.ship || process.env.REACT_APP_SHIP_URL || '',
  code: window?.ship || process.env.REACT_APP_SHIP_CODE || '',
  verbose: true,
};

export type Config = typeof urbitConfig;
