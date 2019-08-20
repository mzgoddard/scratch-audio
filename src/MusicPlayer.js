const SoundPlayer = require('./SoundPlayer');

class MusicTagSupport {
    constructor () {
        this.ready = false;
        this.waiting = false;
        this.onUserAction = null;
        this.target = null;
        this.audioTag = null;
        this.listeners = new Map();
    }

    _bind (target = document.body) {
        if (this.waiting) return;

        this.waiting = true;

        this.target = target;

        this.audioTag = document.createElement('audio');
        const sourceTag = document.createElement('source');
        this.audioTag.appendChild(sourceTag);

        let frameId = null;
        const tryplay = () => {
            frameId = requestAnimationFrame(tryplay);
            this.audioTag.play();
        };
        frameId = requestAnimationFrame(tryplay);

        const tryclick = () => {
            this.audioTag.play();
        };
        target.addEventListener('click', tryclick);
        target.addEventListener('mousepress', tryclick);
        target.addEventListener('touchdown', tryclick);

        const onplay = () => {
            this.ready = true;
            this.audioTag.removeEventListener('play', onplay);
            cancelAnimationFrame(frameId);
            target.removeEventListener('click', tryclick);
            target.removeEventListener('mousepress', tryclick);
            target.removeEventListener('touchdown', tryclick);

            const listeners = Array.from(this.listeners.values());
            this.listeners.clear();
            for (const onready of listeners) {
                onready();
            }
        };
        this.audioTag.addEventListener('play', onplay);
    }

    play (player, onready) {
        Promise.resolve()
            .then(onready)
            .then(() => {
                this.ready = true;
            })
            .catch(() => {
                this._bind();
                this.listeners.set(player, onready);
            });
    }

    stop (player) {
        this.listeners.remove(player);
    }
}

/**
 * Name of event that indicates playback has ended.
 * @const {string}
 */
const ON_ENDED = 'ended';

class MusicPlayer extends SoundPlayer {
    constructor (...args) {
        super(...args);

        this.audioTag = null;

        if (!MusicPlayer.tagSupport) {
            MusicPlayer.tagSupport = new MusicTagSupport();
        }
    }

    _createSource () {
        if (this.audioTag !== null) {
            this.audioTag.removeEventListener(ON_ENDED, this.handleEvent);
            this.outputNode.disconnect();
        }

        this.audioTag = document.createElement('audio');
        this.audioTag.playbackRate = this.playbackRate;
        this.outputNode = this.audioEngine.audioContext.createMediaElementSource(this.audioTag);

        this.sourceTag = document.createElement('source');
        if (this.sourceTag.srcObject === null) {
            this.sourceTag.srcObject = new Blob([this.buffer], {type: 'audio/mp3'});
        } else {
            this.sourceTag.src = URL.createObjectURL(new Blob([this.buffer], {type: 'audio/mp3'}));
        }
        this.sourceTag.type = 'audio/mp3';
        this.audioTag.appendChild(this.sourceTag);

        this.audioTag.addEventListener(ON_ENDED, this.handleEvent);

        if (this.target !== null) {
            this.connect(this.target);
        }
    }

    take () {
        throw new Error('MusicPlayer.take is not implemented.');
    }

    play () {
        if (this.isStarting) {
            this.emit('stop');
            this.emit('play');
            return;
        }

        if (this.isPlaying) {
            this.stop();
        }

        if (this.initialized) {
            this._createSource();
        } else {
            this.initialize();
        }

        const start = Date.now();
        MusicPlayer.tagSupport.play(this, () => {
            this.audioTag.currentTime = (Date.now() - start) / 1000;
            this.audioTag.play();
            if (this.audioTag.paused) {
                throw new Error();
            }
        });

        this.isPlaying = true;

        const {currentTime, DECAY_DURATION} = this.audioEngine;
        this.startingUntil = currentTime + DECAY_DURATION;

        this.emit('play');
    }

    stop () {
        // TODO: This is an incomplete implementation. It needs to create a copy
        // like with take in SoundPlayer.
        this.stopImmediately();
    }

    stopImmediately () {
        if (!this.isPlaying) {
            return;
        }

        this.audioTag.stop();

        this.isPlaying = false;
        this.startingUntil = 0;

        this.emit('stop');
    }

    setPlaybackRate (value) {
        this.playbackRate = value;

        if (this.initialized) {
            this.audioTag.playbackRate = value;
        }
    }
}

MusicPlayer.tagSupport = null;

module.exports = MusicPlayer;
