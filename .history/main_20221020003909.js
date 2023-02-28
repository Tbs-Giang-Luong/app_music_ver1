// App music

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $(".playlist");
const cd = $(".cd")

const app = {
  songs: [
    {
      name: "Mặt mộc",
      singer: "Vân Anh",
      path: "https://playsetmusic.com/download/OIVH8LSktGZR",
      image: "./asset/img/Mat moc.png",
    },
    {
      name: "Waiting for you",
      singer: "Mono",
      path: "https://playsetmusic.com/download/R8MQzb3Z8Gyd",
      image: "./asset/img/wating for you.jpg",
    },
    {
      name: "Đế Vương",
      singer: "Đình Dũng",
      path: "https://playsetmusic.com/download/wO4cfN8f65Ng",
      image: "./asset/img/De vuong.jpg",
    },
    {
      name: "Mặt mộc",
      singer: "Vân Anh",
      path: "https://playsetmusic.com/download/OIVH8LSktGZR",
      image: "./asset/img/Mat moc.png",
    },
    {
      name: "Waiting for you",
      singer: "Mono",
      path: "https://playsetmusic.com/download/R8MQzb3Z8Gyd",
      image: "./asset/img/wating for you.jpg",
    },
    {
      name: "Đế Vương",
      singer: "Đình Dũng",
      path: "https://playsetmusic.com/download/wO4cfN8f65Ng",
      image: "./asset/img/De vuong.jpg",
    },
    {
      name: "Waiting for you",
      singer: "Mono",
      path: "https://playsetmusic.com/download/R8MQzb3Z8Gyd",
      image: "./asset/img/wating for you.jpg",
    },
    {
      name: "Đế Vương",
      singer: "Đình Dũng",
      path: "https://playsetmusic.com/download/wO4cfN8f65Ng",
      image: "./asset/img/De vuong.jpg",
    },
    {
      name: "Mặt mộc",
      singer: "Vân Anh",
      path: "https://playsetmusic.com/download/OIVH8LSktGZR",
      image: "./asset/img/Mat moc.png",
    },
    {
      name: "Waiting for you",
      singer: "Mono",
      path: "https://playsetmusic.com/download/R8MQzb3Z8Gyd",
      image: "./asset/img/wating for you.jpg",
    },
    {
      name: "Đế Vương",
      singer: "Đình Dũng",
      path: "https://playsetmusic.com/download/wO4cfN8f65Ng",
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

  handleEvent: function () {
    const cdWidth = cd.offsetWidth;
    document.onscroll = function () {
      
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth + 'px';
    };
  },

  start: function () {
    this.handleEvent();

    this.render();
  },
};

app.start();
