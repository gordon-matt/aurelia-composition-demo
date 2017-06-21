import {bindable, useShadowDOM} from 'aurelia-templating';

@useShadowDOM({mode: 'closed'})
export class NameTag {
  @bindable color;
}
