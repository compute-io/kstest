'use strict';

// MODULES //

var isBoolean = require( 'validate.io-boolean-primitive' ),
	isObject = require( 'validate.io-object' ),
	isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Boolean} [options.sorted] - boolean indicating if the input data is already sorted in ascending order
* @param {String} [options.alternative] - alternative hypothesis
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'kstest()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'alternative' ) ) {
		opts.alternative = options.alternative;
		if ( !isString( opts.alternative ) ) {
			return new TypeError( 'kstest()::invalid option. Alternative option must be a string primitive. Option: `' + opts.alternative + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sorted' ) ) {
		opts.sorted = options.sorted;
		if ( !isBoolean( opts.sorted ) ) {
			return new TypeError( 'kstest()::invalid option. Sorted flag must be a boolean. Option: `' + opts.sorted + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()

// EXPORTS //

module.exports = validate;
