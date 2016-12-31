# node-modules-manager
A lightweight module loader and manager to keep your modules organised and help with lazy-loading.

## How to use

### Set up a base directory

The module loader requires a base path to be able to handle relative module paths. You can pass the base path as the first parameter of the constructor.

```
const Manager = new require('node-modules-manager')('full/path/to/rootdir');
```

### Load locally installed modules

To load a module installed globally or as dependency, you can simply pass the module's name to the [constructor](#initialize-with-preloaded-modules) `loadModule()` method to load the module for later use, or the `getModule()` method to use the module right away. You can also [pass an object to customize the name you access your modules by](#load-modules-with-an-alias).

```
const Manager = new require('node-modules-manager')('rootdir');

// To load a module for later use. Returns true upon success or false if the module wasn't found.
Manager.loadModule('installedModule');

// To use a module and load it to the modules list. Returns the loaded module for immediate use.
Manager.getModule('fs').readDirSync(/* ... */);
```

### Load modules by path

To load a module by path, you can pass the module's path to the [constructor](#initialize-with-preloaded-modules), `loadModule()` or `getModule()`. The module will then be accessible through either its full path or the filename of the module (the part of the path after the last `/`). You can also [pass an object to customize the name you access your modules by](#load-modules-with-an-alias).

```
const Manager = new require('node-modules-manager')('rootdir');

// Load module by passing full path
Manager.loadModule('path/to/module.js');

// Can later be accessed by calling:
Manager.getModule('path/to/module.js');

//OR
Manager.getModule('module.js');
```

### Initialize with preloaded modules

Sometimes there are some modules you simply cannot delay loading. To avoid making unnecessary calls to `loadModule()`, you can pass an array of module names, paths, or [objects](#load-modules-with-an-alias) to the constructor and the module loader will load them right away.

```
const Manager = new require('node-modules-manager')(
														'rootdir',
														[
															'fs', 
															'path', 
															'path/to/some/module', 
															'other-required-module'
														]
													);
```

### Load modules with an alias

To access your modules by a name different from the module's own name, you can pass an object to the constructor or `loadModule()` methods. The keys `name` and `path` must be specified on all objects passed this way, and can later be accessed by passing the value of `name` to `getModule()`.

```
// Initialize and pass aliased object as module to the constructor
const Manager = new require('node-modules-manager')(
														'rootdir',
														[
															{
																name: 'exampleModule', 
																path:'../path/to/example-module.min.js'
															}
														]
													); // will preload the contents of 'rootdir/path/to/example-module.min.js' as 'exampleModule'

// OR
Manager.loadModule({name: 'exampleModule', path:'../path/to/example-module.min.js'}); // will preload the contents of 'rootdir/path/to/example-module.min.js' as 'exampleModule'

// OR 
Manager.getModule({name: 'exampleModule', path:'../path/to/example-module.min.js'}); // will preload as 'exampleModule' and return the contents of 'rootdir/path/to/example-module.min.js'

// Then sometime later...
Manager.getModule('exampleModule'); //will return the contents of 'rootdir/path/to/example-module.min.js'
```

