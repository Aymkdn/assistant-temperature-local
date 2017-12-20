var request = require('request-promise-native');

/**
 * on crée une fonction `AssistantTemperatureLocal`
 * @param {Object} configuration L'objet `configuration` qui vient du fichier configuration.json
 */
var AssistantTemperatureLocal = function(configuration) {}

/**
 * Init le plugin
 *
 * @param  {Object} plugins Un objet représentant les autres plugins chargés
 * @return {Promise}
 */
AssistantTemperatureLocal.prototype.init = function(plugins) {
  this.plugins = plugins;
  return Promise.resolve(this);
};

/**
 * Fonction appelée par le système central
 *
 * @param {String} commande La commande envoyée depuis IFTTT par Pushbullet
 * @return {Promise}
 */
AssistantTemperatureLocal.prototype.action = function(commande) {
  // commande va ressembler à {'lat_ne':43.623467,'lon_ne':3.922819,'lat_sw':43.595031,'lon_sw':3.880996}
  var _this=this;
  commande = '"'+commande.replace(/'/g,'\\"').replace(/, /g,",")+'"';
  commande = JSON.parse(commande);
  if (typeof commande==="string") commande = JSON.parse(commande);
  if (!commande.lat_ne) return Promise.reject("[assistant-temperature-local] La latitude nord-est ('lat_ne') n'a pas été fournie dans la commande.");
  if (!commande.lon_ne) return Promise.reject("[assistant-temperature-local] Le longitude nord-est ('lon_ne') n'a pas été fournie dans la commande.");
  if (!commande.lat_sw) return Promise.reject("[assistant-temperature-local] Le latitude sud-ouest ('lat_sw') n'a pas été fournie dans la commande.");
  if (!commande.lon_sw) return Promise.reject("[assistant-temperature-local] Le longitude sud-ouest ('lon_sw') n'a pas été fournie dans la commande.");
  return request({
    'url' : 'https://assistant.kodono.info/temperature-local.php?lat_ne='+commande.lat_ne+'&lon_ne='+commande.lon_ne+'&lat_sw='+commande.lat_sw+'&lon_sw='+commande.lon_sw
  })
  .then(function(response){
    if (response) {
      var body = JSON.parse(response);
      var speak = "La température extérieure est de "+body.temperature+" degré";
      if (_this.plugins.notifier) _this.plugins.notifier.action(speak);
      else {
        console.log("[assistant-temperature-local] ATTENTION: Le plugin 'notifier' n'a pas été installé... le résultat de cette action ne peut donc pas être diffusé sur un appareil et sera seulement inscrit dans cette fenêtre.");
      }
      console.log("[assistant-temperature-local] "+speak);
    } else {
      console.log("[assistant-temperature-local] Erreur lors de l'accès à la ressource...");
      if (_this.plugins.notifier) _this.plugins.notifier.action("L'action a échoué...");
    }
  })
  .catch(function(err) {
    console.log("[assistant-temperature-local] Erreur => ",err)
  })
};

/**
 * Initialisation du plugin
 *
 * @param  {Object} configuration La configuration
 * @param  {Object} plugins Un objet qui contient tous les plugins chargés
 * @return {Promise} resolve(this)
 */
exports.init=function(configuration, plugins) {
  return new AssistantTemperatureLocal(configuration).init(plugins)
  .then(function(resource) {
    console.log("[assistant-temperature-local] Plugin chargé et prêt.");
    return resource;
  })
}
