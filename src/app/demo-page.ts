import {NavModel} from 'aurelia-router';
import {computedFrom} from 'aurelia-binding';
import {InlineViewStrategy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {relativeToFile} from 'aurelia-path';
import {autoinject} from 'aurelia-dependency-injection';

@autoinject
export class Demo {
  model: NavModel;
  requires: string;
  files: any[];
  activeFile: any;

  constructor(private http: HttpClient) {}

  @computedFrom('files[0].text')
  get previewSource() {
    return new InlineViewStrategy(`
      <template>
        ${this.requires}
        ${this.files[0].text}
      </template>
    `);
  }

  async activate(params, instruction: any) {
    this.model = instruction.navModel;

    if (this.model.settings.requires) {
      this.requires = this.model.settings.requires
        .map(x => `<require from="${x}"></require>`)
        .join('\n');
    }

    if (this.model.settings.files) {
      let responses = await Promise.all(<Promise<Response>[]>this.model.settings.files.map(x => this.http.fetch(x)));
      let fileTexts = await Promise.all(responses.map(x => x.text()));

      this.files = fileTexts.map((text, index) => {
        let name = this.model.settings.files[index];
        return {
          name: name.substring(name.lastIndexOf('/') + 1),
          language: name.indexOf('.ts') !== -1 ? 'typescript' : 'html',
          text
        }
      });

      this.activeFile = this.files[0];
    }
  }

  getViewStrategy() {
    return this.model.settings.view;
  }
}
