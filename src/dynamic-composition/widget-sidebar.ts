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
    this.model = null;
  }

  bind() {
    this.sub = this.ea.subscribe('toggle-widget-settings', data => {
      if (this.model === data) {
        this.hide();
      } else {
        this.model = data;
        this.isOpen = true;
      }
    });
  }

  unbind() {
    this.sub.dispose();
  }
}
