export const urbitConfig = {
  desk: 'pals',
  path: '/',
  agent: 'pals',
  ship: 'littel-wolfur',
  url: 'https://littel-wolfur.urbit.land',
  code: 'laslut-hadrux-ranryn-bacbyt'
  // ship: 'bannyt-rilbes-littel-wolfur',
  // url: 'http://monadnock.local:8085',
  // code: 'rignex-somfel-bisren-sogdys',
};

export const authSubConfig = {
  ship: window?.ship || process.env.REACT_APP_SHIP_NAME || '',
  url: window?.ship || process.env.REACT_APP_SHIP_URL || '',
  code: window?.ship || process.env.REACT_APP_SHIP_CODE || '',
  verbose: true,
};
