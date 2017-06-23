import {NavModel} from 'aurelia-router';
import {computedFrom} from 'aurelia-binding';
import {InlineViewStrategy} from 'aurelia-framework';
import {relativeToFile} from 'aurelia-path';

export class Demo {
  model: NavModel;
  source: string = '<name-tag></name-tag>';
  requires: string;

  @computedFrom('source')
  get viewSource() {
    return new InlineViewStrategy(`
      <template>
        ${this.requires}
        ${this.source}
      </template>
    `);
  }

  activate(params, instruction: any) {
    this.model = instruction.navModel;
    this.requires = `<require from="./${this.model.settings.folder}/name-tag"></require>`;
  }

  getViewStrategy() {
    return `../${this.model.settings.folder}/index.html`;
  }
}
