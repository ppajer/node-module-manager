# node-modules-manager
A lightweight module loader and manager to keep your modules organised and help with lazy-loading.

## How to use

```
//Get an instance of node-modules-manager and hold on to it.
const Manager = new require('node-modules-manager');

//Get the 'path' module if loaded or load if necessary.
//Returns the 'path' module.
Managet.getModule('path');

//Load installed modules by name for later use.
Manager.loadModule('fs');

//Load module by path for later use.
Manager.loadModule('../path/to/module.js');
``` 

### Load modules with an alias

To access your modules by a name different from the module's own name, you can pass an object to the `loadModule` or `getModule` methods. The keys `name` and `path` must be specified on all objects passed this way, and can later be accessed by passing the value of `name` to `getModule()`.

