import {bindable} from 'aurelia-templating';
import {bindingMode} from 'aurelia-binding';
import {TaskQueue} from 'aurelia-task-queue';
import {autoinject} from 'aurelia-dependency-injection'; 

@autoinject
export class DropDown {
  @bindable items;
  @bindable displayExpression = '$this';
  @bindable({ defaultBindingMode: bindingMode.twoWay }) selectedItem;

  button: HTMLElement;
  listIsOpen = false;

  constructor(private taskQueue: TaskQueue) {}

  select(item) {
    this.selectedItem = item;
  }

  toggleList = (event?: Event) => {
    if (this.listIsOpen) {
      this.listIsOpen = false;
      document.removeEventListener('click', this.toggleList);
    } else {
      this.listIsOpen = true;
      this.taskQueue.queueTask(() => document.addEventListener('click', this.toggleList));
    }
  }
}
