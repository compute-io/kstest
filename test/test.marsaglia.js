/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pKolmogorov = require( './../lib/marsaglia.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'kstest marsaglia', function tests() {

	it( 'should export a function', function test() {
		expect( pKolmogorov ).to.be.a( 'function' );
	});

	it( 'should correctly evaluate the CDF of D_n', function test() {
		assert.closeTo( pKolmogorov( 0.3, 10 ), 0.7294644, 1e-7 );
		assert.strictEqual( pKolmogorov( -0.1, 10 ), 0 );
		assert.strictEqual( pKolmogorov( 1.5, 10 ), 1 );
		assert.closeTo( pKolmogorov( 0.5, 20 ), 0.9999621, 1e-7 );
		assert.closeTo( pKolmogorov( 0.1, 10 ), 0.00036288, 1e-7 );
		assert.closeTo( pKolmogorov( 0.1, 20 ), 0.02374491, 1e-7 );
		assert.closeTo( pKolmogorov( 0.05, 300 ), 0.5725584, 1e-7 );
		assert.closeTo( pKolmogorov( 0.05, 80 ), 0.01757889, 1e-7 );
		assert.closeTo( pKolmogorov( 0.8, 1 ), 0.6, 1e-7 );
		assert.closeTo( pKolmogorov( 0.274, 10 ), 0.6284796, 1e-7 );
	});

	it( 'should correctly evaluate the CDF when overflow occurs', function test() {
		this.timeout( 20000 );
		assert.closeTo( pKolmogorov( 0.05, 1000 ), 0.9869879, 1e-7 );
	});

});
