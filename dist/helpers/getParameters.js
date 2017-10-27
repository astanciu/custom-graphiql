'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParameterByName = getParameterByName;
function getParameterByName(name, url) {
  var urlString = url;
  if (!urlString) {
    urlString = window.location.href;
  }
  var parameterName = name.replace(/[[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + parameterName + '(=([^&#]*)|&|#|$)');
  var results = regex.exec(urlString);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}