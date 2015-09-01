'use strict';

// MODULES //

var incrspace = require( 'compute-incrspace' ),
	max = require( 'compute-max' ),
	subtract = require( 'compute-subtract' ),
	isFunction = require( 'validate.io-function' ),
	isString = require( 'validate.io-string-primitive' ),
	isNumberArray = require( 'validate.io-number-array' ),
	roundn = require( 'compute-roundn' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var getCDF = require( './getCDF.js' ),
	pKolmogorov = require( './marsaglia.js' ),
	pKolmogorov1 = require( './smirnov.js');


// KOLMOGOROV SMIRNOV TEST //

/**
* FUNCTION kstest( x, y, opts )
*	Computes a Kolmogorov-Smirnov goodness-of-fit test.
*
*/
function kstest( x, y, options ) {

	if ( !isNumberArray( x ) ) {
		 throw new TypeError( 'kstest()::invalid input argument. First argument must be an array of values. Value: `' + x + '`.' );
	}
	if ( !isFunction( y ) && !isString( y ) ) {
		throw new TypeError( 'kstest()::invalid input argument. Second argument must be either a CDF function or a string primitive. Value: `' + y + '`' );
	}
	if ( isString( y ) ) {
		y = getCDF( y );
	}

	var opts = {},
		err,
		i,
		s,
		str,
		n = x.length,
		yVal,
		alt,
		pval, stat,
		nullHypothesis;

	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	// Make a copy to prevent mutation of x
	x = x.slice();
	// Input data has to be sorted
	if ( opts.sorted !== true ) {
		x.sort();
	}
	s = incrspace( 0, n );
	for ( i = 0; i < n; i++ ) {
		yVal = options ? y( x[ i ], options ) : y( x[ i ] );
		x[ i ] = yVal - s[ i ] / n;
	}
	alt = opts.alternative || 'two-sided';
	switch( alt ) {
	case 'two-sided':
		stat = max(
			x,
			subtract( 1/n, x )
		);
	break;
	case 'greater':
		stat = max( subtract( 1/n, x ) );
	break;
	case 'less':
		stat = max( x );
	break;
	default:
		throw new Error( 'kstest()::Invalid option. `alternative` must be either `two-sided`, `less` or `greater`. Value: `' + alt + '`' );
	}

	if ( alt === 'two-sided' ) {
		pval = 1 - pKolmogorov( stat, n );
	} else {
		pval = 1 - pKolmogorov1( stat, n );
	}

	if ( alt === 'two-sided' ) {
		nullHypothesis = 'equal';
	} else {
		nullHypothesis = alt;
	}

	return {
		'pValue': pval,
		'T': stat,
		'toString': function() {
			str = 'Kolmogorov-Smirnov goodness-of-fit test.\n';
			str += '\tnull hypothesis: the empirical CDF of `x` is ' + nullHypothesis + ' equal to the hypothesized CDF.\n';
			str += '\ttest statistic: ' + roundn( stat, -4 ) + '\n';
			str += '\tp-value: ' + roundn( pval, -4 );
			str += '\n';
			return str;
		}
	};
} // end FUNCTION kstest()


// EXPORTS //

module.exports = kstest;
