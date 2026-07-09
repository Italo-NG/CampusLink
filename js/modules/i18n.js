import { TRANSLATIONS_ES, REPLACEMENTS_ES } from './i18nDictionary.js';

var DEFAULT_LANGUAGE = 'en';
var VALID_LANGUAGES = ['es', 'en'];
var TRANSLATABLE_ATTRIBUTES = ['aria-label', 'alt', 'title', 'placeholder', 'content'];
var LANGUAGE_EVENT = 'campuslink:lang';

var originalText = new WeakMap();
var originalAttributes = new WeakMap();
var i18nInitialized = false;
var currentLanguage = getLanguageFromUrl();

export function getCurrentLanguage() {
  return currentLanguage;
}

export function isValidLanguage(language) {
  return VALID_LANGUAGES.indexOf(language) !== -1;
}

export function getLanguageFromUrl() {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  var params = new URLSearchParams(window.location.search);
  var language = params.get('lang');
  return isValidLanguage(language) ? language : DEFAULT_LANGUAGE;
}

export function normalizeText(value) {
  return String(value == null ? '' : value)
    .replace(/ /g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function translateText(value) {
  var text = String(value == null ? '' : value);
  if (currentLanguage === DEFAULT_LANGUAGE) return text;

  var normalized = normalizeText(text);
  if (!normalized) return text;

  var translation = TRANSLATIONS_ES[normalized];
  if (translation) return translation;

  var replaced = normalized;
  for (var i = 0; i < REPLACEMENTS_ES.length; i++) {
    replaced = replaced.replace(REPLACEMENTS_ES[i][0], REPLACEMENTS_ES[i][1]);
  }
  return replaced !== normalized ? replaced : text;
}

function translateWithSpaces(value) {
  var text = String(value == null ? '' : value);
  var start = text.match(/^\s*/)[0];
  var end = text.match(/\s*$/)[0];
  var translated = translateText(text);
  return start + normalizeText(translated) + end;
}

function acceptTextNode(node) {
  if (!normalizeText(node.nodeValue)) return NodeFilter.FILTER_REJECT;

  var parent = node.parentElement;
  if (!parent) return NodeFilter.FILTER_REJECT;
  if (parent.closest('[data-i18n-skip]')) return NodeFilter.FILTER_REJECT;

  var tag = parent.tagName;
  if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') {
    return NodeFilter.FILTER_REJECT;
  }

  return NodeFilter.FILTER_ACCEPT;
}

function translateTextNodes(root) {
  var base = root.nodeType === Node.DOCUMENT_NODE ? root.documentElement : root;
  if (!base) return;

  var walker = document.createTreeWalker(
    base,
    NodeFilter.SHOW_TEXT,
    { acceptNode: acceptTextNode }
  );

  var node = walker.nextNode();
  while (node) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    node.nodeValue = translateWithSpaces(originalText.get(node));
    node = walker.nextNode();
  }
}

function attributeData(element) {
  var data = originalAttributes.get(element);
  if (!data) {
    data = {};
    originalAttributes.set(element, data);
  }
  return data;
}

function translateAttributes(root) {
  var base = root.nodeType === Node.DOCUMENT_NODE ? root.documentElement : root;
  if (!base) return;

  var elements = base.querySelectorAll('*');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element.closest('[data-i18n-skip]')) continue;

    var data = attributeData(element);
    for (var a = 0; a < TRANSLATABLE_ATTRIBUTES.length; a++) {
      var attribute = TRANSLATABLE_ATTRIBUTES[a];
      if (!element.hasAttribute(attribute)) continue;
      if (!data[attribute]) data[attribute] = element.getAttribute(attribute);
      element.setAttribute(attribute, translateText(data[attribute]));
    }
  }
}

function updateDocument() {
  document.documentElement.lang = currentLanguage;
  translateTextNodes(document);
  translateAttributes(document);
  updateLanguageSelectors();
  updateLanguageLinks();
}

export function urlWithLanguage(href, language) {
  var target = isValidLanguage(language) ? language : currentLanguage;
  var url = new URL(href, window.location.href);
  url.searchParams.set('lang', target);
  return url.pathname + url.search + url.hash;
}

function updateLanguageUrl(language) {
  var url = new URL(window.location.href);
  url.searchParams.set('lang', language);
  window.history.pushState({ lang: language }, '', url.pathname + url.search + url.hash);
}

function updateLanguageLinks() {
  var links = document.querySelectorAll('a[data-preserve-lang]');
  for (var i = 0; i < links.length; i++) {
    var original = links[i].getAttribute('data-href-original');
    if (!original) {
      original = links[i].getAttribute('href');
      links[i].setAttribute('data-href-original', original);
    }
    links[i].setAttribute('href', urlWithLanguage(original, currentLanguage));
  }
}

function updateLanguageSelectors() {
  var buttons = document.querySelectorAll('[data-lang]');
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    var language = button.getAttribute('data-lang');
    var active = language === currentLanguage;
    button.classList.toggle('isActive', active);
    button.setAttribute('aria-current', active ? 'true' : 'false');
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
    button.setAttribute(
      'aria-label',
      currentLanguage === 'en'
        ? (language === 'es' ? 'Switch language to Spanish' : 'Switch language to English')
        : (language === 'es' ? 'Cambiar idioma a español' : 'Cambiar idioma a inglés')
    );
  }
}

export function changeLanguage(language, options) {
  var next = isValidLanguage(language) ? language : DEFAULT_LANGUAGE;
  var shouldUpdateUrl = !options || options.updateUrl !== false;
  var shouldEmit = !options || options.emit !== false;

  currentLanguage = next;
  if (shouldUpdateUrl) updateLanguageUrl(next);
  updateDocument();

  if (shouldEmit) {
    window.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, {
      detail: { language: currentLanguage }
    }));
  }
}

export function initI18n() {
  currentLanguage = getLanguageFromUrl();
  updateDocument();

  if (i18nInitialized) return;
  i18nInitialized = true;

  document.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('[data-lang]');
    if (!button) return;
    event.preventDefault();
    changeLanguage(button.getAttribute('data-lang'));
  });

  window.addEventListener('popstate', function () {
    changeLanguage(getLanguageFromUrl(), {
      updateUrl: false
    });
  });
}
