# Emoji panel
[![Build Status](https://travis-ci.org/TimeToKnow/emoji-panel.svg)](https://travis-ci.org/TimeToKnow/emoji-panel)
[![Coverage Status](https://coveralls.io/repos/github/TimeToKnow/emoji-panel/badge.svg?branch=master)](https://coveralls.io/github/TimeToKnow/emoji-panel?branch=master)
[![npm version](https://badge.fury.io/js/emoji-panel.svg)](https://badge.fury.io/js/emoji-panel)  
> Blazing fast emoji panel (3ms creation)

Create an emoji panel by one line, no akward dependencies, no frameworks using the data from [emoji-data](https://github.com/iamcal/emoji-data).

## Demo
[![Try it out](https://raw.githubusercontent.com/TimeToKnow/emoji-panel/master/resources/demo.jpg)](http://timetoknow.github.io/emoji-panel/)

## Installation
Install the package either by using `npm install emoji-panel` or `bower install emoji-panel`.

## Usage
* for npm users you need to import first -  
``` javascript
// es5
var EmojiPanel = require('emoji-panel');
// es6
import EmojiPanel from 'emoji-panel';
```
* Create  
``` javascript
new EmojiPanel(element, [options])
```
* Params    

|Name|Type|isRequired|Description|
|---|:---:|:---:|---|
|element|Object (node element)|:o:|Node element to create the panel into (preferbly a block)|
|options|Object|:x:|Some added options that can be passed at creation|

* Options  

|Name|Type|Default|Description|
|---|:---:|---|---|
|onClick|Function||Callback of clicking an emoji, will return object with `index` (of the [emoji-data](https://github.com/iamcal/emoji-data) array), and `unified`|
|animationDuration|Number|300|Duration in *ms* of the animation between categories|

* Example  
``` javascript
new EmojiPanel(document.getElementById('emoji-panel-container'), {
  onClick: function(emoji) {
    alert(emoji.unified);
  }
});
```


## Development
* Clone the repo
* `npm start` for development server, serving on `localhost:8080`.  
All changes will trigger hot reload, though absurd files will not and you will need to stop and start the server
* After making a few commits you can deploy and make sure you don't have any uncommited changes beforehand -  
just run `npm run deploy` which does -
  * Creates `lib` (for npm) and `dist` (for bower) folders.
  * bumps `package.json` and `bower.json` (by [`npm run patch`](https://docs.npmjs.com/cli/version)).
  * Commits these changes
  * Create a git tag
  * Merge to `gh-pages` branch (demo site)
  * push tags
  * npm publish (bower publishes or git changes)
  * push changes  

  If you want to bump not by patch, you can set enviroment variable BUMP like so -  
  `BUMP=major npm run deploy`.
read more about [npm version here](https://docs.npmjs.com/cli/version)
