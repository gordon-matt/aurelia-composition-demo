import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    './elements/monaco-editor',
    './elements/aurelia-logo.html',
    './elements/demo-header.html'
  ]);
}
