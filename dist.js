module.exports=function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=23)}([function(t,e,n){function i(){}n(16).mixin(i),i.prototype.write=function(t,e,n){this.emit("item",t,e,n)},i.prototype.end=function(){this.emit("end"),this.removeAllListeners()},i.prototype.pipe=function(t){var e=this;function n(){t.write.apply(t,Array.prototype.slice.call(arguments))}function i(){!t._isStdio&&t.end()}return e.emit("unpipe",t),t.emit("pipe",e),e.on("item",n),e.on("end",i),e.when("unpipe",function(r){var o=r===t||void 0===r;return o&&(e.removeListener("item",n),e.removeListener("end",i),t.emit("unpipe")),o}),t},i.prototype.unpipe=function(t){return this.emit("unpipe",t),this},i.prototype.format=function(t){throw new Error(["Warning: .format() is deprecated in Minilog v2! Use .pipe() instead. For example:","var Minilog = require('minilog');","Minilog","  .pipe(Minilog.backends.console.formatClean)","  .pipe(Minilog.backends.console);"].join("\n"))},i.mixin=function(t){var e,n=i.prototype;for(e in n)n.hasOwnProperty(e)&&(t.prototype[e]=n[e])},t.exports=i},function(t,e,n){"use strict";var i=n(18);i.enable(),t.exports=i("scratch-audioengine")},function(t,e){var n={black:"#000",red:"#c23621",green:"#25bc26",yellow:"#bbbb00",blue:"#492ee1",magenta:"#d338d3",cyan:"#33bbc8",gray:"#808080",purple:"#708"};t.exports=function(t,e){return e?"color: #fff; background: "+n[t]+";":"color: "+n[t]+";"}},function(t,e,n){"use strict";var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var r=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.arrayBuffer=e,this.position=0}return i(t,[{key:"extract",value:function(e){return new t(this.arrayBuffer.slice(this.position,this.position+e))}},{key:"getLength",value:function(){return this.arrayBuffer.byteLength}},{key:"getBytesAvailable",value:function(){return this.arrayBuffer.byteLength-this.position}},{key:"readUint8",value:function(){var t=new Uint8Array(this.arrayBuffer,this.position,1)[0];return this.position+=1,t}},{key:"readUint8String",value:function(t){var e=new Uint8Array(this.arrayBuffer,this.position,t);this.position+=t;for(var n="",i=0;i<e.length;i++)n+=String.fromCharCode(e[i]);return n}},{key:"readInt16",value:function(){var t=new Int16Array(this.arrayBuffer,this.position,1)[0];return this.position+=2,t}},{key:"readUint16",value:function(){var t=new Uint16Array(this.arrayBuffer,this.position,1)[0];return this.position+=2,t}},{key:"readInt32",value:function(){var t=new Int32Array(this.arrayBuffer,this.position,1)[0];return this.position+=4,t}},{key:"readUint32",value:function(){var t=new Uint32Array(this.arrayBuffer,this.position,1)[0];return this.position+=4,t}}]),t}();t.exports=r},function(t,e,n){"use strict";var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var r=n(3),o=n(1),a=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.audioContext=e}return i(t,[{key:"decode",value:function(t){var e=this;return new Promise(function(n,i){var a=new r(t);"RIFF"!==a.readUint8String(4)&&(o.warn("incorrect adpcm wav header"),i());var u=a.readInt32();u+8!==t.byteLength&&o.warn("adpcm wav length in header: "+u+" is incorrect"),"WAVE"!==a.readUint8String(4)&&(o.warn("incorrect adpcm wav header"),i());var s=e.extractChunk("fmt ",a);e.encoding=s.readUint16(),e.channels=s.readUint16(),e.samplesPerSecond=s.readUint32(),e.bytesPerSecond=s.readUint32(),e.blockAlignment=s.readUint16(),e.bitsPerSample=s.readUint16(),s.position+=2,e.samplesPerBlock=s.readUint16(),e.adpcmBlockSize=(e.samplesPerBlock-1)/2+4;for(var c=e.imaDecompress(e.extractChunk("data",a),e.adpcmBlockSize),f=e.audioContext.createBuffer(1,c.length,e.samplesPerSecond),l=0;l<c.length;l++)f.getChannelData(0)[l]=c[l]/32768;n(f)})}},{key:"extractChunk",value:function(t,e){for(e.position=12;e.position<e.getLength()-8;){var n=e.readUint8String(4),i=e.readInt32();if(n===t)return e.extract(i);e.position+=i}}},{key:"imaDecompress",value:function(e,n){var i=void 0,r=void 0,o=void 0,a=void 0,u=0,s=-1,c=[];if(!e)return c;for(e.position=0;;)if(e.position%n==0&&s<0){if(0===e.getBytesAvailable())break;i=e.readInt16(),u=e.readUint8(),e.position++,u>88&&(u=88),c.push(i)}else{if(s<0){if(0===e.getBytesAvailable())break;o=15&(s=e.readUint8())}else o=s>>4&15,s=-1;r=t.STEP_TABLE[u],a=0,4&o&&(a+=r),2&o&&(a+=r>>1),1&o&&(a+=r>>2),a+=r>>3,(u+=t.INDEX_TABLE[o])>88&&(u=88),u<0&&(u=0),(i+=8&o?-a:a)>32767&&(i=32767),i<-32768&&(i=-32768),c.push(i)}return Int16Array.from(c)}}],[{key:"STEP_TABLE",get:function(){return[7,8,9,10,11,12,13,14,16,17,19,21,23,25,28,31,34,37,41,45,50,55,60,66,73,80,88,97,107,118,130,143,157,173,190,209,230,253,279,307,337,371,408,449,494,544,598,658,724,796,876,963,1060,1166,1282,1411,1552,1707,1878,2066,2272,2499,2749,3024,3327,3660,4026,4428,4871,5358,5894,6484,7132,7845,8630,9493,10442,11487,12635,13899,15289,16818,18500,20350,22385,24623,27086,29794,32767]}},{key:"INDEX_TABLE",get:function(){return[-1,-1,-1,-1,2,4,6,8,-1,-1,-1,-1,2,4,6,8]}}]),t}();t.exports=a},function(t,e,n){"use strict";var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var r=n(1),o=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.audioContext=e,this.outputNode=null,this.buffer=null,this.bufferSource=null,this.playbackRate=1,this.isPlaying=!1}return i(t,[{key:"connect",value:function(t){this.outputNode=t}},{key:"setBuffer",value:function(t){this.buffer=t}},{key:"setPlaybackRate",value:function(t){this.playbackRate=t,this.bufferSource&&this.bufferSource.playbackRate&&(this.bufferSource.playbackRate.value=this.playbackRate)}},{key:"stop",value:function(){this.bufferSource&&this.isPlaying&&this.bufferSource.stop(),this.isPlaying=!1}},{key:"start",value:function(){this.buffer?(this.bufferSource=this.audioContext.createBufferSource(),this.bufferSource.buffer=this.buffer,this.bufferSource.playbackRate.value=this.playbackRate,this.bufferSource.connect(this.outputNode),this.bufferSource.start(),this.isPlaying=!0):r.warn("tried to play a sound that was not loaded yet")}},{key:"finished",value:function(){var t=this;return new Promise(function(e){t.bufferSource.onended=function(){t.isPlaying=!1,e()}})}}]),t}();t.exports=o},function(t,e,n){"use strict";var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var r=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.audioEngine=e,this.audioContext=this.audioEngine.audioContext,this.value=0,this.input=this.audioContext.createGain(),this.leftGain=this.audioContext.createGain(),this.rightGain=this.audioContext.createGain(),this.channelMerger=this.audioContext.createChannelMerger(2),this.input.connect(this.leftGain),this.input.connect(this.rightGain),this.leftGain.connect(this.channelMerger,0,0),this.rightGain.connect(this.channelMerger,0,1),this.set(this.value)}return i(t,[{key:"set",value:function(t){this.value=t;var e=(t+100)/200,n=Math.cos(e*Math.PI/2),i=Math.sin(e*Math.PI/2);this.leftGain.gain.setTargetAtTime(n,0,this.audioEngine.DECAY_TIME),this.rightGain.gain.setTargetAtTime(i,0,this.audioEngine.DECAY_TIME)}},{key:"connect",value:function(t){this.channelMerger.connect(t)}},{key:"dispose",value:function(){this.input.disconnect(),this.leftGain.disconnect(),this.rightGain.disconnect(),this.channelMerger.disconnect()}}]),t}();t.exports=r},function(t,e,n){"use strict";var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var r=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.value=0,this.ratio=1}return i(t,[{key:"set",value:function(t,e){this.value=t,this.ratio=this.getRatio(this.value),this.updatePlayers(e)}},{key:"changeBy",value:function(t,e){this.set(this.value+t,e)}},{key:"getRatio",value:function(t){var e=t/10;return Math.pow(2,e/12)}},{key:"updatePlayer",value:function(t){t.setPlaybackRate(this.ratio)}},{key:"updatePlayers",value:function(t){if(t)for(var e in t)t.hasOwnProperty(e)&&this.updatePlayer(t[e])}}]),t}();t.exports=r},function(t,e,n){"use strict";var i="!#%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";t.exports=function(){for(var t=i.length,e=[],n=0;n<20;n++)e[n]=i.charAt(Math.random()*t);return e.join("")}},function(t,e,n){var i=n(0),r=(new Date).valueOf().toString(36);function o(t){this.url=t.url||"",this.cache=[],this.timer=null,this.interval=t.interval||3e4,this.enabled=!0,this.jQuery=window.jQuery,this.extras={}}i.mixin(o),o.prototype.write=function(t,e,n){this.timer||this.init(),this.cache.push([t,e].concat(n))},o.prototype.init=function(){if(this.enabled&&this.jQuery){var t=this;this.timer=setTimeout(function(){var e,n,i=[],o=t.url;if(0==t.cache.length)return t.init();for(e=0;e<t.cache.length;e++)try{JSON.stringify(t.cache[e]),i.push(t.cache[e])}catch(t){}t.jQuery.isEmptyObject(t.extras)?(n=JSON.stringify({logs:i}),o=t.url+"?client_id="+r):n=JSON.stringify(t.jQuery.extend({logs:i},t.extras)),t.jQuery.ajax(o,{type:"POST",cache:!1,processData:!1,data:n,contentType:"application/json",timeout:1e4}).success(function(e,n,i){e.interval&&(t.interval=Math.max(1e3,e.interval))}).error(function(){t.interval=3e4}).always(function(){t.init()}),t.cache=[]},this.interval)}},o.prototype.end=function(){},o.jQueryWait=function(t){if("undefined"!=typeof window&&(window.jQuery||window.$))return t(window.jQuery||window.$);"undefined"!=typeof window&&setTimeout(function(){o.jQueryWait(t)},200)},t.exports=o},function(t,e,n){var i=!1,r=new(n(0));r.write=function(t,e,n){if("undefined"!=typeof window&&"undefined"!=typeof JSON&&JSON.stringify&&JSON.parse)try{i||(i=window.localStorage.minilog?JSON.parse(window.localStorage.minilog):[]),i.push([(new Date).toString(),t,e,n]),window.localStorage.minilog=JSON.stringify(i)}catch(t){}},t.exports=r},function(t,e,n){var i=[],r=new(n(0));r.write=function(t,e,n){i.push([t,e,n])},r.get=function(){return i},r.empty=function(){i=[]},t.exports=r},function(t,e,n){var i=n(0),r=n(2),o={debug:["gray"],info:["purple"],warn:["yellow",!0],error:["red",!0]},a=new i;a.write=function(t,e,n){var i=console.log;"debug"!=e&&console[e]&&(i=console[e]);var a=0;if("info"!=e){for(;a<n.length&&"string"==typeof n[a];a++);i.apply(console,["%c"+t+" "+n.slice(0,a).join(" "),r.apply(r,o[e])].concat(n.slice(a)))}else i.apply(console,["%c"+t,r.apply(r,o[e])].concat(n))},a.pipe=function(){},t.exports=a},function(t,e,n){var i=n(0),r=n(2),o={debug:["cyan"],info:["purple"],warn:["yellow",!0],error:["red",!0]},a=new i;a.write=function(t,e,n){console.log;console[e]&&console[e].apply&&console[e].apply(console,["%c"+t+" %c"+e,r("gray"),r.apply(r,o[e])].concat(n))},a.pipe=function(){},t.exports=a},function(t,e,n){var i=/\n+$/,r=new(n(0));r.write=function(t,e,n){var r=n.length-1;if("undefined"!=typeof console&&console.log){if(console.log.apply)return console.log.apply(console,[t,e].concat(n));if(JSON&&JSON.stringify){n[r]&&"string"==typeof n[r]&&(n[r]=n[r].replace(i,""));try{for(r=0;r<n.length;r++)n[r]=JSON.stringify(n[r])}catch(t){}console.log(n.join(" "))}}},r.formatters=["color","minilog"],r.color=n(13),r.minilog=n(12),t.exports=r},function(t,e,n){var i={debug:1,info:2,warn:3,error:4};function r(){this.enabled=!0,this.defaultResult=!0,this.clear()}function o(t,e){return t.n.test?t.n.test(e):t.n==e}n(0).mixin(r),r.prototype.allow=function(t,e){return this._white.push({n:t,l:i[e]}),this},r.prototype.deny=function(t,e){return this._black.push({n:t,l:i[e]}),this},r.prototype.clear=function(){return this._white=[],this._black=[],this},r.prototype.test=function(t,e){var n,r=Math.max(this._white.length,this._black.length);for(n=0;n<r;n++){if(this._white[n]&&o(this._white[n],t)&&i[e]>=this._white[n].l)return!0;if(this._black[n]&&o(this._black[n],t)&&i[e]<=this._black[n].l)return!1}return this.defaultResult},r.prototype.write=function(t,e,n){if(!this.enabled||this.test(t,e))return this.emit("item",t,e,n)},t.exports=r},function(t,e){function n(){this._events={}}n.prototype={on:function(t,e){this._events||(this._events={});var n=this._events;return(n[t]||(n[t]=[])).push(e),this},removeListener:function(t,e){var n,i=this._events[t]||[];for(n=i.length-1;n>=0&&i[n];n--)i[n]!==e&&i[n].cb!==e||i.splice(n,1)},removeAllListeners:function(t){t?this._events[t]&&(this._events[t]=[]):this._events={}},listeners:function(t){return this._events&&this._events[t]||[]},emit:function(t){this._events||(this._events={});var e,n=Array.prototype.slice.call(arguments,1),i=this._events[t]||[];for(e=i.length-1;e>=0&&i[e];e--)i[e].apply(this,n);return this},when:function(t,e){return this.once(t,e,!0)},once:function(t,e,n){if(!e)return this;function i(){n||this.removeListener(t,i),e.apply(this,arguments)&&n&&this.removeListener(t,i)}return i.cb=e,this.on(t,i),this}},n.mixin=function(t){var e,i=n.prototype;for(e in i)i.hasOwnProperty(e)&&(t.prototype[e]=i[e])},t.exports=n},function(t,e,n){var i=n(0),r=n(15),o=new i,a=Array.prototype.slice;(e=t.exports=function(t){var n=function(){return o.write(t,void 0,a.call(arguments)),n};return n.debug=function(){return o.write(t,"debug",a.call(arguments)),n},n.info=function(){return o.write(t,"info",a.call(arguments)),n},n.warn=function(){return o.write(t,"warn",a.call(arguments)),n},n.error=function(){return o.write(t,"error",a.call(arguments)),n},n.log=n.debug,n.suggest=e.suggest,n.format=o.format,n}).defaultBackend=e.defaultFormatter=null,e.pipe=function(t){return o.pipe(t)},e.end=e.unpipe=e.disable=function(t){return o.unpipe(t)},e.Transform=i,e.Filter=r,e.suggest=new r,e.enable=function(){return e.defaultFormatter?o.pipe(e.suggest).pipe(e.defaultFormatter).pipe(e.defaultBackend):o.pipe(e.suggest).pipe(e.defaultBackend)}},function(t,e,n){var i=n(17),r=i.enable,o=i.disable,a="undefined"!=typeof navigator&&/chrome/i.test(navigator.userAgent),u=n(14);if(i.defaultBackend=a?u.minilog:u,"undefined"!=typeof window){try{i.enable(JSON.parse(window.localStorage.minilogSettings))}catch(t){}if(window.location&&window.location.search){var s=RegExp("[?&]minilog=([^&]*)").exec(window.location.search);s&&i.enable(decodeURIComponent(s[1]))}}i.enable=function(){r.call(i,!0);try{window.localStorage.minilogSettings=JSON.stringify(!0)}catch(t){}return this},i.disable=function(){o.call(i);try{delete window.localStorage.minilogSettings}catch(t){}return this},(t.exports=i).backends={array:n(11),browser:i.defaultBackend,localStorage:n(10),jQuery:n(9)}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){(function(e){var n;n="undefined"!=typeof window?window:void 0!==e?e:"undefined"!=typeof self?self:{},t.exports=n}).call(this,n(19))},function(t,e,n){"use strict";var i=n(20),r=i.OfflineAudioContext||i.webkitOfflineAudioContext,o=i.AudioContext||i.webkitAudioContext,a={};t.exports=function(t){if(!o)return null;"number"==typeof t&&(t={sampleRate:t});var e=t&&t.sampleRate;if(t&&t.offline)return r?new r(t.channels||2,t.length,e||44100):null;var n=a[e];if(n)return n;try{n=new o(t)}catch(t){n=new o}return a[n.sampleRate]=a[e]=n,n}},function(t,e,n){var i,r,o;
/**
 *  StartAudioContext.js
 *  @author Yotam Mann
 *  @license http://opensource.org/licenses/MIT MIT License
 *  @copyright 2016 Yotam Mann
 */r=[],void 0===(o="function"==typeof(i=function(){var t=function(t,e){this._dragged=!1,this._element=t,this._bindedMove=this._moved.bind(this),this._bindedEnd=this._ended.bind(this,e),t.addEventListener("touchstart",this._bindedEnd),t.addEventListener("touchmove",this._bindedMove),t.addEventListener("touchend",this._bindedEnd),t.addEventListener("mouseup",this._bindedEnd)};function e(t){return"running"===t.state}return t.prototype._moved=function(t){this._dragged=!0},t.prototype._ended=function(t){this._dragged||function(t){var e=t.createBuffer(1,1,t.sampleRate),n=t.createBufferSource();n.buffer=e,n.connect(t.destination),n.start(0),t.resume&&t.resume()}(t),this._dragged=!1},t.prototype.dispose=function(){this._element.removeEventListener("touchstart",this._bindedEnd),this._element.removeEventListener("touchmove",this._bindedMove),this._element.removeEventListener("touchend",this._bindedEnd),this._element.removeEventListener("mouseup",this._bindedEnd),this._bindedMove=null,this._bindedEnd=null,this._element=null},function(n,i,r){var o=new Promise(function(t){!function(t,n){e(t)?n():function i(){e(t)?n():(requestAnimationFrame(i),t.resume&&t.resume())}()}(n,t)}),a=[];return i||(i=document.body),function e(n,i,r){if(Array.isArray(n)||NodeList&&n instanceof NodeList)for(var o=0;o<n.length;o++)e(n[o],i,r);else if("string"==typeof n)e(document.querySelectorAll(n),i,r);else if(n.jquery&&"function"==typeof n.toArray)e(n.toArray(),i,r);else if(Element&&n instanceof Element){var a=new t(n,r);i.push(a)}}(i,a,n),o.then(function(){for(var t=0;t<a.length;t++)a[t].dispose();a=null,r&&r()}),o}})?i.apply(e,r):i)||(t.exports=o)},function(t,e,n){"use strict";var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=n(22),a=n(21),u=n(1),s=n(8),c=n(7),f=n(6),l=n(5),h=n(4),d=function(){function t(e){r(this,t),this.audioEngine=e,this.pitchEffect=new c,this.panEffect=new f(this.audioEngine),this.effectsNode=this.audioEngine.audioContext.createGain(),this.effectsNode.connect(this.panEffect.input),this.panEffect.connect(this.audioEngine.input),this.clearEffects(),this.activeSoundPlayers={}}return i(t,[{key:"getInputNode",value:function(){return this.effectsNode}},{key:"playSound",value:function(t){if(this.audioEngine.audioBuffers[t]){this.activeSoundPlayers[t]&&this.activeSoundPlayers[t].stop();var e=new l(this.audioEngine.audioContext);for(var n in e.setBuffer(this.audioEngine.audioBuffers[t]),e.connect(this.effectsNode),this.pitchEffect.updatePlayer(e),e.start(),this.activeSoundPlayers[t]=e,this.activeSoundPlayers)this.activeSoundPlayers.hasOwnProperty(n)&&(this.activeSoundPlayers[n].isPlaying||delete this.activeSoundPlayers[n]);return e.finished()}}},{key:"stopAllSounds",value:function(){for(var t in this.activeSoundPlayers)this.activeSoundPlayers[t].stop()}},{key:"setEffect",value:function(t,e){switch(t){case this.audioEngine.EFFECT_NAMES.pitch:this.pitchEffect.set(e,this.activeSoundPlayers);break;case this.audioEngine.EFFECT_NAMES.pan:this.panEffect.set(e)}}},{key:"clearEffects",value:function(){this.panEffect.set(0),this.pitchEffect.set(0,this.activeSoundPlayers),null!==this.audioEngine&&this.effectsNode.gain.setTargetAtTime(1,0,this.audioEngine.DECAY_TIME)}},{key:"setVolume",value:function(t){null!==this.audioEngine&&this.effectsNode.gain.setTargetAtTime(t/100,0,this.audioEngine.DECAY_TIME)}},{key:"dispose",value:function(){this.panEffect.dispose(),this.effectsNode.disconnect()}}]),t}(),p=function(){function t(){r(this,t),this.audioContext=new a,o(this.audioContext),this.input=this.audioContext.createGain(),this.input.connect(this.audioContext.destination),this.audioBuffers={},this.mic=null}return i(t,[{key:"decodeSound",value:function(t){var e,n,i=this,r=t.data.buffer.slice(0),o=s(),a=this.updateSoundBuffer.bind(this,o);return(e=this.audioContext,n=r,1===e.decodeAudioData.length?e.decodeAudioData(n):new Promise(function(t,i){e.decodeAudioData(n,function(e){return t(e)},function(t){return i(t)})})).then(a,function(){var e=t.data.buffer.slice(0);return new h(i.audioContext).decode(e).then(a,function(t){u.warn("audio data could not be decoded",t)})})}},{key:"getSoundBuffer",value:function(t){return this.audioBuffers[t]}},{key:"updateSoundBuffer",value:function(t,e){return this.audioBuffers[t]=e,t}},{key:"loadSounds",value:function(){u.warn("The loadSounds function is no longer available. Please use Scratch Storage.")}},{key:"getLoudness",value:function(){var t=this;if(this.mic||this.connectingToMic||(this.connectingToMic=!0,navigator.mediaDevices.getUserMedia({audio:!0}).then(function(e){t.audioStream=e,t.mic=t.audioContext.createMediaStreamSource(e),t.analyser=t.audioContext.createAnalyser(),t.mic.connect(t.analyser),t.micDataArray=new Float32Array(t.analyser.fftSize)}).catch(function(t){u.warn(t)})),this.mic&&this.audioStream.active){this.analyser.getFloatTimeDomainData(this.micDataArray);for(var e=0,n=0;n<this.micDataArray.length;n++)e+=Math.pow(this.micDataArray[n],2);var i=Math.sqrt(e/this.micDataArray.length);return this._lastValue&&(i=Math.max(i,.6*this._lastValue)),this._lastValue=i,i*=1.63,i=Math.sqrt(i),i=Math.round(100*i),i=Math.min(i,100)}return-1}},{key:"createPlayer",value:function(){return new d(this)}},{key:"EFFECT_NAMES",get:function(){return{pitch:"pitch",pan:"pan"}}},{key:"DECAY_TIME",get:function(){return.001}}]),t}();t.exports=p}]);
//# sourceMappingURL=dist.js.map