import getPanelTemplate from './get-panel-template';
import setEventsForTemplate from './set-events-for-template';

export default ({ imageSet, size } = {}) => {
  const panelEl = document.createElement('div');
  panelEl.setAttribute('class', 'ep-container');
  const panelTemplate = getPanelTemplate({ imageSet, size });
  panelEl.innerHTML = panelTemplate;
  setEventsForTemplate(panelEl);

  return panelEl;
};
