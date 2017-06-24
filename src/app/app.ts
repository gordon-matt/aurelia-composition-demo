import {RouterConfiguration, Router} from 'aurelia-router';
import routes from './routes';

export class App {
  router: Router;
  navigationIsOpen = false;
  closeNavigation = () => this.toggleNavigation();

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map(routes);
    this.router = router;
  }

  activate() {
    document.addEventListener('keyup', evt => {
      if (evt.keyCode === 34) {
        this.next();
      } else if (evt.keyCode == 33) {
        this.previous();
      }
    });
  }

  requestFullscreen() {
    let docElm = document.documentElement;

    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    }
  }

  toggleNavigation(event?: Event) {
    if (this.navigationIsOpen) {
      this.navigationIsOpen = false;
      document.removeEventListener('click', this.closeNavigation);
    } else {
      this.navigationIsOpen = true;
      document.addEventListener('click', this.closeNavigation);
    }

    if (event) {
      event.stopPropagation();
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
