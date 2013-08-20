var config = require(__libdir + '/config');

config.website.browserVersions = {
  IE: {major: 8, minor: 0},
  Firefox: {major: 3, minor: 6},
  Opera: {major: 10, minor: 6},
  Safari: {major: 4, minor: 0},
  Chrome: {major: 17, minor: 0}
};

config.website.views.vars = {
  productionMode: false,
  minimizeJS: false,
  baseUri: config.authority.baseUri,
  serviceHost: config.server.host,
  serviceDomain: config.server.domain,
  supportDomain: config.server.domain,
  googleAnalytics: {
    enabled: false,
    account: ''
  },
  session: {
    loaded: false,
    auth: false
  },
  inav: '',
  pageLayout: 'normal',
  // FIXME: remove unused vars below
  cache: {
    static: false,
    // FIXME
    //key: '1.0.0-20120528155338'
    key: ''
  },
  debug: true,
  licenses: {
    directories: ['../licenses']
  },
  title: config.brand.name,
  siteTitle: config.brand.name,
  redirect: true,
  style: {
    brand: {
      alt: config.brand.name,
      src: '/img/payswarm.png',
      height: '24',
      width: '182'
    }
  },
  // extensions for webpage loaded resources can be adjusted to 'min.css' or
  // similar to load minimized resources
  // local resources
  cssExt: 'css',
  // library resources
  cssLibExt: 'css',
  // list of css files to load without the extension
  cssList: [],
  cacheRoot: '',
  // client-side data
  clientData: {
    siteTitle: config.brand.name,
    productionMode: false,
    paymentDefaults: {
      allowDuplicatePurchases: true
    }
  },
  // contact and social media details
  // blog, email, facebook, github, googlePlus, irc, twitter, youtube
  //   *: {label: '...', url: '...'}
  //   email: {..., email: '...'}
  contact: {}
};

config.website.views.routes = [
  ['/', 'index.tpl'],
  '/about',
  '/legal',
  '/contact',
  ['/help', 'help/index.tpl'],
  '/help/pricing',
  '/help/wordpress'
];
