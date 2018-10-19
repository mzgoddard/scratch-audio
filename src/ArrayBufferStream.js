const ViewBase = {
    Uint8: 0,
    Uint16: 1,
    Int16: 3,
    Uint32: 5,
    Int32: 9
};

class ArrayBufferStream {
    /**
     * ArrayBufferStream wraps the built-in javascript ArrayBuffer, adding the ability to access
     * data in it like a stream, tracking its position.
     * You can request to read a value from the front of the array, and it will keep track of the position
     * within the byte array, so that successive reads are consecutive.
     * The available types to read include:
     * Uint8, Uint8String, Int16, Uint16, Int32, Uint32
     * @param {ArrayBuffer} arrayBuffer - array to use as a stream
     * @constructor
     */
    constructor (arrayBuffer, start = 0, end = arrayBuffer.byteLength) {
        this.arrayBuffer = arrayBuffer;
        this.start = start;
        this.end = end;
        this._position = this.start;

        this._views = [];
        // this._uint8ArrayView = null;
        // this._uint16ArrayView0 = null;
        // this._int16ArrayView0 = null;
        // this._uint16ArrayView1 = null;
        // this._int16ArrayView1 = null;
        // this._uint32ArrayView0 = null;
        // this._int32ArrayView0 = null;
        // this._uint32ArrayView1 = null;
        // this._int32ArrayView1 = null;
        // this._uint32ArrayView2 = null;
        // this._int32ArrayView2 = null;
        // this._uint32ArrayView3 = null;
        // this._int32ArrayView3 = null;
    }

    /**
     * Return a new ArrayBufferStream that is a slice of the existing one
     * @param  {number} length - the number of bytes of extract
     * @return {ArrayBufferStream} the extracted stream
     */
    extract (length) {
        return new ArrayBufferStream(this.arrayBuffer, this.position, this.position + length);
        const slicedArrayBuffer = this.arrayBuffer.slice(this.position, this.position + length);
        const newStream = new ArrayBufferStream(slicedArrayBuffer);
        return newStream;
    }

    get position () {
        return this._position - this.start;
    }

    set position (value) {
        this._position = value + this.start;
        return value;
    }

    /**
     * @return {number} the length of the stream in bytes
     */
    getLength () {
        return this.end - this.start;
    }

    /**
     * @return {number} the number of bytes available after the current position in the stream
     */
    getBytesAvailable () {
        return this.end - this._position;
    }

    _uint8Array () {
        if (!this._views[ViewBase.Uint8]) {
            this._views[ViewBase.Uint8] = new Uint8Array(this.arrayBuffer);
        }
        return this._views[ViewBase.Uint8];
    }

    /**
     * Read an unsigned 8 bit integer from the stream
     * @return {number} the next 8 bit integer in the stream
     */
    readUint8 () {
        const val = this._uint8Array()[this._position];
        this._position += 1;
        return val;
    }

    /**
     * Read a sequence of bytes of the given length and convert to a string.
     * This is a convenience method for use with short strings.
     * @param {number} length - the number of bytes to convert
     * @return {string} a String made by concatenating the chars in the input
     */
    readUint8String (length) {
        const arr = this._uint8Array();
        let str = '';
        const end = this._position + length;
        for (let i = this._position; i < end; i++) {
            str += String.fromCharCode(arr[i]);
        }
        this._position += length;
        return str;
    }

    _int16Array (offset) {
        if (!this._views[ViewBase.Int16 + offset]) {
            this._views[ViewBase.Int16 + offset] = new Int16Array(this.arrayBuffer, offset);
        }
        return this._views[ViewBase.Int16 + offset];
    }

    /**
     * Read a 16 bit integer from the stream
     * @return {number} the next 16 bit integer in the stream
     */
    readInt16 () {
        const val = this._int16Array(this._position % 2)[(this._position / 2) | 0];
        this._position += 2; // one 16 bit int is 2 bytes
        return val;
    }

    _uint16Array (offset) {
        if (!this._views[ViewBase.Uint16 + offset]) {
            this._views[ViewBase.Uint16 + offset] = new Uint16Array(this.arrayBuffer, offset);
        }
        return this._views[ViewBase.Uint16 + offset];
    }

    /**
     * Read an unsigned 16 bit integer from the stream
     * @return {number} the next unsigned 16 bit integer in the stream
     */
    readUint16 () {
        const val = this._uint16Array(this._position % 2)[(this._position / 2) | 0];
        this._position += 2; // one 16 bit int is 2 bytes
        return val;
    }

    _int32Array (offset) {
        if (!this._views[ViewBase.Int32 + offset]) {
            this._views[ViewBase.Int32 + offset] = new Int32Array(this.arrayBuffer, offset);
        }
        return this._views[ViewBase.Int32 + offset];
    }

    /**
     * Read a 32 bit integer from the stream
     * @return {number} the next 32 bit integer in the stream
     */
    readInt32 () {
        const val = this._int32Array(this._position % 4)[(this._position / 4) | 0];
        this._position += 4; // one 32 bit int is 4 bytes
        return val;
    }

    _uint32Array (offset) {
        if (!this._views[ViewBase.Uint32 + offset]) {
            this._views[ViewBase.Uint32 + offset] = new Uint32Array(this.arrayBuffer, offset);
        }
        return this._views[ViewBase.Uint32 + offset];
    }

    /**
     * Read an unsigned 32 bit integer from the stream
     * @return {number} the next unsigned 32 bit integer in the stream
     */
    readUint32 () {
        const val = this._uint32Array(this._position % 4)[(this._position / 4) | 0];
        this._position += 4; // one 32 bit int is 4 bytes
        return val;
    }
}

module.exports = ArrayBufferStream;
