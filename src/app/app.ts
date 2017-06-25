import {RouterConfiguration, Router} from 'aurelia-router';
import {TaskQueue} from 'aurelia-task-queue';
import {autoinject} from 'aurelia-dependency-injection'; 
import {DOM} from 'aurelia-pal';
import routes from './routes';

@autoinject
export class App {
  router: Router;
  navigationIsOpen = false;

  constructor(private taskQueue: TaskQueue) {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map(routes);
    this.router = router;
  }

  activate() {
    DOM.addEventListener('keyup', evt => {
      if (evt.keyCode === 34) {
        this.next();
      } else if (evt.keyCode == 33) {
        this.previous();
      }
    }, false);
  }

  requestFullscreen() {
    let docElm = document.documentElement;

    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    }
  }

  toggleNavigation = (event?: Event) => {
    if (this.navigationIsOpen) {
      this.navigationIsOpen = false;
      DOM.removeEventListener('click', this.toggleNavigation, false);
    } else {
      this.navigationIsOpen = true;
      this.taskQueue.queueTask(() => DOM.addEventListener('click', this.toggleNavigation, false));
    }
  }

  next() {
    let index = this.router.routes.indexOf(this.router.currentInstruction.config);

    if ((index + 1) < this.router.routes.length) {
      this.router.navigate(this.router.routes[index + 1].navModel.href);
    }
  }

  previous() {
    let index = this.router.routes.indexOf(this.router.currentInstruction.config);

    if (index > 0) {
      this.router.navigate(this.router.routes[index - 1].navModel.href);
    }
  }
}
