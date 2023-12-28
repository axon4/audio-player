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
const playList = [
	{
		name: 'The Qur\'ān Changed Me',
		displayName: 'The Qur\'ān Changed Me - القرآن غيرني',
		artist: 'Khalid Mahjoub - خالد محجوب'
	},
	{
		name: 'Sūraṫ an-Naḥl 63-69',
		displayName: 'Sūraṫ an-Naḥl (The Bee) 63–69 - سورة النحل',
		artist: 'AbdulBasit AbdusSamad - عبد الباسط عبد الصمد'
	},
	{
		name: 'Sūraṫ al-Isrā\' 1-38',
		displayName: 'Sūraṫ al-Isrā\' (The Night Journey) 1–38 - سورة الإسراء',
		artist: 'Souleyman Al Mali - سليمان المالي'
	},
	{
		name: 'Sūraṫ Ibrāhīm 42-48',
		displayName: 'Sūraṫ Ibrāhīm (Abraham) 42–48 - سورة إبراهيم',
		artist: 'Aftab Ahmed - أفطاب أحمد'
	},
	{
		name: 'Asmā\' al-Husná (Beautiful Names)',
		displayName: 'Asmā\' al-Husná (Beautiful Names) - أسماء الحسنى',
		artist: 'Ahmed AlNufais - أحمد النفيس'
	},
	{
		name: 'How Does One Call You%3F',
		displayName: 'How Does One Call You? - كيف يناجيك',
		artist: 'AbdiRashid Sufi - عبد الرشيد صوفي'
	},
	{
		name: 'God is My Strength (Ash-Shāṭibiyyaḣ)',
		displayName: 'God is My Strength (Ash-Shāṭibiyyaḣ) - بالله حولي (الشاطبية)',
		artist: 'AbdiRashid Sufi - عبد الرشيد صوفي'
	},
	{
		name: 'O God, ReWard Muḥammad for Us',
		displayName: 'O God, ReWard Muḥammad for Us - اللهم جازي عنا محمدا',
		artist: 'AbdiRashid Sufi - عبد الرشيد صوفي'
	},
	{
		name: 'O He Who ReVeals the Beautiful',
		displayName: 'O He Who ReVeals the Beautiful - يا من أظهر الجميل',
		artist: 'AbdiRashid Sufi - عبد الرشيد صوفي'
	},
	{
		name: 'How Can it EnCompass You%3F',
		displayName: 'How Can it EnCompass You? - كيف يحيط بك',
		artist: 'AbdiRashid Sufi - عبد الرشيد صوفي'
	},
	{
		name: 'O God, O BeLoved...',
		displayName: 'O God, O BeLoved... - اللهم يا حبيب',
		artist: 'AbdiRashid Sufi - عبد الرشيد صوفي'
	},
	{
		name: 'How Could the Palms Hold Back%3F',
		displayName: 'How Could the Palms Hold Back? - كيف كفت الأكف',
		artist: 'AbdiRashid Sufi - عبد الرشيد صوفي'
	},
	{
		name: 'BeLoved of the Hearts',
		displayName: 'BeLoved of the Hearts - حبيب القلوب',
		artist: 'Osama Yousif / Khabbab Al-Amin - أسامة يوسف / خباب الأمين'
	},
	{
		name: 'Know YourSelf',
		displayName: 'Know YourSelf - أعرف نفسك',
		artist: 'Anas Mohammeden / Osama Yousif - أنس محمدين / أسامة يوسف'
	},
	{
		name: 'I Will Get Married',
		displayName: 'I Will Get Married - حا أزوج',
		artist: 'Anas Mohammeden / Osama Yousif - أنس محمدين / أسامة يوسف'
	},
	{
		name: 'ForeRunners',
		displayName: 'ForeRunners - سابقون',
		artist: '`Abd ar-Raḥmān Aṣ-Ṣādiq - عبد الرحمن الصادق'
	},
	{
		name: 'O Month of Fasting',
		displayName: 'O Month of Fasting - يا شهر الصوم',
		artist: 'Anas Mohammeden - أنس محمدين'
	},
	{
		name: 'Original Man',
		displayName: 'Original Man - زول المأصل',
		artist: 'Khalid Mahjoub / Anas Mohammeden - خالد محجوب / أنس محمدين'
	},
	{
		name: 'Echo of the PulPit',
		displayName: 'Echo of the PulPit - صدى المحراب',
		artist: 'Khalid Mahjoub - خالد محجوب'
	}
];
let isPlaying = false;
let index = 0;

(async function preLoad() {
	playList.forEach(({ name }) => {
		(new Image()).src = `./images/${name}.jpg`;
		new Audio(`./audio/${name}.mp3`);
	});
})();

function upDatePositionState() {
	navigator.mediaSession.setPositionState({
		duration: audio.duration,
		position: audio.currentTime
	});
};

function upDateMetaData() {
	const { displayName, artist } = playList[index];

	navigator.mediaSession.metadata = new MediaMetadata({
		title: displayName,
		album: 'Axon4',
		artist,
		artwork: [{
			src: image.src,
			type: 'image/jpg'
		}]
	});

	upDatePositionState();
};

function playAudio() {
	isPlaying = true;
	navigator.mediaSession.playbackState = 'playing';

	buttonPlay.classList.replace('fa-play', 'fa-pause');
	buttonPlay.setAttribute('title', 'pause');
	audio.play().then(upDateMetaData);
};

navigator.mediaSession.setActionHandler('play', playAudio);

function pauseAudio() {
	isPlaying = false;
	navigator.mediaSession.playbackState = 'paused';

	buttonPlay.classList.replace('fa-pause', 'fa-play');
	buttonPlay.setAttribute('title', 'play');
	audio.pause();
};

navigator.mediaSession.setActionHandler('pause', pauseAudio);

buttonPlay.addEventListener('click', () => {isPlaying ? pauseAudio() : playAudio()});

function loadAudio(file) {
	title.textContent = file.displayName;
	artist.textContent = file.artist;
	image.src = `./images/${file.name}.jpg`;
	audio.src = `./audio/${file.name}.mp3`;
};

function skipBackWard(event) {
	const skipTime = event.seekOffset || 10;

	audio.currentTime = Math.max(audio.currentTime - skipTime, 0);

	upDatePositionState();
};

navigator.mediaSession.setActionHandler('seekbackward', skipBackWard);

function skipForWard(event) {
	const skipTime = event.seekOffset || 10;

	audio.currentTime = Math.min(audio.currentTime + skipTime, audio.duration);

	upDatePositionState();
};

navigator.mediaSession.setActionHandler('seekforward', skipForWard);

function previousAudio() {
	index--;

	if (index < 0) index = playList.length - 1;

	loadAudio(playList[index]);
	playAudio();
};

navigator.mediaSession.setActionHandler('previoustrack', previousAudio);

function nextAudio() {
	index++;

	if (index > playList.length - 1) index = 0;

	loadAudio(playList[index]);
	playAudio();
};

navigator.mediaSession.setActionHandler('nexttrack', nextAudio);

function stopAudio() {
	alert('STOP');
};

navigator.mediaSession.setActionHandler('stop', stopAudio);

loadAudio(playList[index]);

function upDateProgressBar(event) {
	if (isPlaying) {
		const { duration, currentTime } = event.srcElement;
		const progressPercentage = (currentTime / duration) * 100;

		progress.style.width = `${progressPercentage}%`;

		const durationMinutes = Math.floor(duration / 60);
		let durationSeconds = Math.floor(duration % 60);

		if (durationSeconds < 10) {
			durationSeconds = `0${durationSeconds}`;
		};

		// delay to avoid 'NaN'
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

function setProgressBar(event) {
	const width = this.clientWidth;
	const clickX = event.offsetX;
	const { duration } = audio;

	audio.currentTime = (clickX / width) * duration;
};

function seek(event) {
	if (event.fastSeek && 'fastSeek' in audio) audio.fastSeek(event.seekTime);
	else audio.currentTime = event.seekTime;

	upDatePositionState();
};

navigator.mediaSession.setActionHandler('seekto', seek);

buttonPrevious.addEventListener('click', previousAudio);
buttonNext.addEventListener('click', nextAudio);
audio.addEventListener('timeupdate', upDateProgressBar);
audio.addEventListener('ended', nextAudio);
progressContainer.addEventListener('click', setProgressBar);