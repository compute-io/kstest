/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	kstest = require( './../lib/index.js' ),

	// Uniform CDF:
	uniformCDF = require( 'distributions-uniform-cdf' ),

	// Module to generate uniform random numbers:
	randUnif = require( 'distributions-uniform-random' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'kstest', function tests() {

	it( 'should export a function', function test() {
		expect( kstest ).to.be.a( 'function' );
	});

	it( 'throws an error if the first argument is not a number array or typed array', function test() {
		var values = [
			'5',
			5,
			[ 1, 2, 'not a numeric array, hehe' ],
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				kstest( value, 'normal' );
			};
		}
	});

	it( 'should throw an error if the second input argument is neither a string nor a function', function test() {
		var values = [
			5,
			[ 1, 2, 3 ],
			true,
			undefined,
			null,
			NaN,
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				kstest( [ 0.25, 0.5, 0.75 ], value );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			5,
			true,
			undefined,
			'not one of less, greater or two-sided',
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				kstest( [ 0.2, 0.5, 0.75 ], 'uniform', {
					'alternative': value
				});
			};
		}
	});

	it( 'should correctly perform the two-sided Kolmogorov-Smirnov test', function test() {
		var x,
			y = uniformCDF,
			out;

		x = randUnif( 100, {
			'seed': 22
		});
		out = kstest( x, y );

		assert.closeTo( out.pValue, 0.359601, 1e-6 );
		assert.closeTo( out.T, 0.090834, 1e-6 );
	});

	it( 'should correctly perform the two-sided Kolmogorov-Smirnov test for an already sorted array', function test() {
		var x,
			y = uniformCDF,
			out;

		x = randUnif( 100, {
			'seed': 22
		});
		x.sort();

		out = kstest( x, y, {
			'sorted': true
		});

		assert.closeTo( out.pValue, 0.359601, 1e-6 );
		assert.closeTo( out.T, 0.090834, 1e-6 );
	});

	it( 'should correctly perform the two-sided Kolmogorov-Smirnov test when distribution parameters are non-standard', function test() {
		var x,
			y = 'uniform',
			out;

		x = randUnif( 100, {
			'a': 10,
			'b': 20,
			'seed': 127
		});
		out = kstest( x, y, {
			'a': 10,
			'b': 20
		});

		assert.closeTo( out.pValue, 0.843250, 1e-6 );
		assert.closeTo( out.T, 0.0599740, 1e-6 );
	});

	it( 'should correctly perform a one-sided Kolmogorov-Smirnov test', function test() {
		var x,
			y = uniformCDF,
			out;

		x = randUnif( 100, {
			'seed': 22
		});
		out = kstest( x, y, {
			'alternative': 'less'
		});
		assert.closeTo( out.pValue, 0.691789, 1e-6 );
		assert.closeTo( out.T,  0.0413264, 1e-6 );

		out = kstest( x, y, {
			'alternative': 'greater'
		});
		assert.closeTo( out.pValue, 0.18083462, 1e-6 );
		assert.closeTo( out.T, 0.090834, 1e-6 );

	});

	it( 'should print a formatted output via .toString() method', function test() {
		var actual;

		actual = kstest( [ 0.25, 0.5, 0.75 ], 'uniform' );

		expect( actual.toString() ).to.be.a.string;
	});

});
