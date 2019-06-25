import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject as service } from '@ember/service';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  metrics: service(),
  fastboot: service(),

  init() {
    this._super(...arguments);

    this.on('routeDidChange', () => {
      this._trackPage();
    })
  },

  _trackPage() {
    if (this.fastboot.isFastBoot) {
      return;
    }

    const page = this.currentURL;
    const title = this.currentRouteName || 'unknown';

    this.metrics.trackPage({ page, title });
  }
});

Router.map(function() {
});

export default Router;
