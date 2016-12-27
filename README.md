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

