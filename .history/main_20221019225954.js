// App music

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('playlist');

const app = {
    songs:  [
    {
      name: "Mặt mộc",
      singer: "Vân Anh",
      path: "https://playsetmusic.com/download/OIVH8LSktGZR",
      image:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fv1ADEPnPt54%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dv1ADEPnPt54&tbnid=wB4bEGrtLROd8M&vet=12ahUKEwiKv4mWyuz6AhWSKqYKHXMhCG8QMygBegUIARC2AQ..i&docid=tK9YIIWDeSERLM&w=1280&h=720&itg=1&q=mat%20moc%20van%20anh&ved=2ahUKEwiKv4mWyuz6AhWSKqYKHXMhCG8QMygBegUIARC2AQ",
    },
    {
      name: "Waiting for you",
      singer: "Mono",
      path: "https://playsetmusic.com/download/R8MQzb3Z8Gyd",
      image:
        "https://media.yeah1.com/files/nguyetthao/2022/09/10/top-1-apple-music-212639.jpg",
    },

    {
      name: "Đế Vương",
      singer: "Đình Dũng",
      path: "https://playsetmusic.com/download/wO4cfN8f65Ng",
      image:
        "data:image/jpeg;base64,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",
    },

    {
      name: "Save me",
      singer: "Dream",
      path: "https://playsetmusic.com/download/zSgWoxAQ968k",
      image:
        "data:image/jpeg;base64,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",
    },
  ],

  render: function () {
    const htmls = this.songs.map((song) => {
        return `
        <div class="playlist">
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
        
      </div>
      
        `;
      });
      playlist.innerHTML = htmls.join('\n');
  },

  start: function () {
    this.render();
  },
}
app.start();
