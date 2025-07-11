const Ziggy = {
  url: 'https://ui-api.test',
  port: null,
  defaults: {},
  routes: {
    home: { uri: '/', methods: ['GET', 'HEAD'] },
    blocks: { uri: 'blocks', methods: ['GET', 'HEAD'] },
    legal: { uri: 'legal', methods: ['GET', 'HEAD'] },
    style: { uri: 'style', methods: ['GET', 'HEAD'] },
    'tab-one': { uri: 'tabs/tab-one', methods: ['GET', 'HEAD'] },
    'tab-two': { uri: 'tabs/tab-two', methods: ['GET', 'HEAD'] },
    'tab-three': { uri: 'tabs/tab-three', methods: ['GET', 'HEAD'] },
    dashboard: { uri: 'dashboard', methods: ['GET', 'HEAD'] },
    'profile.edit': { uri: 'settings/profile', methods: ['GET', 'HEAD'] },
    'profile.update': { uri: 'settings/profile', methods: ['PATCH'] },
    'profile.destroy': { uri: 'settings/profile', methods: ['DELETE'] },
    'password.edit': { uri: 'settings/password', methods: ['GET', 'HEAD'] },
    'password.update': { uri: 'settings/password', methods: ['PUT'] },
    appearance: { uri: 'settings/appearance', methods: ['GET', 'HEAD'] },
    register: { uri: 'register', methods: ['GET', 'HEAD'] },
    login: { uri: 'login', methods: ['GET', 'HEAD'] },
    'password.request': { uri: 'forgot-password', methods: ['GET', 'HEAD'] },
    'password.email': { uri: 'forgot-password', methods: ['POST'] },
    'password.reset': {
      uri: 'reset-password/{token}',
      methods: ['GET', 'HEAD'],
      parameters: ['token']
    },
    'password.store': { uri: 'reset-password', methods: ['POST'] },
    'verification.notice': { uri: 'verify-email', methods: ['GET', 'HEAD'] },
    'verification.verify': {
      uri: 'verify-email/{id}/{hash}',
      methods: ['GET', 'HEAD'],
      parameters: ['id', 'hash']
    },
    'verification.send': { uri: 'email/verification-notification', methods: ['POST'] },
    'password.confirm': { uri: 'confirm-password', methods: ['GET', 'HEAD'] },
    logout: { uri: 'logout', methods: ['POST'] },
    source: {
      uri: 'source/{path}',
      methods: ['GET', 'HEAD'],
      wheres: { path: '.*' },
      parameters: ['path']
    },
    'component-source': {
      uri: 'component-source/{path}',
      methods: ['GET', 'HEAD'],
      wheres: { path: '.*' },
      parameters: ['path']
    },
    md: {
      uri: 'md/{path}',
      methods: ['GET', 'HEAD'],
      wheres: { path: '.*' },
      parameters: ['path']
    },
    docs: {
      uri: 'docs/{path}',
      methods: ['GET', 'HEAD'],
      wheres: { path: '.*' },
      parameters: ['path']
    },
    demo: {
      uri: 'demos/{path}',
      methods: ['GET', 'HEAD'],
      wheres: { path: '.*' },
      parameters: ['path']
    },
    'storage.local': {
      uri: 'storage/{path}',
      methods: ['GET', 'HEAD'],
      wheres: { path: '.*' },
      parameters: ['path']
    }
  }
}
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes)
}
export { Ziggy }
