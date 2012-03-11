/*

	Project : R.js
	Authors: Chris Grant, Neil "Bane" McCallion
	Description: Make something light without bloat

*/

// Pass in window object from gloabl scope
(function(W){

	// Declare Query function and Document var
	var Query, D = W.document, _;

	// If queyrSelectorAll is supported in this browser
	Query = ('querySelectorAll' in D) ? function( _query ){
		return D.querySelectorAll( _query );
	} : function( _query ){
		// # TODO: get rid of the write, inject a script tag and set the src instead
		W.Sizzle || D.write('<script src="https://raw.github.com/jquery/sizzle/master/sizzle.js"><\/script>');
		return Sizzle( _query );
	};

	// R function with set command
	R = function( cmd ) {

		// If this entry is not function
		if(typeof cmd != 'function') {

			// Apply our passed query to this.collection
			this.collection = Query( cmd );

			// Length of collection cached
			this.len=this.collection.length-1;

			//If this has no instance declared, sort it out
			/***
				Unsure about this approach, worth a look at
			***/
			if ( !(this instanceof R) ){
				return new R(cmd);
				//this.call(this,cmd);
			}

		// If the cmd is a function, typically our init onload event,
		} else {

			// Should be DOMContentLoaded, but added this in for kicks and IE testing
			/****
				ToDo, subtle determination if DOMContentLoaded is usable
			*****/
			W.onload = cmd;
		}

		_ = this; // For helper help helpers
	}

	// Bling connect our prototype, all the cool dawgs are doing it
	R.fn=R.prototype;

	// css functions for width and height
	var ps = ['width','height'], idx = 2;
	while(idx--) {
		(function(p) {
			R.fn[p] = function(d) {
				if(_.isNumeric(d)) d = d+'px';	// convert ints to px
				_setStyle(p , d); // Helper
				return _; //chainable
			}
		})(ps[idx]);
	}

	// cache function
	/*
		This takes an object that converts the name type as a variable,
		it should be used to reference the query you are trying to cache.

		R.cache({ div : 'div' });

		All divs are now cached under the var div
	*/
	R.cache = function(obj) {

		for(var id in obj){
			W[id] = new R(obj[id]);
		}
	}

	// Long hand approach to query for a selector without going through constructor.
	R.query = function( n ) {
		return new R(n);
	}

	// basic array iterator (didn't call it 'each' to discourage rampant abuse)
	R.map = function(arr, f) {
		if(!arr instanceof Array) throw('R.map(): arg 1 must be an array');
		if(typeof f != 'function') throw('R.map(): arg 2 must be a function');

		for(var i = 0, ln = arr.length; i<ln; i++) {
			f.call(_, arr[i], i);
		}
	}

	// Extension method, easy way to add in new methods/plugins
	R.extend = function(source) {
	  for (var k in source) {
	    if (source.hasOwnProperty(k)) {
	      R.fn[k] = source[k];
	    }
	  }
	  return this;
	}

	/** Add in global extenions **/
	// .css(), .isNumeric()
	R.extend({

		// set css properties from an object of key-value pairs
		css:function( obj ) {
			for(var key in obj){
				_setStyle(key, obj[key]);
			}
			return _; // Chainable
		},

		// is this Numeric?
		isNumeric:function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}

	});


	/**
	 * Private methods
	**/

	/** Helper help herlper **/
	var _setStyle = function(property,value) {
		console.log(_);
		console.log('setStyle',property, value);
		for(i=0;i<=_.len;i++){
			_.collection[i].style[property] = value;
		}
	}


})(window); // I CAN HAZ YO WINDOW FOOL.
