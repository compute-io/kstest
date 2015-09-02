'use strict';

// MODULES //

var betaCDF = require( 'distributions-beta-cdf' ),
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


// GET CDF //

/**
* FUNCTION getCDF( name )
*	Returns the corresponding CDF function for an input string.
*
* @param {String} name - distribution name
* @returns {Function} cumulative distribution function (CDF)
*/
function getCDF( name ) {
	switch ( name ) {
	case 'beta':
		return betaCDF;
	case 'cauchy':
		return cauchyCDF;
	case 'chisquare':
	case 'chi-square':
	case 'chisquared':
	case 'chi-squared':
		return chisquareCDF;
	case 'erlang':
		return erlangCDF;
	case 'exponential':
		return exponentialCDF;
	case 'f':
		return fCDF;
	case 'gamma':
		return gammaCDF;
	case 'gumbel':
		return gumbelCDF;
	case 'invgamma':
	case 'inv-gamma':
	case 'inverse-gamma':
		return invgammaCDF;
	case 'laplace':
		return laplaceCDF;
	case 'logistic':
		return logisticCDF;
	case 'log-normal':
	case 'lognormal':
		return lognormalCDF;
	case 'rayleigh':
		return rayleighCDF;
	case 't':
		return tCDF;
	case 'uniform':
		return uniformCDF;
	case 'gaussian':
	case 'normal':
		return normalCDF;
	case 'pareto-type-1':
	case 'pareto-type1':
		return paretoType1CDF;
	case 'triangular':
		return triangularCDF;
	case 'weibull':
		return weibullCDF;
	case 'binomial':
	case 'geometric':
	case 'hypergeometric':
	case 'negative-binomial':
	case 'poisson':
		throw new Error( 'kstest()::invalid input argument. The Kolmogorov-Smirnov test cannot be used to test discrete distributions. Use a chi-square test instead. Value: `' + name + '`' );
	default:
		throw new Error( 'kstest()::invalid input argument. Second input argument does not match a probability distribution. Value: `' + name + '`' );
	}
} // end FUNCTION getCDF()

// EXPORTS //

module.exports = getCDF;
