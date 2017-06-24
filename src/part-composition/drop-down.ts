import {bindable} from 'aurelia-templating';
import {bindingMode} from 'aurelia-binding';

export class DropDown {
  @bindable items;
  @bindable displayMemberPath = '$this';
  @bindable({ defaultBindingMode: bindingMode.twoWay }) selectedItem;

  listIsOpen = false;
  closeList = () => this.toggleList();

  select(item) {
    this.selectedItem = item;
  }

  toggleList(event?: Event) {
    if (this.listIsOpen) {
      this.listIsOpen = false;
      document.removeEventListener('click', this.closeList);
    } else {
      this.listIsOpen = true;
      document.addEventListener('click', this.closeList);
    }

    if (event) {
      event.stopPropagation();
    }
  }
}
