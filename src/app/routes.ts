import {activationStrategy} from 'aurelia-router';
import {join} from 'aurelia-path';

const people = [
  {
    firstName: 'John',
    lastName: 'Doe',
    favoriteColor: 'blue'
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    favoriteColor: 'red'
  }
];

export default [
  { 
    folder: 'introduction', 
    title: 'Introduction',
    view: '../introduction/index.html'
  },
  { 
    folder: 'conventional-components', 
    title: 'Conventional Components',
    requires: [
      'name-tag'
    ],
    files: [
      'demo.html',
      'name-tag.ts',
      'name-tag.html'
    ]
  },
  { 
    folder: 'configured-components', 
    title: 'Configured Components',
    requires: [
      'name-tag'
    ],
    files: [
      'demo.html',
      'name-tag.ts',
      'name-tag.html'
    ]
  },
  { 
    folder: 'shadow-dom', 
    title: 'Shadow DOM',
    requires: [
      'name-tag'
    ],
    files: [
      'demo.html',
      'name-tag.ts',
      'name-tag.html'
    ] 
  },
  { 
    folder: 'html-components', 
    title: 'HTML Components',
    requires: [
      'name-tag.html'
    ],
    files: [
      'demo.html',
      'name-tag.html'
    ]
  },
  { 
    folder: 'component-lifecycle',
    title: 'The Component Lifecycle',
    requires: [],
    files: [
      'demo.html'
    ]
  },
  { 
    folder: 'part-composition', 
    title: 'Part Composition',
    requires: [
      'drop-down',
      'name-tag.html'
    ],
    files: [
      'demo.html',
      'drop-down.html',
      'drop-down.ts'
    ],
    model: {
      people: people,
      selectedPerson: people[0]
    }
  },
  { 
    folder: 'dynamic-composition', 
    title: 'Dynamic Composition',
    requires: [],
    files: [
      'demo.html'
    ]
  }
].map((x: any) => {
  return {
    route: x.folder === 'introduction' ? '' : x.folder,
    moduleId: `./demo-page`,
    title: x.title,
    nav: true,
    activationStrategy: activationStrategy.replace,
    settings: { 
      title: x.title,
      view: x.view ? x.view : './demo-page.html', 
      model: x.model,
      requires: x.requires ? x.requires.map(y => join(x.folder, y)) : null,
      files: x.files ? x.files.map(y => join('src', join(x.folder, y))) : null
    }
  };
});
