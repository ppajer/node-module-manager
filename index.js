function ModuleLoader(basePath, initialModules) {

	this.init = function(basePath, initialModules) {

		this.basePath 		= basePath || '';
		this.modulesLoaded 	= {};

		if (initialModules || initialModules.length) {

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

		var moduleName = this.isModulePath(module) ? this.getModuleNameFromPath(module) : module;

		if (this.isModulePath(module)) {

			this.modulesLoaded[moduleName] = require(module);

		} else {

			this.modulesLoaded[moduleName] = require(module);
		}

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
}