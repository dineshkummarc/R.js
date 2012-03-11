/*

	Project : R.js
	Authors: Chris Grant, Neil "Bane"  McCallion
	Description: Make something light without bloat

*/

// Pass in window object from gloabl scope
(function(W){

	// Declare Query function and Document var
	var Query, D = W.document,_;

	// If queyrSelectorAll is supported in this browser
	if ('querySelectorAll' in D) {

		// Query function uses querySelectorAll
		Query = function( _query ){
			return D.querySelectorAll( _query )
		}

	} else {

		// If not, Query function injects Sizzle if no existence and uses it for Querying
		Query = function( _query ){
			W.Sizzle || D.write('<script src="https://raw.github.com/jquery/sizzle/master/sizzle.js"><\/script>');
			return Sizzle( _query );
		}
	}

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
				//return new R(cmd);
				this.call(this,cmd);
			}

		// If the cmd is a function, typically our init onload event, 
		} else {

			// Should be DOMContentLoaded, but added this in for kicks and IE testing
			/****
				ToDo, subtle determination if DOMContentLoaded is usable
			*****/
			W.onload = cmd;
		}

		_=this; // For helper help helpers
	}

	// Bling connect our prototype, all the cool dawgs are doing it
	R.fn=R.prototype;
	
	/** Helper help herlper **/
	_setStyle = function(property,value) {
		console.log(_);
		for(i=0;i<=_.len;i++){
			_.collection[i].style[property] = value;
		}
	}

	// css function, takes an object of style changes
	R.fn.css = function( obj ) {
		for(i=0;i<=(this.len);i++){
			for(var key in obj){
				this.collection[i].style[key] = obj[key];
			}
		}
		return _; // Chainable
	}

	// height function, takes an int
	R.fn.height = function(d) {
		_setStyle('height',d+'px'); // Helper
		return _; //chainable
	}

	// width function, takes an int
	R.fn.width = function(d) {
		_setStyle('width',d+'px'); // Helper
		return _; // chainable
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


})(window); // I CAN HAZ YO WINDOW FOOL.
