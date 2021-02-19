jscolor.presets.default = {
	width: 141,               // make the picker a little narrower
	position: 'right',        // position it to the right of the target
	previewPosition: 'right', // display color preview on the right
	previewSize: 40,          // make the color preview bigger
	palette: [
		'#000000', '#7d7d7d', '#870014', '#ec1c23', '#ff7e26',
		'#fef100', '#22b14b', '#00a1e7', '#3f47cc', '#a349a4',
		'#ffffff', '#c3c3c3', '#b87957', '#feaec9', '#ffc80d',
		'#eee3af', '#b5e61d', '#99d9ea', '#7092be', '#c8bfe7',
	],
};

document.querySelector('#colorInput1').jscolor.show();