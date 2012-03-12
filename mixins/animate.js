/**
	Name: R.js Mixin Animate
	Author: Chris Grant [ @duckbox ]
	Requirements: Tween.js by sole [ https://github.com/sole/tween.js/ ]
**/

// include Tween.js

// Extend Mixin
R.extend({

	// R().animate()
	animate:function( to, duration, cb ){

		// tmp variables
		var tmp = {},_=this;

		// Map through elements
		_.map(function( elm ){
			
			// Loop through params to get defaults using the to object
			for(var name in to) {

				// If this contains 'px'
				if( elm.style[name].indexOf('px') != -1 ) {

					// Remove the px
					tmp[name]=parseInt( elm.style[name].replace('px','') ); 
				} else {

					// Assign said param to the tmp object
					tmp[name]=elm.style[name]; 
				}
			}

			// Run our Tween
			TWEEN.start();
			var tween = new TWEEN.Tween( tmp ).to( to,duration ).onUpdate(function(){

				// On update, loop through the properities to update them via duration
				for(var prop in tmp){

					// If this is numeric, add px
					var type = _.isNumeric(this[prop]) ? 'px' : '';

					// Update elements
					elm.style[prop] = this[prop]+type;
				}	

			}).start();

			// Fire callback on finish
			if(typeof cb === 'function'){ tween.onComplete(cb); }
			
		});

	}
});	


/**

	R.cache({ box: '#box' });

	box.animate({ width:500,top:20,left:0 },500,function(){
		console.log('done');
	});

	R.query('#box').animate({ width:'500px',left:400 }, 500);

**/