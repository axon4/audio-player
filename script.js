const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const audio = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const buttonPrevious = document.getElementById('previous');
const buttonPlay = document.getElementById('play');
const buttonNext = document.getElementById('next');
const audioFiles = [
	{
		name: 'The Qur\'ān Changed Me',
		displayName: 'The Qur\'ān Changed Me - القرآن غيرني',
		artist: 'Khālid Maḥjūb - خالد محجوب'
	},
	{
		name: 'Sūraḣ an-Naḥl 63-69',
		displayName: 'Sūraḣ an-Naḥl (The Bee) 63–69 - سورة النحل',
		artist: 'Abdulbasit Abdussamad - عبد الباسط عبد الصمد'
	},
	{
		name: 'Sūraḣ al-Isrā\' 1-38',
		displayName: 'Sūraḣ al-Isrā\' (The Night Journey) 1–38 - سورة الإسراء',
		artist: 'Souleyman Al Mali - سليمان المالي'
	},
	{
		name: 'Sūraḣ Ibrāhīm 42-48',
		displayName: 'Sūraḣ Ibrāhīm (Abraham) 42–48 - سورة إبراهيم',
		artist: 'Aftab Ahmed - أفطاب أحمد'
	}
];
let isPlaying = false;
let audioIndex = 0;

function playAudio() {
	isPlaying = true;
	buttonPlay.classList.replace('fa-play', 'fa-pause');
	buttonPlay.setAttribute('title', 'Pause');
	audio.play();
};

function pauseAudio() {
	isPlaying = false;
	buttonPlay.classList.replace('fa-pause', 'fa-play');
	buttonPlay.setAttribute('title', 'Play');
	audio.pause();
};

buttonPlay.addEventListener('click', () => (isPlaying ? pauseAudio() : playAudio()));

function loadAudio(file) {
	title.textContent = file.displayName;
	artist.textContent = file.artist;
	audio.src = `./audio/${file.name}.mp3`;
	image.src = `./img/${file.name}.jpg`;
};

function previousAudio() {
	audioIndex--;
	if (audioIndex < 0) {
		audioIndex = audioFiles.length - 1;
	};
	loadAudio(audioFiles[audioIndex]);
	playAudio();
};

function nextAudio() {
	audioIndex++;
	if (audioIndex > audioFiles.length - 1) {
		audioIndex = 0;
	};
	loadAudio(audioFiles[audioIndex]);
	playAudio();
};

loadAudio(audioFiles[audioIndex]);

function updateProgressBar(e) {
	if (isPlaying) {
		const { duration, currentTime } = e.srcElement;
		const progressPercentage = (currentTime/duration) * 100;
		progress.style.width = `${progressPercentage}%`;

		const durationMinutes = Math.floor(duration / 60);
		let durationSeconds = Math.floor(duration % 60);
		if (durationSeconds < 10) {
			durationSeconds = `0${durationSeconds}`;
		};
		// Delay to avoid NaN
		if (durationSeconds) {
			durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
		};

		const currentMinutes = Math.floor(currentTime / 60);
		let currentSeconds = Math.floor(currentTime % 60);
		if (currentSeconds < 10) {
			currentSeconds = `0${currentSeconds}`;
		};
		currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
	};
};

function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const { duration } = audio;
	audio.currentTime = (clickX / width) * duration;
};

buttonPrevious.addEventListener('click', previousAudio);
buttonNext.addEventListener('click', nextAudio);
audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', nextAudio);
progressContainer.addEventListener('click', setProgressBar);