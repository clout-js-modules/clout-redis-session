/*!
 * clout-redis-session
 * Copyright(c) 2015 - 2016 Muhammad Dadu
 * MIT Licensed
 */
const
	debug = require('debug')('clout-redis-session:hooks/middleware'),
	session = require('express-session'),
	RedisStore = require('connect-redis')(session);

module.exports = {
	session: {
		event: 'start',
		override: true,
		priority: 'MIDDLEWARE',
		fn: function (next) {
			var sessionConf = this.config.session,
				sessRedisConf = this.config.session.redis,
				redisConf = this.config.redis;

			!sessionConf.key && (sessionConf.key = 'express.sid');
			!sessionConf.saveUninitialized && (sessionConf.saveUninitialized = false);

			if ((!sessionConf.host || sessRedisConf.host === '<REDIS_HOST>') && redisConf.host) {
				Object.keys(redisConf).forEach(function (key) {
					sessRedisConf[key] = redisConf[key];
				});
			}

			if (sessRedisConf.host === '<REDIS_HOST>') {
				this.logger.warn('Please update settings for redis session');
			}

			sessionConf.store = new RedisStore(sessRedisConf);

			this.config.session = sessionConf;
			this.app.session = session(sessionConf);
			this.app.use(this.app.session);
			next();
		}
	}
};
