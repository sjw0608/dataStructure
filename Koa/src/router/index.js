const Router = require('koa-router');

const { API_PREFIX } = require('../config/config.default');

const router = new Router({ prefix: API_PREFIX });

module.exports = router;