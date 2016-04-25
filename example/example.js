import EmojiPanel from 'emoji-panel';

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

// ***************************************
// End of examples
// ***************************************
