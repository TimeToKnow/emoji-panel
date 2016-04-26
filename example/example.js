import EmojiPanel from 'emoji-panel';

let size = '32';
let imageSet = 'apple';
const changeEmojiStylesheet = () => {
  const stylesheet = document.getElementById('emoji-style');
  stylesheet.href = `dist/emoji-panel-${imageSet}-${size}.min.css`;
};
document.getElementById('select-image-set').addEventListener('change', e => {
  imageSet = e.target.options[e.target.selectedIndex].value;
  changeEmojiStylesheet();
});
document.getElementById('select-size').addEventListener('change', e => {
  size = e.target.options[e.target.selectedIndex].value;
  changeEmojiStylesheet();
});

// ***************************************
// Start of examples
// ***************************************

// Example 1
new EmojiPanel(document.getElementById('example-1'));

// Example 2
new EmojiPanel(
  document.getElementById('example-2'), {
    onClick: e => {
      alert(e.index); // eslint-disable-line no-alert
      alert(e.unified);// eslint-disable-line no-alert
    }
  }
);

// Example 3
new EmojiPanel(document.getElementById('example-3'));
document.getElementById('example-3-btn').addEventListener('click', () => {
  document.getElementById('example-3-container').classList.toggle('open');
});

// Example 4
new EmojiPanel(document.getElementById('example-4'));
$('#example-4-btn').click(e => {
  $('#example-4').dialog({
    minWidth: 274,
    height: 600,
    width: 800
  });
});

// Example 5
new EmojiPanel(document.getElementById('example-5'), {
  animationDuration: 1000
});

// ***************************************
// End of examples
// ***************************************
