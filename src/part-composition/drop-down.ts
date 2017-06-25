import {bindable, processContent} from 'aurelia-templating';
import {bindingMode} from 'aurelia-binding';
import {TaskQueue} from 'aurelia-task-queue';
import {autoinject} from 'aurelia-dependency-injection'; 
import {DOM, FEATURE} from 'aurelia-pal';

@autoinject
@processContent(childrenAsTemplateParts('selected-item-template', 'list-item-template'))
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

function childrenAsTemplateParts(...partNames: string[]) {
  return function convertChildElementsToTemplateParts(compiler, resources, node: HTMLElement, instruction) {
    let currentChild = node.firstElementChild;

    while (currentChild) {
      let nextSibling = currentChild.nextElementSibling;
      let elementName = currentChild.tagName.toLowerCase();

      if (partNames.indexOf(elementName) !== -1) {
        let template = <HTMLTemplateElement>DOM.createElement('template');
        (<any>FEATURE).ensureHTMLTemplateElement(template);
        let content = template.content;

        while(currentChild.firstChild) {
          content.appendChild(currentChild.firstChild);
        }

        template.setAttribute('replace-part', elementName);
        DOM.replaceNode(template, currentChild, node);
      }

      currentChild = nextSibling;
    }

    return true;
  }
}
