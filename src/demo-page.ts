import {NavModel} from 'aurelia-router';

export class Demo {
  model: NavModel;

  activate(params, instruction: any) {
    this.model = instruction.navModel;
  }

  getViewStrategy() {
    return this.model.settings.view;
  }
}
