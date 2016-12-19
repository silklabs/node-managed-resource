const weak = require('weak');

// allocate a resource and free automatically upon GC
class Resource {
  constructor(alloc, free) {
    this.ref = alloc();
    let proxy = weak(this, function () {
      this.release();
    });
    let emitter = weak._getEmitter(proxy);
    emitter.release = () => {
      if (emitter._ref) {
        free(emitter._ref);
        emitter._ref = null;
      }
    };
    emitter._ref = this.ref;
  }
};

module.exports = Resource;
