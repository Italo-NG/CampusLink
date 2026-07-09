import { icon, ICONS } from './icons.js';
import { t, safeText, button, setRenderState } from './helpers.js';
import { header, tabbar, iconButton, renderBlocks } from './blocks.js';
import { dataCard, badgeClass } from './contentBlocks.js';
import { authFields, selectRow, options } from './formBlocks.js';
import { APP_VIEW_SCREENS, APP_VIEW_ROLES } from '../data/index.js';

export function renderAuth(screen) {
  var data = screen.auth;
  return '<div class="appViewScreen" data-view-screen="' + safeText(screen.id) + '">' +
    '<div class="appViewAuth appViewAuth--login">' +
      '<div class="appViewAuthTop">' +
        '<div class="appViewAppLogo"><img src="assets/logo/favicon.png" alt=""></div>' +
        '<div><h3 class="appViewBrandTitle">' + t(data.titulo) + '</h3><h4 class="appViewTitle appViewTitle--small appViewTitle--center">' + t(data.subtitulo) + '</h4></div>' +
        '<p class="appViewText appViewText--center">' + t(data.descripcion) + '</p>' +
      '</div>' +
      '<div class="appViewAuthActions">' +
        button({ texto: data.boton.texto, to: data.boton.to, variante: 'primario', clase: 'appViewButton--tall' }) +
        (data.registro ? button({ texto: data.registro.texto, destacado: data.registro.destacado, to: data.registro.to, variante: 'texto' }) : '') +
        '<button class="appViewButton appViewButton--text">' + t(data.enlace) + '</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

export function renderAuthForm(screen) {
  var data = screen.auth;
  return '<div class="appViewScreen" data-view-screen="' + safeText(screen.id) + '">' +
    '<div class="appViewAuth appViewAuth--data">' +
      '<div class="appViewAuthContent">' +
        '<div class="appViewAuthTop appViewAuthTop--data">' +
          '<div class="appViewAppLogo"><img src="assets/logo/favicon.png" alt=""></div>' +
          '<div class="appViewAuthBrand"><h3 class="appViewBrandTitle">' + t(data.titulo) + '</h3><h4 class="appViewTitle appViewTitle--small appViewTitle--center">' + t(data.subtitulo) + '</h4></div>' +
          '<p class="appViewText appViewText--center">' + t(data.descripcion) + '</p>' +
        '</div>' +
        authFields(data.fields) +
        (data.enlaceIntermedio ? '<button class="appViewButton appViewButton--text">' + t(data.enlaceIntermedio) + '</button>' : '') +
      '</div>' +
      '<div class="appViewAuthActions appViewAuthActions--data">' +
        button({ texto: data.boton.texto, to: data.boton.to, variante: 'primario', clase: 'appViewButton--tall' }) +
        data.accionesExtra.map(function (item) {
          return button({ texto: item.texto, destacado: item.destacado, to: item.to, variante: 'texto' });
        }).join('') +
      '</div>' +
    '</div>' +
  '</div>';
}

export function renderRegister(screen) {
  var formGroups = screen.blocks.filter(function (block) {
    return block.tipo === 'inputs' || block.tipo === 'selectRow';
  });
  var actionBlock = screen.blocks.find(function (block) {
    return block.tipo === 'buttonGroup';
  });

  return '<div class="appViewScreen" data-view-screen="' + safeText(screen.id) + '">' +
    '<div class="appViewRegister">' +
      '<header class="appViewRegisterHeader">' +
        iconButton('chevron-left', 'login-data', 'Back') +
        '<h3 class="appViewTitle">' + t('Create account') + '</h3>' +
        '<span class="appViewIconBtn appViewIconBtn--light" aria-hidden="true"></span>' +
      '</header>' +
      '<main class="appViewRegisterBody">' +
        '<section class="appViewRegisterIntro">' +
          '<h4 class="appViewTitle appViewTitle--small">' + t('Join CampusLink') + '</h4>' +
          '<p class="appViewText">' + t('Create your institutional account to report incidents and review service progress.') + '</p>' +
        '</section>' +
        '<div class="appViewRegisterForm">' + formGroups.map(function (block) {
          if (block.tipo === 'inputs') return authFields(block.fields);
          return selectRow(block.items);
        }).join('') + '</div>' +
      '</main>' +
      '<div class="appViewRegisterActions">' +
        (actionBlock ? actionBlock.items.map(function (item, index) {
          return button({
            texto: item.texto,
            destacado: item.destacado,
            to: item.to,
            variante: item.variante,
            clase: index === 0 ? 'appViewButton--tall' : ''
          });
        }).join('') : '') +
      '</div>' +
    '</div>' +
  '</div>';
}

export function renderConfig(screen, state) {
  var activeRole = state.rol || 'estudiante';
  return '<div class="appViewScreen" data-view-screen="' + safeText(screen.id) + '">' +
    '<div class="appViewScroll"><div class="appViewInner appViewInner--top">' +
      '<h3 class="appViewTitle">' + t('Configure your experience') + '</h3>' +
      '<p class="appViewText">' + t('We will use this information to show you relevant features.') + '</p>' +
      '<div class="appViewSpacer8"></div>' +
      '<h4 class="appViewTitle appViewTitle--small">' + t('Main campus') + '</h4>' +
      options({ field: 'sede', items: [{ texto: 'Monterrico' }, { texto: 'San Isidro' }, { texto: 'Villa' }, { texto: 'San Miguel' }] }) +
      '<div class="appViewSpacer8"></div>' +
      '<h4 class="appViewTitle appViewTitle--small">' + t('Your role') + '</h4>' +
      '<div class="appViewButtonGroup">' + APP_VIEW_ROLES.map(function (role) {
        return '<button class="appViewOption ' + (role.id === activeRole ? 'appViewOption--active' : '') + '" data-view-action="rol" data-view-target="' + safeText(role.id) + '"><span>' + t(role.etiqueta) + '</span><span class="appViewOptionIcon">' + (role.id === activeRole ? icon('check') : '') + '</span></button>';
      }).join('') + '</div>' +
      '<div class="appViewSpacer8"></div>' +
      button({ texto: 'Continue', continuarRol: true, variante: 'primario', clase: 'appViewButton--tall' }) +
    '</div></div>' +
  '</div>';
}

export function renderStandard(screen, state) {
  var style = ' style="background:' + safeText(screen.fondo) + ';"';
  var hasHeader = !!screen.header;
  var innerClass = 'appViewInner' + (!hasHeader ? ' appViewInner--top' : '') +
    (screen.cta ? (screen.tabbar ? ' appViewInner--withCtaTabbar' : ' appViewInner--withCta') : '');
  var cta = screen.cta
    ? '<div class="appViewCtaBar' + (screen.tabbar ? ' appViewCtaBar--aboveTabbar' : '') + '">' + screen.cta.items.map(button).join('') + '</div>'
    : '';
  return '<div class="appViewScreen"' + style + ' data-view-screen="' + safeText(screen.id) + '">' +
    '<div class="appViewScroll">' +
      header(screen) +
      '<main class="' + innerClass + '">' + renderBlocks(screen.blocks, state) + '</main>' +
    '</div>' +
    cta +
    tabbar(screen.tabbar, state) +
  '</div>';
}

function successSummary(data) {
  var badge = data.badge ? '<span class="appViewBadge' + badgeClass(data.badge) + '">' + t(data.badge) + '</span>' : '';
  return '<div class="appViewCard appViewSuccessSummary">' +
    '<span class="appViewCardTitleCaps">' + t(data.label || 'Ticket ID') + '</span>' +
    '<span class="appViewSuccessId">' + t(data.id) + '</span>' +
    badge +
  '</div>';
}

export function renderSuccess(screen, state) {
  var data = screen.success;
  var iconClass = 'appViewSuccessIcon' + (data.tono ? ' appViewSuccessIcon--' + safeText(data.tono) : '');
  return '<div class="appViewScreen" data-view-screen="' + safeText(screen.id) + '">' +
    '<div class="appViewSuccess">' +
      '<div class="appViewSuccessBody">' +
        '<span class="' + iconClass + '">' + (data.icon ? (ICONS[data.icon] ? icon(data.icon) : '<span class="appViewSuccessTextIcon">' + t(data.icon) + '</span>') : icon('check')) + '</span>' +
        '<h3 class="appViewTitle">' + t(data.titulo) + '</h3>' +
        '<p class="appViewText appViewText--center">' + t(data.texto) + '</p>' +
        (data.resumen ? successSummary(data.resumen) : (data.rows ? dataCard({ rows: data.rows }) : '')) +
        (data.nota ? '<p class="appViewText appViewText--small appViewText--center">' + t(data.nota) + '</p>' : '') +
      '</div>' +
      '<div class="appViewSuccessActions">' + (data.botones || []).map(button).join('') + '</div>' +
    '</div>' +
    tabbar(screen.tabbar, state) +
  '</div>';
}

export function renderScreen(state) {
  setRenderState(state);
  var screen = APP_VIEW_SCREENS[state.pantalla] || APP_VIEW_SCREENS.login;

  if (screen.template === 'auth') return renderAuth(screen);
  if (screen.template === 'authForm') return renderAuthForm(screen);
  if (screen.template === 'register') return renderRegister(screen);
  if (screen.template === 'config') return renderConfig(screen, state);
  if (screen.template === 'success') return renderSuccess(screen, state);
  return renderStandard(screen, state);
}
