/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	getCDF = require( './../lib/getCDF.js' ),

	// CDF functions
	betaCDF = require( 'distributions-beta-cdf' ),
	cauchyCDF = require( 'distributions-cauchy-cdf' ),
	chisquareCDF = require( 'distributions-chisquare-cdf' ),
	erlangCDF = require( 'distributions-erlang-cdf' ),
	exponentialCDF = require( 'distributions-exponential-cdf' ),
	fCDF = require( 'distributions-f-cdf' ),
	gammaCDF = require( 'distributions-gamma-cdf' ),
	gumbelCDF = require( 'distributions-gumbel-cdf' ),
	invgammaCDF = require( 'distributions-invgamma-cdf' ),
	laplaceCDF = require( 'distributions-laplace-cdf' ),
	logisticCDF = require( 'distributions-logistic-cdf' ),
	lognormalCDF = require( 'distributions-lognormal-cdf' ),
	rayleighCDF = require( 'distributions-rayleigh-cdf' ),
	tCDF = require( 'distributions-t-cdf' ),
	uniformCDF = require( 'distributions-uniform-cdf' ),
	normalCDF = require( 'distributions-normal-cdf' ),
	paretoType1CDF = require( 'distributions-pareto-type1-cdf' ),
	triangularCDF = require( 'distributions-triangular-cdf' ),
	weibullCDF = require( 'distributions-weibull-cdf' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'kstest getCDF', function tests() {

	it( 'should export a function', function test() {
		expect( getCDF ).to.be.a( 'function' );
	});

	it( 'should return the correct CDF for a valid input string', function test() {
		assert.strictEqual( getCDF( 'beta' ), betaCDF );
		assert.strictEqual( getCDF( 'cauchy' ), cauchyCDF );
		assert.strictEqual( getCDF( 'chisquare' ), chisquareCDF );
		assert.strictEqual( getCDF( 'chi-squared' ), chisquareCDF );
		assert.strictEqual( getCDF( 'erlang' ), erlangCDF );
		assert.strictEqual( getCDF( 'exponential' ), exponentialCDF );
		assert.strictEqual( getCDF( 'f' ), fCDF );
		assert.strictEqual( getCDF( 'gamma' ), gammaCDF );
		assert.strictEqual( getCDF( 'gumbel' ), gumbelCDF );
		assert.strictEqual( getCDF( 'invgamma' ), invgammaCDF );
		assert.strictEqual( getCDF( 'laplace' ), laplaceCDF );
		assert.strictEqual( getCDF( 'logistic' ), logisticCDF );
		assert.strictEqual( getCDF( 'lognormal' ), lognormalCDF );
		assert.strictEqual( getCDF( 'log-normal' ), lognormalCDF );
		assert.strictEqual( getCDF( 'rayleigh' ), rayleighCDF );
		assert.strictEqual( getCDF( 't' ), tCDF );
		assert.strictEqual( getCDF( 'uniform' ), uniformCDF );
		assert.strictEqual( getCDF( 'normal' ), normalCDF );
		assert.strictEqual( getCDF( 'gaussian' ), normalCDF );
		assert.strictEqual( getCDF( 'pareto-type1' ), paretoType1CDF );
		assert.strictEqual( getCDF( 'pareto-type-1' ), paretoType1CDF );
		assert.strictEqual( getCDF( 'triangular' ), triangularCDF );
		assert.strictEqual( getCDF( 'weibull' ), weibullCDF );
	});

	it( 'should throw an error if provided the name of a discrete distribution', function test() {
		var values = [
			'binomial',
			'geometric',
			'hypergeometric',
			'negative-binomial',
			'poisson'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				getCDF( value );
			};
		}
	});

	it( 'should throw an error if provided a name which does not match any distribution', function test() {
		var values = [
			'not_a_distribution',
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				getCDF( value );
			};
		}
	});

});
