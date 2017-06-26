import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';
import {bindable} from 'aurelia-templating';

@autoinject
export class DashboardSidebar {
  @bindable dashboard;

  sub: Subscription;
  isOpen = false;
  model: any;

  constructor(private ea: EventAggregator) {}

  hide() {
    this.isOpen = false;
    this.model = null;
  }

  removeWidget() {
    let index = this.dashboard.widgets.indexOf(this.model);
    if (index !== -1) {
      this.dashboard.widgets.splice(index, 1);
    }
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
