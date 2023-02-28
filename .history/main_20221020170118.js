// App music

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const playlist = $(".playlist");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn =$('.btn-toggle-play')


const app = {
  isPlaying: false,
  currentIndex: 0,
  songs: [
    {
      name: "Mặt mộc",
      singer: "Vân Anh",
      path: "./asset/music/Mat-Moc-Phạm-Nguyen-Ngọc-x-VAnh-x-An-Nhi.mp3",
      image: "./asset/img/Mat moc.png",
    },
    {
      name: "Waiting for you",
      singer: "Mono",
      path:"./asset/music/WaitingForYou-MONOOnionn-7733882.mp3",
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
      path:"./asset/music/WaitingForYou-MONOOnionn-7733882.mp3",
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
      path:"./asset/music/WaitingForYou-MONOOnionn-7733882.mp3",
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
      path:"./asset/music/WaitingForYou-MONOOnionn-7733882.mp3",
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
    const htmls = this.songs.map((song) => {
      return `
      <div class="song">
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
   audio.src = this.currentSong.path
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

    // Xử lý khi ấn vào nút play
      playBtn.onclick = function () {
        if(_this.isPlaying){
          _this.isPlaying= false
          audio.pause()
          player.classList.remove('playing');
        }else

        _this.isPlaying= true
        audio.play()
        player.classList.add('playing');
      }
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
