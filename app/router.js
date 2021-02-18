'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get("/getcsrf",controller.home.getcsrf);
  router.post('/form', controller.home.forms);
  router.post('/getrar', controller.home.downloads)
};
