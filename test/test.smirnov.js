/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pKolmogorov1 = require( './../lib/smirnov.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'kstest smirnov', function tests() {

	it( 'should export a function', function test() {
		expect( pKolmogorov1 ).to.be.a( 'function' );
	});

	it( 'should correctly evaluate the CDF of D_n^+ and D_n^-', function test() {
		assert.closeTo( pKolmogorov1( 0.3, 10 ), 0.8645364, 1e-7 );
		assert.strictEqual( pKolmogorov1( -0.1, 10 ), 0 );
		assert.strictEqual( pKolmogorov1( 1.5, 10 ), 1 );
		assert.closeTo( pKolmogorov1( 0.5, 40 ), 0.9999999, 1e-7 );
		assert.closeTo( pKolmogorov1( 0.1, 4 ), 0.13310000, 1e-7 );
		assert.closeTo( pKolmogorov1( 0.1, 20 ), 0.37092898, 1e-7 );
	});

});
