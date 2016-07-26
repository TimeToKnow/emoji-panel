import createPanelInjector from 'inject!src/create-panel';

describe('createPanel', () => {
  let setEventsForTemplateSpy;
  let createPanel;
  const templateStr = 'myTemplate';
  beforeEach(() => {
    setEventsForTemplateSpy = jasmine.createSpy();
    createPanel = createPanelInjector({
      './template.ahtml': templateStr,
      './set-events-for-template': setEventsForTemplateSpy
    }).default;
  });
  it('creates a div with class `ep-container` and template inside it and returns it', () => {
    // Just some object for reference
    const returnedValue = createPanel();
    expect(returnedValue.className).toBe('ep-container');
    expect(returnedValue.innerHTML).toBe(templateStr);
  });
  it('calls `setEventsForTemplate` with the div and the template in it and options', () => {
    const options = {};
    const div = {
      setAttribute: () => {}
    };
    spyOn(document, 'createElement').and.returnValue(div);
    createPanel(options);
    expect(setEventsForTemplateSpy).toHaveBeenCalledWith(div, options);
  });
});
