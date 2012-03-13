/**
	Name: R.js Mixin: Template
	Author: Neil McCallion (@njmcode)

	Ultra-basic templater mixin. No loop/counter tags or other processing (yet).

	Template format:

	<script type="text/html" id="myTemplate">
		<div>
			<h3>[[title]]</h3>
			<p>[[description]]</p>
		</div>
	</script>

	Method:

	var myData = [
		{
			title: 'President Muffley',
			description: 'Turn the music down, Dimitri'
		},
		{
			title: 'Group Captain Mandrake',
			description: 'The string in my leg has gone'
		}
	];
	R.query('#container').template('myTemplate', myData);
**/

R.extend({

	// R().template()
	template:function( tid, v ){
		// tmp variables
		var _=this;

		var vd, idx, len;
		var multiples = (v instanceof Array);
		vd = (multiples) ? v : [v];

		var tp = R.query('#' + tid).get(0).innerHTML;

		var _render = function(el, data) {
			var output = tp;
			for (var k in data) {
				 output = output.replace('[[' + k + ']]', data[k]);
			}
			el.innerHTML += output;
		};

		// Map through elements
		_.map(function(elm){
			idx = 0;
			len = (multiples) ? v.length : 1;
			while(idx < len) {
				_render(elm, vd[idx]);
				idx++;
			}
		});

	}
});


/**
	Example usage:



	var myData = [
		{
			title: 'My Item',
			description: 'Some blurb'
		},

		...

	];

	R.cache({ ct: '#content' });
	ct.template('myTemplate', myData);

	- or -

	R.query('#ct').template('myTemplate', myData);

**/
