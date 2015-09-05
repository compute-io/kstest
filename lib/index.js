'use strict';

// MODULES //

var incrspace = require( 'compute-incrspace' ),
	max = require( 'compute-max' ),
	subtract = require( 'compute-subtract' ),
	isFunction = require( 'validate.io-function' ),
	isString = require( 'validate.io-string-primitive' ),
	isNumberArray = require( 'validate.io-number-array' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	roundn = require( 'compute-roundn' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var ascending = require( './ascending.js' ),
	getCDF = require( './getCDF.js' ),
	pKolmogorov = require( './marsaglia.js' ),
	pKolmogorov1 = require( './smirnov.js');


// KOLMOGOROV SMIRNOV TEST //

/**
* FUNCTION kstest( x, y[, opts] )
*	Computes a Kolmogorov-Smirnov goodness-of-fit test.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} x - input array holding numeric values
* @param {Function|String} y - either a CDF function or a string denoting the name of a distribution
* @param {Object} [opts] - function options
* @param {Boolean} [opts.sorted=false] - boolean indicating if the input array is already in sorted order
* @param {String} [opts.alternative="two-sided"] - string indicating whether to condut two-sided or one-sided hypothesis test (other options: `less`, `greater`)
* @returns {Object} result object with properties `T` and `pValue`, the test statistic and p-value.
*/
function kstest( x, y, options ) {

	if ( !isNumberArray( x ) && !isTypedArrayLike( x ) ) {
		 throw new TypeError( 'kstest()::invalid input argument. First argument must be a typed array or number array. Value: `' + x + '`.' );
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
	x = Array.prototype.slice.call( x );

	// Input data has to be sorted
	if ( opts.sorted !== true ) {
		x.sort( ascending );
	}
	s = incrspace( 0, n );

	if ( options ) {
		for ( i = 0; i < n; i++ ) {
			yVal = y( x[ i ], options );
			x[ i ] = yVal - s[ i ] / n;
		}
	} else {
		for ( i = 0; i < n; i++ ) {
			yVal = y( x[ i ] );
			x[ i ] = yVal - s[ i ] / n;
		}
	}

	alt = opts.alternative || 'two-sided';
	switch( alt ) {
	case 'two-sided':
		stat = max(
			[ max( x ), max( subtract( 1/n, x ) ) ]
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
			str += '\tnull hypothesis: the CDF of `x` is ' + nullHypothesis + ' equal to the reference CDF.\n';
			str += '\ttest statistic: ' + roundn( stat, -4 ) + '\n';
			str += '\tp-value: ' + roundn( pval, -4 );
			str += '\n';
			return str;
		}
	};
} // end FUNCTION kstest()


// EXPORTS //

module.exports = kstest;
