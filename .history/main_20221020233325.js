// App music

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const playlist = $(".playlist");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const songActive = $(".song .active");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  songs: [
    {
      name: "Mặt mộc",
      singer: "Vân Anh",
      path: "./asset/music/WaitingForYou-MONOOnionn-7733882.mp3",
      image: "./asset/img/Mat moc.png",
    },
    {
      name: "Waiting for you",
      singer: "Mono",
      path: "./asset/music/WaitingForYou-MONOOnionn-7733882.mp3",
      image: "./asset/img/wating for you.jpg",
    },
    {
      name: "Đế Vương",
      singer: "Đình Dũng",
      path: "./asset/music/DeVuong-DinhDungACV-7121634.mp3",
      image: "./asset/img/De vuong.jpg",
    },
    {
      name: "Mặt mộc",
      singer: "Vân Anh",
      path: "./asset/music/Mat-Moc-Phạm-Nguyen-Ngọc-x-VAnh-x-An-Nhi.mp3",
      image: "./asset/img/Mat moc.png",
    },
    {
      name: "Waiting for you",
      singer: "Mono",
      path: "./asset/music/WaitingForYou-MONOOnionn-7733882.mp3",
      image: "./asset/img/wating for you.jpg",
    },
    {
      name: "Đế Vương",
      singer: "Đình Dũng",
      path: "./asset/music/DeVuong-DinhDungACV-7121634.mp3",
      image: "./asset/img/De vuong.jpg",
    },
    {
      name: "Mặt mộc",
      singer: "Vân Anh",
      path: "./asset/music/Mat-Moc-Phạm-Nguyen-Ngọc-x-VAnh-x-An-Nhi.mp3",
      image: "./asset/img/Mat moc.png",
    },
    {
      name: "Waiting for you",
      singer: "Mono",
      path: "./asset/music/WaitingForYou-MONOOnionn-7733882.mp3",
      image: "./asset/img/wating for you.jpg",
    },
    {
      name: "Đế Vương",
      singer: "Đình Dũng",
      path: "./asset/music/DeVuong-DinhDungACV-7121634.mp3",
      image: "./asset/img/De vuong.jpg",
    },
    {
      name: "Mặt mộc",
      singer: "Vân Anh",
      path: "./asset/music/Mat-Moc-Phạm-Nguyen-Ngọc-x-VAnh-x-An-Nhi.mp3",
      image: "./asset/img/Mat moc.png",
    },
    {
      name: "Waiting for you",
      singer: "Mono",
      path: "./asset/music/WaitingForYou-MONOOnionn-7733882.mp3",
      image: "./asset/img/wating for you.jpg",
    },
    {
      name: "Đế Vương",
      singer: "Đình Dũng",
      path: "./asset/music/DeVuong-DinhDungACV-7121634.mp3",
      image: "./asset/img/De vuong.jpg",
    },
  ],

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
      <div class="song ${index === this.currentIndex ? "active" : ""}">
      <div class="thumb" style="background-image: url('${song.image}')">
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
    playlist.innerHTML = htmls.join("");
  },

  // Xử lý các sự kiện
  handleEvent: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lí cd khi quay

    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iteration: Infinity,
    });

    cdThumbAnimate.pause();

    // Xử lý khi ấn vào nút play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // next bai hat
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

    // lui bai hat
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.scrollIntoSongActive();

    };

    // random bai hat
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    //repeat bai hat
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Khi bài hát được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi bài hát bị pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tua bài hát và tiến độ bài hát thay đổi

    audio.ontimeupdate = function () {
      const progressPresent = (audio.currentTime / audio.duration) * 100;
      progress.value = progressPresent;
    };

    // Xử lí khi tua bài hát
    progress.onchange = function (e) {
      const seekTime = (audio.duration * 100) / e.target.value;
      audio.currentTime = seekTime;
    };
    // Xử lý khi audio ended

    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi clik vào playlist


    playlist.onclick = function () {
      
    }


  },

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.background = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  scrollIntoSongActive: function () {
   setTimeout(()=>{
    songActive.scrollIntoView({
      behavior :"smooth",
      block : "nearest",
      inline :'center'

    })
   },300)
  },



  start: function () {
    // Định nghĩa các thuộc tính
    this.defineProperties();
    // Xử lý các sự kiện
    this.handleEvent();
    // Tải bài hát
    this.loadCurrentSong();
    // render ra giao diện UI
    this.render();
  },
};

app.start();
