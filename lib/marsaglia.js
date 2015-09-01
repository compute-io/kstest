'use strict';

// FUNCTIONS //

var exp = Math.exp,
	floor = Math.floor,
	pow = Math.pow,
	sqrt = Math.sqrt;


// KOLMOGOROV DISTRIBUTION //

/**
* FUNCTION pKolmogorov( d, n )
*	Evaluates the Kolmogorov distribution. This function is a JavaScript implementation
*	of a procedure developed by Marsaglia & Tsang.
*	Reference:
*		Marsaglia, G., Tsang, W. W., & Wang, J. (2003).
*		Evaluating Kolmogorov’s Distribution.
*		Journal of Statistical Software,
*		8(18), 1–4.
*		Retrieved from http://www.jstatsoft.org/v08/i18/paper
*
* @param {Number} d - the argument of the CDF of D_n
* @param {Number} n - number of variates
* @returns {Number} evaluated CDF, i.e. P( D_n < d )
*/
function pKolmogorov( d, n ) {
	var k, m, i, j, g,
		h, s,
		eH, H,
		eQ, Q;

	s = d * d * n;
	if ( s > 7.24 || ( s > 3.76 && n > 99 ) ) {
		return 1 - 2 * exp( -( 2.000071 + 0.331/sqrt(n) + 1.409/n ) * s );
	}
	k = floor( n * d ) + 1;
	m = 2 * k - 1;
	h = k - n * d;
	H = new Float64Array( m * m );
	Q = new Float64Array( m * m );
	for ( i = 0; i < m; i++ ) {
		for( j = 0; j < m ; j++ ) {
			if ( i - j + 1 < 0 ) {
				H[ i * m + j ] = 0;
			} else {
				H[ i * m + j ] = 1;
			}
		}
	}
	for ( i = 0; i < m; i++ ) {
		H[ i * m ] -= pow( h, i+1 );
		H[ (m-1) * m + i ] -= pow( h, (m-i) );
	}
	H[ (m-1) * m ] += ( 2*h-1 > 0 ? pow( 2*h-1, m ) : 0 );
	for( i = 0; i < m; i++ ) {
		for( j = 0;j < m; j++ ) {
			if ( i - j + 1 > 0 ) {
				for( g = 1; g <= i - j + 1; g++ ) {
					H[ i * m + j ] /= g;
				}
			}
		}
	}
	eH = 0;
	mpow( H, eH, n );
	s = Q[ (k-1) * m + k - 1 ];
	for ( i = 1; i <= n; i++ ) {
		s = s * i / n;
		if ( s < 1e-140 ) {
			s *= 1e140;
			eQ -= 140;
		}
	}
	s *= pow( 10, eQ );

	return s;

	function mpow( A, eA, n ) {
		var B, eB, i;

		if ( n === 1 ) {
			for ( i = 0; i < m*m; i++ ) {
				Q[ i ] = A[ i ];
				eQ = eA;
			}
			return;
		}
		mpow( A, eA, floor( n/2 ) );
		B = mmult( Q, Q );
		eB = 2 * eQ;
		if ( n % 2 === 0 ) {
			for ( i = 0; i < m*m; i++ ) {
				Q[ i ] = B[ i ];
			}
			eQ = eB;
		} else {
			Q = mmult( A, B );
			eQ = eA + eB;
		}
		if ( Q[ floor(m/2) * m + floor(m/2) ] > 1e140 ) {
			for( i = 0; i < m*m; i++ ) {
				Q[ i ] = Q[ i ] * 1e-140;
			}
			eQ += 140;
		}
	}

	function mmult( x, y ) {
		var i, j, k,
			s,
			z = new Float64Array( m * m );

		for( i = 0; i < m; i++) {
			for( j = 0; j < m; j++ ) {
				s = 0;
				for( k = 0; k < m; k++ ) {
					s += x[ i*m + k ] * y[ k*m + j ];
					z[ i*m + j ] = s;
				}
			}
		}
		return z;
	}

} // end FUNCTION pKolmogorov()


// EXPORTS //

module.exports = pKolmogorov;
