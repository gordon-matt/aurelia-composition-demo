import {NavModel} from 'aurelia-router';
import {computedFrom} from 'aurelia-binding';
import {InlineViewStrategy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {relativeToFile} from 'aurelia-path';
import {autoinject} from 'aurelia-dependency-injection';
import {Router} from 'aurelia-router';

@autoinject
export class Demo {
  settings: any;
  requires: string;
  files: any[];
  activeFile: any;
  model: any;
  agenda: any[];

  constructor(private http: HttpClient, private router: Router) {}

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
    this.settings = instruction.navModel.settings;
    this.model = this.settings.model;
    this.agenda = this.router.navigation.filter(x => x.settings.agendaItem);

    if (this.settings.requires) {
      this.requires = this.settings.requires
        .map(x => `<require from="${x}"></require>`)
        .join('\n');
    }

    if (this.settings.files) {
      let responses = await Promise.all(<Promise<Response>[]>this.settings.files.map(x => this.http.fetch(x)));
      let fileTexts = await Promise.all(responses.map(x => x.text()));

      this.files = fileTexts.map((text, index) => {
        let name = this.settings.files[index];
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
    return this.settings.view;
  }
}
