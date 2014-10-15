/* 

Require from a directory relative to node_modules, flattening your require paths.

 services = rqf.cwd('services')
 console.log services
 redis = services('redis-then')
 console.log redis
 lib = rqf.cwd().module('lib')
 pageLib = lib.module('page')
 console.log pageLib
 sitemap = pageLib('sitemap')
 console.log sitemap

Example:
	Given project structure:
		node_modules/rqf/
		lib/some/complex/dir/module/module.js
		lib/otherModule/index.js

	The file module.js:
		var lib = require('requirefrom')('lib');
 		var otherModule = lib('otherModule');

	Would be equivalent to:
		var otherModule = require('../../../../otherModule');
*/

// path library
var path = require('path');

// main export
module.exports = function rqf(name) {
    if(name != null) return module.exports.base(name);
    else return module.exports.base;
}

// root at current working directory
var cwd = module.exports.cwd = function cwd(directory) {
    directory = directory || './'
    return dir(
        path.normalize(path.join(process.cwd(), directory))
    );
}

// root project directory
var root = module.exports.root = function root(directory) {
    directory = directory || './'
    return dir(
        path.normalize(path.join(__dirname, '..', '..', directory))
    );
}

// directory
var dir = module.exports.dir = function dir(directory) {
    // require
    var f = function rqf(name) {
        return require(
            path.normalize(path.join(directory, name))
        );
    }

    // submodule
    f.module = function module(name) {
        return dir(
            path.normalize(path.join(directory, name))
        );
    }

    // return
    return f;
}

// define base
module.exports.base = root()
