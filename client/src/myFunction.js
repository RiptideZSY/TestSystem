export function generateData(width, height, len) {
	var points = [];
	var max = 0;
	while (len--) {
		var val = Math.floor(Math.random() * 100);
		var radius = Math.floor(Math.random() * 70);

		max = Math.max(max, val);
		var point = {
			x: Math.floor(Math.random() * width),
			y: Math.floor(Math.random() * height),
			value: val,
			radius: radius
		};
		points.push(point);
	}
	// heatmap data format
	var data = {
		max: max,
		data: points
	};
	return data;
}