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

const widgets = [
 {
  type: 'a',
  title: 'Widget A'
 },
 {
  type: 'b',
  title: 'Widget B'
 },
 {
  type: 'c',
  title: 'Widget C'
 },
 {
  type: 'd',
  title: 'Widget D'
 }
];


export default [
  { 
    folder: 'title', 
    title: 'Title',
    view: '../app/title.html'
  },
  { 
    folder: 'agenda', 
    title: 'Agenda',
    view: '../app/agenda.html'
  },
  { 
    folder: 'basic-components', 
    title: 'Basic Components',
    agendaItem: true,
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
    agendaItem: true,
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
    agendaItem: true,
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
    agendaItem: true,
    requires: [
      'name-tag.html'
    ],
    files: [
      'demo.html',
      'name-tag.html'
    ]
  },
  { 
    folder: 'part-composition', 
    title: 'Part Composition',
    agendaItem: true,
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
    agendaItem: true,
    requires: [
      './demo.css',
      './widget',
      './dashboard-sidebar'
    ],
    files: [
      'demo.html',
      'widget.ts',
      'widget.html',
      'dashboard-sidebar.ts',
      'dashboard-sidebar.html'
    ],
    model: {
      people: people,
      dashboard: {
        widgets: widgets        
      }
    }
  },
  { 
    folder: 'review', 
    title: 'Review',
    view: '../app/agenda.html'
  },
  { 
    folder: 'questions', 
    title: 'Q&A',
    view: '../app/questions.html'
  }
].map((x: any) => {
  return {
    route: x.folder === 'title' ? '' : x.folder,
    moduleId: `./demo-page`,
    title: x.title,
    nav: true,
    activationStrategy: activationStrategy.replace,
    settings: { 
      title: x.title,
      agendaItem: !!x.agendaItem,
      view: x.view ? x.view : './demo-page.html', 
      model: x.model,
      requires: x.requires ? x.requires.map(y => join(x.folder, y)) : null,
      files: x.files ? x.files.map(y => join('src', join(x.folder, y))) : null
    }
  };
});
