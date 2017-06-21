import {RouterConfiguration, Router} from 'aurelia-router';
import routes from './routes';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map(routes);
    this.router = router;
  }

  requestFullscreen() {
    let docElm = document.documentElement;

    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    }
  }
}
