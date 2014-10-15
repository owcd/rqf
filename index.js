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
