import {bindable} from 'aurelia-templating';
import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';

@autoinject
export class Widget {
  @bindable model;

  constructor(private ea: EventAggregator) {}

  showSettings() {
    this.ea.publish('toggle-widget-settings', this.model);
  }
}
