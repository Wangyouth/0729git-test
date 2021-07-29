function animation(obj, traget, callback) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var step = (traget - obj.offsetLeft) / 10;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		if (obj.offsetLeft == traget) {
			clearInterval(obj.timer);
			if (callback) {
				callback();
			}
		}
		obj.style.left = obj.offsetLeft + step + 'px';
	}, 15);
}
