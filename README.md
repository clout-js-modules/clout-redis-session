clout-redis-session
==================
## Install
In the directory of your clout-js application, do the following;

1) Install this package
```bash
npm install clout-redis-session
```

2) Add this module to ```package.json```
```JSON
{
    ...
    "modules": ["clout-redis-session"]
    ...
}
```

## Configure
Create a new file ```redis.default.js``` or ```redis.<YOUR_ENV>.js``` in ```/conf``` directory with the following JavaScript.
```JavaScript
module.exports = {
    session: {
        redis: {
            host: '<REDIS_HOST>',
            port: '<REDIS_PORT>',
            prefix: 'sess'
        }
    }
};
```

