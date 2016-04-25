import EmojiPanel from 'emoji-panel';

new EmojiPanel(document.getElementById('panel-example-1'), { onClick: ({ index } = {}) => {
  console.log(index);
} });
