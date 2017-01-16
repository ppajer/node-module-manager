function ModuleLoader(baseDir, initialModules) {

	this.init = function(baseDir, initialModules) {

		this.baseDir 		= baseDir || '';
		this.modulesLoaded 	= {};

		if (initialModules && initialModules.length) {

			initialModules.forEach(this.loadModule.bind(this));
		};
	}

	this.getModule = function(module) {

 		var moduleName = this.getModuleName(module);
		
		if (this.isModuleLoaded(moduleName)) {

			return this.modulesLoaded[moduleName];

		} else {

			return this.loadModule(module);
		}	
	}

	this.getModuleOnce = function(module, callback) {

		var moduleName = this.getModuleName(module);

		if (this.isModuleLoaded(module)) {

			console.warn('Module '+module+' is aleady loaded. Call ModuleLoader.unloadModule to avoid keeping it in memory.');
			callback(this.modulesLoaded[moduleName]);

		} else {

			callback(this.loadModule(module));
			this.unloadModule(module);
		}
	}

	this.loadModule = function(module) {

		var moduleName = this.getModuleName(module),
			modulePath;

		if (typeof module === "object") {

			modulePath = this.isModulePath(module.path) ? require('path').resolve(this.baseDir, module.path) : module.path;
		
		} else {

			modulePath = this.isModulePath(module) ? require('path').resolve(this.baseDir, module) 	: module;
		}

		this.modulesLoaded[moduleName] = require(modulePath);

		return this.modulesLoaded[moduleName];
	}

	this.unloadModule = function(module) {

		var moduleName = this.getModuleName(module);

		if (this.isModuleLoaded(moduleName)) {

			delete this.modulesLoaded[moduleName];

		}

		return null;
	}

	this.getModuleName = function(module) {

		if (typeof module === "object") {

			return module.name;

		} else {

			return this.isModulePath(module) ? this.getModuleNameFromPath(module) : module;
		
		}
	}

	this.getModuleNameFromPath = function(modulePath) {

		var pathParts 	= modulePath.split('/'),
			lastPart 	= pathParts[pathParts.length - 1];

		return lastPart;
	}

	this.isModulePath = function(string) {

		return (string.indexOf('/') !== -1);
	}

	this.isModuleLoaded = function(module) {

		return (typeof this.modulesLoaded[module] !== "undefined");
	}

	this.init(baseDir, initialModules);
}

module.exports.createManager = function(baseDir, initialModules) {
	return new ModuleLoader(baseDir, initialModules);
}