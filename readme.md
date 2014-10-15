## ReQuireFrom (rqf)

Advanced require module for node.js. Removes the need for complex relative paths for require statements. Inspired by requirefrom[https://github.com/dskrepps/requireFrom] module and the discussion [here](https://gist.github.com/branneman/8048520).

## Installation

````
npm install rqf
````

## Sample

````js
    var rqf = require('rqf');
    var lib = rqf().module('lib');
    var sampleLib = lib('sample');
````

## Usage

rqf allows unlimited nesting and the same api regardless of depth. It doesn't require configuration and by default computes the root path from your node_modules directory. If you rather want to use the current working directory use

````js
    var rqf = require('rqf');
    rqf.base = rqf.cwd();
````

Please refer to the following examples

````js
    // define rqf
    var rqf = require('rqf');

    // require sample from root directory
    var fromRoot = rqf('sample');

    // require sample from lib directory
    var fromLib1 = rqf().module('lib')('sample');

    // require sample from lib directory
    var lib = rqf().module('lib');
    var fromLib2 = lib('sample');

    // use current working directory as base
    var lib = rqf.cwd('lib')
    var fromLib3 = lib('sample');

    // nesting modules
    var sample = lib.module('sample');
    var fromLibSample = sample('myModule');

````

