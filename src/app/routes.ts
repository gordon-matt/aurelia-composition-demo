import {activationStrategy} from 'aurelia-router';
import {join} from 'aurelia-path';

export default [
  { 
    route: '', 
    title: 'Introduction',
    requires: [
      'name-tag'
    ]
  },
  { 
    route: 'conventional-components', 
    title: 'Conventional Components',
    requires: [
      'name-tag'
    ]
  },
  { 
    route: 'configured-components', 
    title: 'Configured Components',
    requires: [
      'name-tag'
    ]
  },
  { 
    route: 'shadow-dom', 
    title: 'Shadow DOM',
    requires: [
      'name-tag'
    ] 
  },
  { 
    route: 'html-components', 
    title: 'HTML Components',
    requires: [
      'name-tag.html'
    ] 
  },
  { 
    route: 'component-lifecycle',
    title: 'The Component Lifecycle',
    requires: [
      'name-tag'
    ]
  },
  { 
    route: 'part-composition', 
    title: 'Part Composition',
    requires: [
      'name-tag'
    ] 
  },
  { 
    route: 'dynamic-composition', 
    title: 'Dynamic Composition',
    requires: [
      'name-tag'
    ]
  }
].map(x => {
  let folder = x.route ? `./${x.route}`  : './introduction';
  return {
    route: x.route,
    moduleId: `./demo-page`,
    title: x.title,
    nav: true,
    activationStrategy: activationStrategy.replace,
    settings: { 
      view: `../${folder}/index.html`, 
      requires: x.requires.map(x => join(folder, x))
    }
  };
});
