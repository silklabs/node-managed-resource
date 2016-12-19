# Managed-Resource
Any object allocated from this class or a class derived from it will
invoke the supplied destructor right before node garbage collects
the object.

The supplied handle is stored in the object (this.ref).

```JavaScript
const Resource = require('managed-resource');

function alloc() {
}

function free(handle) {
  console.log('free!');
}

class Test extends Resource {
  constructor(handle) {
    super(() => handle, (handle) => {
      free(handle);
    });
  }
};

let x = new Test(alloc());
console.log(x.ref);
gc(); // this will print 'free!'
```
