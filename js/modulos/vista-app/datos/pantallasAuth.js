import { ir, pantalla } from './fabricas.js';

export const pantallasAuth = [
  pantalla({
    id: 'login',
    figmaId: '19:186',
    nombre: 'Login',
    usuario: 'general',
    template: 'auth',
    auth: {
      tipo: 'sso',
      titulo: 'CampusLink',
      subtitulo: 'Gestión inteligente del campus',
      descripcion: 'Reporta incidencias, sigue su estado y ayuda a mejorar tu entorno universitario.',
      boton: { texto: 'Ingresar con cuenta UPC', to: 'login-datos' },
      enlace: 'Conoce cómo protegemos tus datos'
    },
    acciones: [ir('Component / Button / Primary / UPC Login', 'login-datos')]
  }),
  pantalla({
    id: 'login-datos',
    figmaId: '1216:55',
    nombre: 'Login / Datos',
    usuario: 'general',
    template: 'authForm',
    auth: {
      titulo: 'CampusLink',
      subtitulo: 'Gestión inteligente del campus',
      descripcion: 'Ingresa con tu correo institucional para continuar con tus reportes y seguimiento.',
      fields: [
        ['Correo institucional', 'nombre@upc.edu.pe'],
        ['Contraseña', '••••••••']
      ],
      enlaceIntermedio: '¿Olvidaste tu contraseña?',
      boton: { texto: 'Iniciar sesión', to: 'config-experiencia' },
      accionesExtra: [
        { texto: '¿No tienes cuenta?', destacado: 'Crear cuenta', to: 'registro-upc' },
        { texto: 'Conoce cómo protegemos tus datos' }
      ]
    },
    acciones: [ir('Component / Button / Primary / Login Data', 'config-experiencia')]
  }),
  pantalla({
    id: 'registro-upc',
    figmaId: '1218:2',
    nombre: 'Registro / Usuario UPC',
    usuario: 'general',
    template: 'register',
    header: { tipo: 'claro', titulo: 'Crear cuenta', volver: 'login-datos' },
    blocks: [
      { tipo: 'title', texto: 'Únete a CampusLink' },
      { tipo: 'text', texto: 'Crea tu cuenta institucional para reportar incidencias y revisar su atención.' },
      { tipo: 'inputs', fields: [
        { etiqueta: 'Nombre y apellido', placeholder: 'Ej. Elena Vargas', dentro: true },
        { etiqueta: 'Correo institucional', placeholder: 'nombre.apellido@upc.edu.pe', dentro: true },
        { etiqueta: 'Código UPC', placeholder: 'U202612345', dentro: true }
      ] },
      { tipo: 'selectRow', items: [
        { etiqueta: 'Tu rol', valor: 'Estudiante', activo: true },
        { etiqueta: 'Sede', valor: '{sede}' }
      ] },
      { tipo: 'inputs', fields: [
        { etiqueta: 'Contraseña', placeholder: '••••••••', dentro: true },
        { etiqueta: 'Confirmar contraseña', placeholder: '••••••••', dentro: true }
      ] },
      { tipo: 'buttonGroup', items: [
        { texto: 'Crear cuenta', to: 'config-experiencia', variante: 'primario' },
        { texto: 'Ya tengo cuenta', destacado: 'Iniciar sesión', to: 'login-datos', variante: 'texto' }
      ] }
    ],
    acciones: [ir('Component / Button / Primary / Create Account', 'config-experiencia')]
  }),
  pantalla({
    id: 'config-experiencia',
    figmaId: '19:208',
    nombre: 'Configuracion experiencia',
    usuario: 'general',
    template: 'config',
    acciones: [ir('Component / Button / Primary / Continue', 'dashboard-estudiante')]
  }),
  pantalla({
    id: 'config-experiencia-soporte',
    figmaId: '861:133',
    nombre: 'Configuracion experiencia',
    usuario: 'soporte',
    template: 'config',
    acciones: [ir('Component / Button / Primary / Continue', 'dashboard-soporte')]
  }),
];
