/*
 * @Author: hwaphon
 * @Date:   2017-02-17 09:57:59
 * @Last Modified by:   hwaphon
 * @Last Modified time: 2017-02-19 22:35:14
 */

(function() {
	var musicControl = document.getElementById("music-stop"),
		player = document.getElementById("player"),
		controlIcon = document.getElementById("control-icon"),
		durationElement = document.getElementById("duration"),
		currentTimeElement = document.getElementById("current-time"),
		progressElement = document.getElementById("music-progress"),
		volumeUpElement = document.getElementById("volume-up"),
		volumeDownElement = document.getElementById("volume-down"),
		volumeProgress = document.getElementById("music-sound"),
		fileElement = document.getElementById("file"),
		musicTitleElement = document.getElementById("music-title"),
		addMusicElement = document.getElementById("add-music"),
		albumPicElment = document.getElementById("picture"),
		musicPlayer = document.getElementById("music-player");


	musicPlayer.addEventListener("dragover", function(e) {
		e.preventDefault();
	});

	musicPlayer.addEventListener("drop", readData, false);

	function readData(e) {
		e.preventDefault();
		e.stopPropagation();

		var filelist = e.dataTransfer.files;
		if (!filelist) { return; }

		if (filelist.length > 0) {
			var file = filelist[0];
			var src = URL.createObjectURL(file);
			console.log(src);
			player.src = src;
			musicTitleElement.innerHTML = file.name;
			pause();
		}
	}
	var interval;

	musicControl.addEventListener("click", function() {
		if (player.paused) {
			player.play();
			start();
			interval = setInterval(change, 1000);
		} else {
			player.pause();
			pause();
		}
	});

	player.addEventListener("ended", function() {
		clearInterval(interval);
		pause();
		progressElement.value = 0;
		durationElement.innerHTML = "/0:00";
		currentTimeElement.innerHTML = "0:00";
	});

	volumeDownElement.addEventListener("click", function() {
		var volume = player.volume;
		if (volume > 0.0) {
			player.volume -= 0.2;
			volumeProgress.value = player.volume * 10;
		}

	});

	volumeUpElement.addEventListener("click", function() {
		var volume = player.volume;
		if (volume < 1.0) {
			player.volume += 0.2;
			volumeProgress.value = player.volume * 10;
		}
	});

	fileElement.addEventListener("change", function(event) {
		getURL();
	});

	addMusicElement.addEventListener("click", function(event) {
		fileElement.click();
	});

	function start() {
		controlIcon.classList.remove("fa-play");
		controlIcon.classList.add("fa-pause");
		setDuration();
		changeImage();
	}

	function pause() {
		controlIcon.classList.remove("fa-pause");
		controlIcon.classList.add("fa-play");
	}

	function setDuration() {
		var total = player.duration;
		durationElement.innerHTML = "/" + timeFormat(total);
	}

	function setCurrentTime() {
		var total = player.currentTime;
		currentTimeElement.innerHTML = timeFormat(total);
	}

	function timeFormat(total) {
		var minute = parseInt(total / 60),
			second = parseInt(total - minute * 60),
			result;

		second = (second >= 10) ? second : '0' + second;
		result = minute + ":" + second;
		return result;
	}

	function change() {
		setCurrentTime();
		var currentTime = player.currentTime,
			duration = player.duration;

		var progress = (currentTime / duration).toFixed(2) * 100;
		progressElement.value = progress;
	}

	function getURL() {
		var file = fileElement.files[0];
		var url = URL.createObjectURL(file);
		player.src = url;
		musicTitleElement.innerHTML = file.name;
		pause();
	}

	function changeImage() {
		var num = parseInt(Math.random() * 16),
			src;	

		num = (num > 0) ? num : num + 1;
		src = "raw/" + num + ".jpg";
		console.log(num);	
		albumPicElment.src = src;
	}
})();