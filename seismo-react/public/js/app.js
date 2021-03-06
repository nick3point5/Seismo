document.body.onload = function () {
	function rippleEffect() {
		const body = document.body;
		const fillRatio = 0.3;
		const area = body.clientHeight * body.clientWidth;
		const speed = 3;
		const num_ripples = Math.ceil(area/40000*fillRatio);

		function getRand(max, min) {
			let num = Math.random() * (max + 1 - min) + min - 1;
			num = Math.ceil(num);
			return num;
		}

		function makeRipple(i) {
			const max_x = body.clientWidth - 200;
			const max_y = body.clientHeight;
			const x = getRand(0, max_x);
			const y = getRand(200, max_y);
			const ripple = $(
				`<div id="${
					"ripple" + i
				}" class="ripple"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" ><circle cx="50" cy="50" r="0" fill="none" stroke="#ffff00" stroke-width="8"><animate attributeName="r" repeatCount="indefinite" dur="${speed}s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate><animate attributeName="opacity" repeatCount="indefinite" dur="${speed}s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate></circle><circle cx="50" cy="50" r="0" fill="none" stroke="#ff0000" stroke-width="8"><animate attributeName="r" repeatCount="indefinite" dur="${speed}s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-${speed/2}s"></animate><animate attributeName="opacity" repeatCount="indefinite" dur="${speed}s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-${speed/2}s"></animate></circle></svg></div>`
			);
			ripple.appendTo("body");
			$("#ripple" + i)[0].style.transform = `translate(${x}px,${-y}px)`;
		}

		for (let i = 0; i < num_ripples; i++) {
			makeRipple(i);
		}
		let i = 0;
		setInterval(() => {
			$("#ripple" + i).remove();
			makeRipple(i);
			i++;
			if (i >= num_ripples) {
				i = 0;
			}
		}, 30000/num_ripples);
	}

	function bodyShake() {
		document.body.classList.add("shake");
		setInterval(() => {
			document.body.classList.remove("shake");
		}, 1500);
	}

	rippleEffect();
	bodyShake();

};