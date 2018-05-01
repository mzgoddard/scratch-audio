module.exports=function(t){var e={};function n(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=10)}([function(t,e,n){"use strict";var i=n(7);i.enable(),t.exports=i("scratch-audioengine")},function(t,e,n){"use strict";var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var a=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.arrayBuffer=e,this.position=0}return i(t,[{key:"extract",value:function(e){return new t(this.arrayBuffer.slice(this.position,this.position+e))}},{key:"getLength",value:function(){return this.arrayBuffer.byteLength}},{key:"getBytesAvailable",value:function(){return this.arrayBuffer.byteLength-this.position}},{key:"readUint8",value:function(){var t=new Uint8Array(this.arrayBuffer,this.position,1)[0];return this.position+=1,t}},{key:"readUint8String",value:function(t){var e=new Uint8Array(this.arrayBuffer,this.position,t);this.position+=t;for(var n="",i=0;i<e.length;i++)n+=String.fromCharCode(e[i]);return n}},{key:"readInt16",value:function(){var t=new Int16Array(this.arrayBuffer,this.position,1)[0];return this.position+=2,t}},{key:"readUint16",value:function(){var t=new Uint16Array(this.arrayBuffer,this.position,1)[0];return this.position+=2,t}},{key:"readInt32",value:function(){var t=new Int32Array(this.arrayBuffer,this.position,1)[0];return this.position+=4,t}},{key:"readUint32",value:function(){var t=new Uint32Array(this.arrayBuffer,this.position,1)[0];return this.position+=4,t}}]),t}();t.exports=a},function(t,e,n){"use strict";var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var a=n(1),r=n(0),o=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.audioContext=e}return i(t,[{key:"decode",value:function(t){var e=this;return new Promise(function(n,i){var o=new a(t);"RIFF"!==o.readUint8String(4)&&(r.warn("incorrect adpcm wav header"),i());var u=o.readInt32();u+8!==t.byteLength&&r.warn("adpcm wav length in header: "+u+" is incorrect"),"WAVE"!==o.readUint8String(4)&&(r.warn("incorrect adpcm wav header"),i());var s=e.extractChunk("fmt ",o);e.encoding=s.readUint16(),e.channels=s.readUint16(),e.samplesPerSecond=s.readUint32(),e.bytesPerSecond=s.readUint32(),e.blockAlignment=s.readUint16(),e.bitsPerSample=s.readUint16(),s.position+=2,e.samplesPerBlock=s.readUint16(),e.adpcmBlockSize=(e.samplesPerBlock-1)/2+4;for(var c=e.imaDecompress(e.extractChunk("data",o),e.adpcmBlockSize),f=e.audioContext.createBuffer(1,c.length,e.samplesPerSecond),h=0;h<c.length;h++)f.getChannelData(0)[h]=c[h]/32768;n(f)})}},{key:"extractChunk",value:function(t,e){for(e.position=12;e.position<e.getLength()-8;){var n=e.readUint8String(4),i=e.readInt32();if(n===t)return e.extract(i);e.position+=i}}},{key:"imaDecompress",value:function(e,n){var i=void 0,a=void 0,r=void 0,o=void 0,u=0,s=-1,c=[];if(!e)return c;for(e.position=0;;)if(e.position%n==0&&s<0){if(0===e.getBytesAvailable())break;i=e.readInt16(),u=e.readUint8(),e.position++,u>88&&(u=88),c.push(i)}else{if(s<0){if(0===e.getBytesAvailable())break;r=15&(s=e.readUint8())}else r=s>>4&15,s=-1;a=t.STEP_TABLE[u],o=0,4&r&&(o+=a),2&r&&(o+=a>>1),1&r&&(o+=a>>2),o+=a>>3,(u+=t.INDEX_TABLE[r])>88&&(u=88),u<0&&(u=0),(i+=8&r?-o:o)>32767&&(i=32767),i<-32768&&(i=-32768),c.push(i)}return Int16Array.from(c)}}],[{key:"STEP_TABLE",get:function(){return[7,8,9,10,11,12,13,14,16,17,19,21,23,25,28,31,34,37,41,45,50,55,60,66,73,80,88,97,107,118,130,143,157,173,190,209,230,253,279,307,337,371,408,449,494,544,598,658,724,796,876,963,1060,1166,1282,1411,1552,1707,1878,2066,2272,2499,2749,3024,3327,3660,4026,4428,4871,5358,5894,6484,7132,7845,8630,9493,10442,11487,12635,13899,15289,16818,18500,20350,22385,24623,27086,29794,32767]}},{key:"INDEX_TABLE",get:function(){return[-1,-1,-1,-1,2,4,6,8,-1,-1,-1,-1,2,4,6,8]}}]),t}();t.exports=o},function(t,e,n){"use strict";var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var a=n(0),r=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.audioContext=e,this.outputNode=null,this.buffer=null,this.bufferSource=null,this.playbackRate=1,this.isPlaying=!1}return i(t,[{key:"connect",value:function(t){this.outputNode=t}},{key:"setBuffer",value:function(t){this.buffer=t}},{key:"setPlaybackRate",value:function(t){this.playbackRate=t,this.bufferSource&&this.bufferSource.playbackRate&&(this.bufferSource.playbackRate.value=this.playbackRate)}},{key:"stop",value:function(){this.bufferSource&&this.isPlaying&&this.bufferSource.stop(),this.isPlaying=!1}},{key:"start",value:function(){this.buffer?(this.bufferSource=this.audioContext.createBufferSource(),this.bufferSource.buffer=this.buffer,this.bufferSource.playbackRate.value=this.playbackRate,this.bufferSource.connect(this.outputNode),this.bufferSource.start(),this.isPlaying=!0):a.warn("tried to play a sound that was not loaded yet")}},{key:"finished",value:function(){var t=this;return new Promise(function(e){t.bufferSource.onended=function(){t.isPlaying=!1,e()}})}}]),t}();t.exports=r},function(t,e,n){"use strict";var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var a=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.audioEngine=e,this.audioContext=this.audioEngine.audioContext,this.value=0,this.input=this.audioContext.createGain(),this.leftGain=this.audioContext.createGain(),this.rightGain=this.audioContext.createGain(),this.channelMerger=this.audioContext.createChannelMerger(2),this.input.connect(this.leftGain),this.input.connect(this.rightGain),this.leftGain.connect(this.channelMerger,0,0),this.rightGain.connect(this.channelMerger,0,1),this.set(this.value)}return i(t,[{key:"set",value:function(t){this.value=t;var e=(t+100)/200,n=Math.cos(e*Math.PI/2),i=Math.sin(e*Math.PI/2);this.leftGain.gain.setTargetAtTime(n,0,this.audioEngine.DECAY_TIME),this.rightGain.gain.setTargetAtTime(i,0,this.audioEngine.DECAY_TIME)}},{key:"connect",value:function(t){this.channelMerger.connect(t)}},{key:"dispose",value:function(){this.input.disconnect(),this.leftGain.disconnect(),this.rightGain.disconnect(),this.channelMerger.disconnect()}}]),t}();t.exports=a},function(t,e,n){"use strict";var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var a=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.value=0,this.ratio=1}return i(t,[{key:"set",value:function(t,e){this.value=t,this.ratio=this.getRatio(this.value),this.updatePlayers(e)}},{key:"changeBy",value:function(t,e){this.set(this.value+t,e)}},{key:"getRatio",value:function(t){var e=t/10;return Math.pow(2,e/12)}},{key:"updatePlayer",value:function(t){t.setPlaybackRate(this.ratio)}},{key:"updatePlayers",value:function(t){if(t)for(var e in t)t.hasOwnProperty(e)&&this.updatePlayer(t[e])}}]),t}();t.exports=a},function(t,e,n){"use strict";var i="!#%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";t.exports=function(){for(var t=i.length,e=[],n=0;n<20;n++)e[n]=i.charAt(Math.random()*t);return e.join("")}},function(t,e){t.exports=require("minilog")},function(t,e){t.exports=require("audio-context")},function(t,e){t.exports=require("startaudiocontext")},function(t,e,n){"use strict";var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=n(9),o=n(8),u=n(0),s=n(6),c=n(5),f=n(4),h=n(3),l=n(2),d=function(){function t(e){a(this,t),this.audioEngine=e,this.pitchEffect=new c,this.panEffect=new f(this.audioEngine),this.effectsNode=this.audioEngine.audioContext.createGain(),this.effectsNode.connect(this.panEffect.input),this.panEffect.connect(this.audioEngine.input),this.clearEffects(),this.activeSoundPlayers={}}return i(t,[{key:"getInputNode",value:function(){return this.effectsNode}},{key:"playSound",value:function(t){if(this.audioEngine.audioBuffers[t]){this.activeSoundPlayers[t]&&this.activeSoundPlayers[t].stop();var e=new h(this.audioEngine.audioContext);for(var n in e.setBuffer(this.audioEngine.audioBuffers[t]),e.connect(this.effectsNode),this.pitchEffect.updatePlayer(e),e.start(),this.activeSoundPlayers[t]=e,this.activeSoundPlayers)this.activeSoundPlayers.hasOwnProperty(n)&&(this.activeSoundPlayers[n].isPlaying||delete this.activeSoundPlayers[n]);return e.finished()}}},{key:"stopAllSounds",value:function(){for(var t in this.activeSoundPlayers)this.activeSoundPlayers[t].stop()}},{key:"setEffect",value:function(t,e){switch(t){case this.audioEngine.EFFECT_NAMES.pitch:this.pitchEffect.set(e,this.activeSoundPlayers);break;case this.audioEngine.EFFECT_NAMES.pan:this.panEffect.set(e)}}},{key:"clearEffects",value:function(){this.panEffect.set(0),this.pitchEffect.set(0,this.activeSoundPlayers),null!==this.audioEngine&&this.effectsNode.gain.setTargetAtTime(1,0,this.audioEngine.DECAY_TIME)}},{key:"setVolume",value:function(t){null!==this.audioEngine&&this.effectsNode.gain.setTargetAtTime(t/100,0,this.audioEngine.DECAY_TIME)}},{key:"dispose",value:function(){this.panEffect.dispose(),this.effectsNode.disconnect()}}]),t}(),y=function(){function t(){a(this,t),this.audioContext=new o,r(this.audioContext),this.input=this.audioContext.createGain(),this.input.connect(this.audioContext.destination),this.audioBuffers={},this.mic=null}return i(t,[{key:"decodeSound",value:function(t){var e,n,i=this,a=t.data.buffer.slice(0),r=s(),o=this.updateSoundBuffer.bind(this,r);return(e=this.audioContext,n=a,1===e.decodeAudioData.length?e.decodeAudioData(n):new Promise(function(t,i){e.decodeAudioData(n,function(e){return t(e)},function(t){return i(t)})})).then(o,function(){var e=t.data.buffer.slice(0);return new l(i.audioContext).decode(e).then(o,function(t){u.warn("audio data could not be decoded",t)})})}},{key:"getSoundBuffer",value:function(t){return this.audioBuffers[t]}},{key:"updateSoundBuffer",value:function(t,e){return this.audioBuffers[t]=e,t}},{key:"loadSounds",value:function(){u.warn("The loadSounds function is no longer available. Please use Scratch Storage.")}},{key:"getLoudness",value:function(){var t=this;if(this.mic||this.connectingToMic||(this.connectingToMic=!0,navigator.mediaDevices.getUserMedia({audio:!0}).then(function(e){t.audioStream=e,t.mic=t.audioContext.createMediaStreamSource(e),t.analyser=t.audioContext.createAnalyser(),t.mic.connect(t.analyser),t.micDataArray=new Float32Array(t.analyser.fftSize)}).catch(function(t){u.warn(t)})),this.mic&&this.audioStream.active){this.analyser.getFloatTimeDomainData(this.micDataArray);for(var e=0,n=0;n<this.micDataArray.length;n++)e+=Math.pow(this.micDataArray[n],2);var i=Math.sqrt(e/this.micDataArray.length);return this._lastValue&&(i=Math.max(i,.6*this._lastValue)),this._lastValue=i,i*=1.63,i=Math.sqrt(i),i=Math.round(100*i),i=Math.min(i,100)}return-1}},{key:"createPlayer",value:function(){return new d(this)}},{key:"EFFECT_NAMES",get:function(){return{pitch:"pitch",pan:"pan"}}},{key:"DECAY_TIME",get:function(){return.001}}]),t}();t.exports=y}]);
//# sourceMappingURL=dist.js.map