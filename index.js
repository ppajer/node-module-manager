function ModuleLoader(baseDir, initialModules) {

	this.init = function(baseDir, initialModules) {

		this.baseDir 		= baseDir || '';
		this.modulesLoaded 	= {};

		if (initialModules && initialModules.length) {

			initialModules.forEach(this.loadModule.bind(this));
		};
	}

	this.getModule = function(module) {

		var moduleName = this.isModulePath(module) ? this.getModuleNameFromPath(module) : module;
		
		if (this.isModuleLoaded(moduleName)) {

			return this.modulesLoaded[moduleName];

		} else {

			return this.loadModule(module);
		}	
	}

	this.loadModule = function(module) {

		var moduleName,
			modulePath;

		if (typeof module === "object") {

			moduleName = module.name;
			modulePath = require('path').resolve(this.baseDir, module.path);
		
		} else {

			moduleName = this.isModulePath(module) ? this.getModuleNameFromPath(module) 			: module;
			modulePath = this.isModulePath(module) ? require('path').resolve(this.baseDir, module) 	: module;
		}

		this.modulesLoaded[moduleName] = require(modulePath);

		return this.modulesLoaded[moduleName];
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

module.exports = ModuleLoader;