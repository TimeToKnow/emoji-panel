import panelTemplate from './template.ahtml';
import setEventsForTemplate from './set-events-for-template';

export default ({ animationDuration, panelVariables, eventListeners } = {}) => {
  const panelEl = document.createElement('div');
  panelEl.setAttribute('class', 'ep-container');
  panelEl.innerHTML = panelTemplate;
  setEventsForTemplate(panelEl, { animationDuration, panelVariables, eventListeners });

  return panelEl;
};
