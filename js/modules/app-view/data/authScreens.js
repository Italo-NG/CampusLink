import { goTo, screen } from './factories.js';

export const authScreens = [
  screen({
    id: 'login',
    figmaId: '1233:115',
    nombre: 'Login',
    usuario: 'general',
    template: 'auth',
    auth: {
      tipo: 'sso',
      titulo: 'CampusLink',
      subtitulo: 'Smart campus management',
      descripcion: 'Report incidents, track their status, and help improve your university environment.',
      boton: { texto: 'Sign in with UPC account', to: 'login-data' },
      registro: { texto: 'Don’t have an account?', destacado: 'Create account', to: 'upc-registration' },
      enlace: 'Learn how we protect your data'
    },
    acciones: [goTo('Component / Button / Primary / UPC Login', 'login-data')]
  }),
  screen({
    id: 'login-data',
    figmaId: '1233:609',
    nombre: 'Login / Data',
    usuario: 'general',
    template: 'authForm',
    auth: {
      titulo: 'CampusLink',
      subtitulo: 'Smart campus management',
      descripcion: 'Enter your institutional email to continue with your reports and tracking.',
      fields: [
        ['Institutional email', 'name@upc.edu.pe'],
        ['Password', '••••••••']
      ],
      enlaceIntermedio: 'Forgot your password?',
      boton: { texto: 'Log in', to: 'experience-config' },
      accionesExtra: [
        { texto: 'Don’t have an account?', destacado: 'Create account', to: 'upc-registration' },
        { texto: 'Learn how we protect your data' }
      ]
    },
    acciones: [goTo('Component / Button / Primary / Login Data', 'experience-config')]
  }),
  screen({
    id: 'upc-registration',
    figmaId: '1233:643',
    nombre: 'Registration / UPC User',
    usuario: 'general',
    template: 'register',
    header: { tipo: 'claro', titulo: 'Create account', volver: 'login-data' },
    blocks: [
      { tipo: 'title', texto: 'Join CampusLink' },
      { tipo: 'text', texto: 'Create your institutional account to report incidents and review service progress.' },
      { tipo: 'inputs', fields: [
        { etiqueta: 'Full name', placeholder: 'E.g. Elena Vargas', dentro: true },
        { etiqueta: 'Institutional email', placeholder: 'name.lastname@upc.edu.pe', dentro: true },
        { etiqueta: 'UPC code', placeholder: 'U202612345', dentro: true }
      ] },
      { tipo: 'selectRow', items: [
        { etiqueta: 'Your role', valor: 'Student', activo: true },
        { etiqueta: 'Campus', valor: '{sede}' }
      ] },
      { tipo: 'inputs', fields: [
        { etiqueta: 'Password', placeholder: '••••••••', dentro: true },
        { etiqueta: 'Confirm password', placeholder: '••••••••', dentro: true }
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Create account', to: 'experience-config', variante: 'primario' },
        { texto: 'I already have an account', destacado: 'Log in', to: 'login-data', variante: 'texto' }
      ] }
    ],
    acciones: [goTo('Component / Button / Primary / Create Account', 'experience-config')]
  }),
  screen({
    id: 'experience-config',
    figmaId: '1233:136',
    nombre: 'Experience settings',
    usuario: 'general',
    template: 'config',
    acciones: [goTo('Component / Button / Primary / Continue', 'student-dashboard')]
  }),
  screen({
    id: 'experience-config-support',
    figmaId: '861:133',
    nombre: 'Experience settings',
    usuario: 'soporte',
    template: 'config',
    acciones: [goTo('Component / Button / Primary / Continue', 'support-dashboard')]
  }),
];
