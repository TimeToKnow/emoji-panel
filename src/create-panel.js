import panelTemplate from './template.ahtml';
import setEventsForTemplate from './set-events-for-template';

export default ({ imageSet, size, animationDuration } = {}) => {
  const panelEl = document.createElement('div');
  panelEl.setAttribute('class', 'ep-container');
  panelEl.innerHTML = panelTemplate;
  setEventsForTemplate(panelEl, { animationDuration });

  return panelEl;
};
