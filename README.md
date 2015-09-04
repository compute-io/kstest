Kolmogorov-Smirnov Goodness-of-Fit Test
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> One-sample Kolmogorov-Smirnov goodness-of-fit test.

## Installation

``` bash
$ npm install compute-kstest
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

```
var kstest = require( 'compute-kstest' );
```

### kstest( x, y[, opts] )

For a numeric  [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) or [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)
`x`, a Kolmogorov-Smirnov goodness-of-fit is computed for the null hypothesis that the values of `x` come from the distribution specified by `y`. `y` can be either a [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) with the name of the distribution to test against, or a [`function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function). In the latter case, `y` is expected to be the cumulative distribution function (CDF) of the distribution to test against.
The function returns an object holding the calculated test statistic `T` and the `pValue` of the test.

```javascript
var randUnif = require( 'distributions-uniform-random' ),
	x,
	out;

// Set seed
randUnif.seed = 54

x = randUnif( 100 );
out = kstest( x, 'uniform' )
// { pValue: ~0.872, T: ~0.058 }
```

The returned object comes with a `.toString()` method which when invoked will print a formatted output of the results of the hypothesis test.

```javascript
x = randUnif( 100 )
out = kstest( x, 'normal' );
console.log( out.toString() );
/*
Kolmogorov-Smirnov goodness-of-fit test.
	null hypothesis: the CDF of `x` is equal equal to the reference CDF.
	test statistic: 0.5019
	p-value: 0
*/
```

By default, the parameters of the distribution specified by `y` are set to their standard values (see the documentation for the respective [distribution](https://github.com/distributions-io)). To specify custom parameters, set the corresponding options:

```javascript
x = randUnif( 100, {
	'a': 10,
	'b': 20
})
// Test against U(0,1)
out = kstest( x, 'uniform' );
// returns { pValue: 0, T: 1 }

// Test against U(10,20)
out = kstest( x, 'uniform', {
	'a': 10,
	'b': 20
});
// returns { pValue: ~0.826, T: ~0.061 }
```

In addition to the respective distribution parameters, the function accepts the following `options`:

*	__alternative__: Either `two-sided`, `less` or `greater`. Indicates whether the alternative hyptothesis is that the true distribution of `x` is not equal to the reference distribution specified by `y` (`two-sided`), whether it is `less` than the reference distribution or `greater` than the reference distribution. Default: `two-sided`.
* 	__sorted__: `boolean` indicating if the `x` [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) is in sorted order (ascending). Default: `false`.

By default, the function tests the null hyptothesis that the true distribution of `x` and the reference distribution `y` are equal to each other against the alternative that they are not equal. To carry out a one-sided hyptothesis test, set the `alternative` option to either `less` or `greater`.

```javascript
x = randUnif( 100 )
out = kstest( x, 'uniform', {
	'alternative': 'less'
});
// returns { pValue: ~0.647, T: ~0.045 }

out = kstest( x, 'uniform', {
	'alternative': 'greater'
});
// returns { pValue: ~0.179, T: ~0.091 }
```

To perform the Kolmogorov-Smirnov test, the data has to be sorted in ascending order. If the data in `x` are already sorted, set the `sorted` option to `true` to speed up the computation.

```javascript
x = [ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9 ]

out = kstest( x, 'uniform', {
	'sorted': true
});
// returns { pValue: ~1, T: 0.1 }
```

## Examples

``` javascript
var kstest = require( 'compute-kstest' ),
	x,
	out,
	table;

// Values drawn from a Normal(3,1) distribution
x = [ 1.956335, 4.188998, 2.000942, 2.908463, 3.673476,
	4.395047, 3.367432, 2.074397, 1.754223, 3.943273, 1.907448, 2.239214,
	3.205089, 1.650116, 3.772828, 2.969861, 2.453575, 2.371188, 4.207656,
	2.716989 ];

// Test against N(0,1)
out = kstest( x, 'normal' );
// returns { pValue: 0, T: ~0.951 }

table = out.toString();
/*
Kolmogorov-Smirnov goodness-of-fit test.
	null hypothesis: the CDF of `x` is equal equal to the reference CDF.
	test statistic: 0.9505
	p-value: 0
*/

// Test against N(3,1)
out = kstest( x, 'normal', {
	'mu': 3
});
// returns { pValue: ~0.647, T: ~0.157 }

table = out.toString();
/*
Kolmogorov-Smirnov goodness-of-fit test.
	null hypothesis: the CDF of `x` is equal equal to the reference CDF.
	test statistic: 0.1576
	p-value: 0.6467

*/
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-kstest.svg
[npm-url]: https://npmjs.org/package/compute-kstest

[travis-image]: http://img.shields.io/travis/compute-io/kstest/master.svg
[travis-url]: https://travis-ci.org/compute-io/kstest

[codecov-image]: https://img.shields.io/codecov/c/github/compute-io/kstest/master.svg
[codecov-url]: https://codecov.io/github/compute-io/kstest?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/kstest.svg
[dependencies-url]: https://david-dm.org/compute-io/kstest

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/kstest.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/kstest

[github-issues-image]: http://img.shields.io/github/issues/compute-io/kstest.svg
[github-issues-url]: https://github.com/compute-io/kstest/issues
