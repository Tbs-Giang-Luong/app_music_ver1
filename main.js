// App music

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const STORAGE_KEY = "Player_F8";
const playList = $(".playlist");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");

const volume = $('#volume')


const showNumberVolume = $('.showNumberVolume')

const valueVolume = $('input[id ="setVolume"]')
const iconVolume = $('.iconVolume')






const currentTimeMusic = $(".timeMusic");

const app = {
  isPlaying: false,
  isRandom: false,
  isReapeat: false,
  isSongActive: false,
  isMute:false,
  currentIndex: 0,
  config: JSON.parse(localStorage.getItem(STORAGE_KEY)) || {},
  setConfig(key, value) {
    this.config[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.config));
  },
  
  songs: [
    {
      name: "Mặt mộc",
      singer: "Vân Anh",
      path: "./asset/music/song1.mp3",
      image: "./asset/img/song1.png",
    },
    {
      name: "Waiting for you",
      singer: "Mono",
      path: "./asset/music/song2.mp3",
      image: "./asset/img/song2.jpg",
    },
    {
      name: "Dừng thương",
      singer: "Datkaa",
      path: "./asset/music/song3.mp3",
      image: "./asset/img/song3.jfif",
    },
    {
      name: "Lấy chồng sớm làm gì ",
      singer: "Huong Ly covẻ",
      path: "./asset/music/song4.mp3",
      image: "./asset/img/song4.jfif",
    },
    {
      name: "Mập Mờ",
      singer: "Dunghoangpham Cover",
      path: "./asset/music/song5.mp3",
      image: "./asset/img/song5.jfif",
    },
    {
      name: "Mặt mộc",
      singer: "Vân Anh",
      path: "./asset/music/song1.mp3",
      image: "./asset/img/song1.png",
    },
    {
      name: "Waiting for you",
      singer: "Mono",
      path: "./asset/music/song2.mp3",
      image: "./asset/img/song2.jpg",
    },
    {
      name: "Dừng thương",
      singer: "Datkaa",
      path: "./asset/music/song3.mp3",
      image: "./asset/img/song3.jfif",
    },
    {
      name: "Lấy chồng sớm làm gì ",
      singer: "Huong Ly covẻ",
      path: "./asset/music/song4.mp3",
      image: "./asset/img/song4.jfif",
    },
    {
      name: "Mập Mờ",
      singer: "Dunghoangpham Cover",
      path: "./asset/music/song5.mp3",
      image: "./asset/img/song5.jfif",
    },
  ],

  

 


  render() {
    const html = this.songs.map((song, index) => {
      return `
        <div class="song ${
          index === this.currentIndex ? "active" : ""
        }" data-index = ${index}>
            <div class="thumb"
                style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
      `;
    });
    playList.innerHTML = html.join("");
  },

  defindProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    
     
  

    // Xử lý khi quay và dừng cd

    const cdThumbAnimated = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 80000,
      iterations: Infinity,
    });

    cdThumbAnimated.pause();

    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // Xử lý khi bài hát bị paused
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimated.pause();
    };
    // Xử lý khi bài hát được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimated.play();
    };
    
    
    // volume
    
  
    //Lắng nghe khi tiến độ bài hát thay dổi

    audio.ontimeupdate = function () {
      if (audio.duration) {
        const timePersent = (audio.currentTime / audio.duration) * 100;

        progress.value = timePersent;

        const audioTime1 = Math.floor(audio.currentTime % 60);
        const audioTime2 = Math.floor(audio.currentTime / 60);
        const audioDuration1 = Math.floor(audio.duration % 60);
        const audioDuration2 = Math.floor(audio.duration / 60);
        currentTimeMusic.innerHTML = `
        <span class="currentTimeMusic">${audioTime2}:${audioTime1}</span> - 
        <span class="timeDurationMusic">${audioDuration2}:${audioDuration1}</span>
        `;
      }
    };

    // Xử lí khi tua bài hát

    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    
 

    // hanlde when next Song

    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollIntoSongActive();
    };

    //handle when click prevSong

    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollIntoSongActive();
    };

    //handle when click  on /off repeatSong

    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);

      randomBtn.classList.toggle("active", _this.isRandom);
      // _this.playRandomSong();
    };

    //handle whne click repeatBtn

    repeatBtn.onclick = function () {
      _this.isReapeat = !_this.isReapeat;
      _this.setConfig("isReapeat", _this.isReapeat);

      repeatBtn.classList.toggle("active", _this.isReapeat);
    };
    
    //handle volume mute or no mute 
    
   
  
   

    // handle when audio onended

    audio.onended = function () {
      if (_this.isReapeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // handle when click to song play

    playList.onclick = function (e) {
      const nodeElement = e.target.closest(".song");
      if (nodeElement || e.target.closest(".options")) {
        // Xử lý khi click vao bai hat
        if (nodeElement) {
          _this.currentIndex = Number(nodeElement.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }
        // Xử lý hành vi khi click vào option
        else if (e.target.closest(".options")) {
        }
      }
    };
    
    
    
  },
  
  

  // nextSong
  nextSong() {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  //prevSong
  prevSong() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  loadCurrentSong() {
    heading.textContent = app.currentSong.name;
    cdThumb.style.backgroundImage = `url('${app.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  // playRandomSong

  playRandomSong() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  //Kéo tới bài hát đươc active
  scrollIntoSongActive() {
    const songActive = $(".song.active");

    setTimeout(() => {
      songActive.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);
  },

  //  audio.ontimeupdate = function () {
  //   // const currentTime = Number(audio.currentTime);
  //   const currentTime = Number(audio.currentTime);
  //   currentTimeMusic.innerHTML = currentTime;

  //   const timeDuration = audio.duration;
  //   timeDurationMuisc.innerText = timeDuration;
  // },

  //Load config từ localStorage

  loadConfig() {
    this.isRandom = this.setConfig.isRandom;
    // randomBtn.classList.toggle("active", this.isRamdom);

    this.isReapeat = this.setConfig.isReapeat;
    // repeatBtn.classList.toggle("active", this.isReapeat);
    // randomBtn.classList.toggle("active", this.isRamdom);
  },
  
  
  
  // changeVolume (value) {
  //   console.log(valueVolume.value)
  
  // },

  

  start: function () {
 
    this.loadConfig();
    // this.getcurrentTimeMusic();
    this.defindProperties();

    this.loadCurrentSong();

    this.handleEvent();


    this.render();
    repeatBtn.classList.toggle("active", this.isReapeat);
    randomBtn.classList.toggle("active", this.isRamdom);
  },
};

function setVolume (param) {

  showNumberVolume.innerHTML = param
  audio.volume = param/100
};
 function handleVolume(){
  this.isMute = !this.isMute
  if(this.isMute){
    audio.muted =false
    iconVolume.classList.remove('muted')
    console.log(this.isMute)
  }else{
    audio.muted= true
    iconVolume.classList.add('muted')
  }
  
  
}  



app.start(
 

);
