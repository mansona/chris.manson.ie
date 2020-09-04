import EmberRouter from '@ember/routing/router';
import config from 'coders-log/config/environment';

import { inject as service } from '@ember/service';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;

  @service metrics;
  @service fastboot;

  constructor() {
    super(...arguments);

    this.on('routeDidChange', () => {
      this._trackPage();
    })
  }

  _trackPage() {
    if (this.fastboot.isFastBoot) {
      return;
    }

    const page = this.currentURL;
    const title = this.currentRouteName || 'unknown';

    this.metrics.trackPage({ page, title });
  }
}

Router.map(function() {
});
