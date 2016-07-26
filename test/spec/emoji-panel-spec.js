import EmojiPanelInjector from 'inject!src/emoji-panel';

describe('EmojiPanel', () => {
  const panelDiv = document.createElement('div');
  let createPanelSpy;
  let EmojiPanel;
  beforeEach(() => {
    createPanelSpy = jasmine.createSpy().and.returnValue(panelDiv);
    EmojiPanel = EmojiPanelInjector({
      './create-panel': createPanelSpy
    });
  });
  describe('parameters validation - ', () => {
    describe('first arg must be passed and be an element', () => {
      it('which means will not throw on element', () => {
        const div = document.createElement('div');
        new EmojiPanel(div);
      });
      it('which means will throw on textNode', () => {
        const textNode = document.createTextNode('dsf');
        try {
          new EmojiPanel(textNode);
          fail('Expected throw');
        } catch (e) {
          // Expected throw
        }
      });
      it('which means will throw on string', () => {
        try {
          new EmojiPanel('Yuval');
          fail('Expected throw');
        } catch (e) {
          // Expected throw
        }
      });
      it('which means will throw on number', () => {
        try {
          new EmojiPanel(123);
          fail('Expected throw');
        } catch (e) {
          // Expected throw
        }
      });
    });
    describe('second arg is an object', () => {
      describe('which has prop `animationDuration`, is a number and not required', () => {
        it('which means will not throw on undefined', () => {
          const div = document.createElement('div');
          new EmojiPanel(div, {});
        });
        it('which means will not throw on number', () => {
          const div = document.createElement('div');
          new EmojiPanel(div, { animationDuration: 1000 });
        });
        it('which means will throw on string', () => {
          const div = document.createElement('div');
          try {
            new EmojiPanel(div, { animationDuration: '1234' });
          } catch (e) {
            // Expected throw
          }
        });
      });
      describe('which has prop `onClick`, is a function and not required', () => {
        it('which means will not throw on undefined', () => {
          const div = document.createElement('div');
          new EmojiPanel(div, {});
        });
        it('which means will not throw on function', () => {
          const div = document.createElement('div');
          new EmojiPanel(div, { onClick: () => {} });
        });
        it('which means will throw on string', () => {
          const div = document.createElement('div');
          try {
            new EmojiPanel(div, { onClick: '1234' });
          } catch (e) {
            // Expected throw
          }
        });
        it('which means will throw on number', () => {
          const div = document.createElement('div');
          try {
            new EmojiPanel(div, { onClick: 123 });
          } catch (e) {
            // Expected throw
          }
        });
      });
    });
  });
  it('empties and then appends the panel from `createPanel` to the given div', () => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode('123'));
    new EmojiPanel(div);

    expect(div.children.length).toBe(1);
    expect(div.children[0]).toBe(panelDiv);
  });
  it('calls `createPanel` with `animationDuration` and `eventListeners`', () => {
    const animationDuration = 1;
    const onClick = () => {};
    const div = document.createElement('div');
    new EmojiPanel(div, { animationDuration, onClick });
    expect(createPanelSpy).toHaveBeenCalledTimes(1);

    /**
     * `animationDuration` - duration of scrolling animation
     * `eventListeners` - object with all the events - currently on `click`
     */
    expect(createPanelSpy).toHaveBeenCalledWith({ animationDuration, eventListeners: { onClick } });
  });
});
