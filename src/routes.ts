import {activationStrategy} from 'aurelia-router';

export default [
  { route: '', title: 'Introduction' },
  { route: 'conventional-components', title: 'Conventional Components' },
  { route: 'configured-components', title: 'Configured Components' },
  { route: 'html-components', title: 'HTML Components' },
  { route: 'the-component-lifecycle', title: 'The Component Lifecycle' },
  { route: 'shadow-dom', title: 'Shadow DOM' },
  { route: 'part-composition', title: 'Part Composition' },
  { route: 'dynamic-composition', title: 'Dynamic Composition' }
].map(x => {
  return {
    route: x.route,
    moduleId: `./demo-page`,
    title: x.title,
    nav: true,
    activationStrategy: activationStrategy.replace,
    settings: { view: `./pages/${x.route || 'home'}.html` }
  };
});
