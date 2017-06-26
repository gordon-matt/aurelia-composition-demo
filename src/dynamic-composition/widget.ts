import {bindable, autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@autoinject
export class Widget {
  @bindable model;

  constructor(private ea: EventAggregator) {}

  showSettings() {
    this.ea.publish('toggle-widget-settings', this.model);
  }
}
