import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';

@autoinject
export class WidgetSidebar {
  sub: Subscription;
  isOpen = false;
  model: any;

  constructor(private ea: EventAggregator) {}

  hide() {
    this.isOpen = false;
  }

  bind() {
    this.sub = this.ea.subscribe('show-widget-settings', data => {
      this.model = data;
      this.isOpen = true;
    });
  }

  unbind() {
    this.sub.dispose();
  }
}
