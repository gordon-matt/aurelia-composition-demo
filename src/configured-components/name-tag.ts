import {customElement, useView, bindable} from 'aurelia-templating';

@customElement('name-tag')
@useView('./name-tag.html')
export class NameTag {
  @bindable name;
  @bindable color;
}
