'use strict';

// MODULES //

var binomcoefln = require( 'compute-binomcoefln' ),
	incrspace = require( 'compute-incrspace' );


// FUNCTIONS //

var exp = Math.exp,
	floor = Math.floor,
	log = Math.log;

/**
* FUNCTION pKolmogorov1( d, n )
*	Evaluates the CDF for the one-sided test statistics, i.e.
*	the maximum by which the empirical cdf exceeds / is less than the hypothesized cdf 
*
* @param {Number} d - the argument of the CDF of D_n^+ / D_n^-
* @param {Number} n - number of variates
* @returns {Number} evaluated CDF, i.e. P( D_n^+ < d )
*/
function pKolmogorov1( d, n ) {
	var seq,
		len,
		ret,
		val,
		i;

	if ( d <= 0 ) {
		return 0;
	}
	if (d >= 1) {
		return 1;
	}
	len = floor( n * (1-d) ) + 1;
	seq = incrspace( 0, len );

	ret = 0;
	for ( i = 0; i < len; i++ ) {
		val = seq[ i ];
		ret += exp( binomcoefln( n, val ) + ( n - val ) * log( 1 -
		d - val/n ) + ( val - 1 ) * log( d + val/n ) );
	}
	return 1 - d * ret;
} // end FUNCTION pKolmogorov1()


// EXPORTS //

module.exports = pKolmogorov1;
