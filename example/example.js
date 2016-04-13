import EmojiWindow from 'emoji-window';

document.getElementById('button-example-1').addEventListener('click', e => {
  new EmojiWindow({
    position: {
      el: e.target
    }
  });
});
