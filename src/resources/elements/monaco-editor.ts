import {bindable} from 'aurelia-templating';
import {bindingMode} from 'aurelia-binding';
import {TaskQueue} from 'aurelia-task-queue';
import {autoinject} from 'aurelia-dependency-injection';
import 'vs/editor/editor.main';

declare var monaco;

//hack
monaco.languages.typescript.typescriptDefaults._compilerOptions.experimentalDecorators = true;

@autoinject
export class MonacoEditor {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) source = '';
  @bindable language = 'html';

  editor: any;
  editorHost: HTMLDivElement;
  guard = false;
  keyUpDisposable: any;

  constructor(private taskQueue: TaskQueue) {}

  sourceChanged(newValue) {
    if (this.guard || !this.editor) {
      return;
    }
    
    this.editor.setValue(newValue);
  }

  languageChanged(newValue) {
    if (this.editor) {
      monaco.editor.setModelLanguage(this.editor.getModel(), newValue);
    }
  }

  attached() {
    this.editor = monaco.editor.create(this.editorHost, {
			value: this.source,
			language: this.language,
      folding: true,
      fontSize: 20,
      tabSize: 2,
      lineHeight: 24
		});

    this.editor.getModel().updateOptions({ tabSize: 2 });

    this.keyUpDisposable = this.editor.onKeyUp(() => {
      let newValue = this.editor.getValue();
      
      if(this.source === newValue) {
        return;
      }
      
      this.guard = true;
      this.source = newValue;
      this.taskQueue.queueMicroTask(() => this.guard = false);
    });
  }

  detached() {
    this.keyUpDisposable.dispose();
    this.editor.dispose();
  }
}
