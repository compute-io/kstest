var kstest = require( './../lib' ),
	x,
	out,
	table;

// Values drawn from a Normal(3,1) distribution
x = [ 1.956335, 4.188998, 2.000942, 2.908463, 3.673476, 4.395047, 3.367432, 2.074397, 1.754223, 3.943273, 1.907448, 2.239214, 3.205089, 1.650116, 3.772828, 2.969861, 2.453575, 2.371188, 4.207656, 2.716989 ];


// Test against N(0,1)
out = kstest( x, 'normal' );
table = out.toString();

console.log( 'Test against N(0,1):');
console.log( table );

// Test against N(3,1)
out = kstest( x, 'normal', {
	'mu': 3
});
table = out.toString();

console.log( 'Test against N(3,1):');
console.log( table );
