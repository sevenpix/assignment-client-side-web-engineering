## Usage

> Note: make sure you have installed Node 4+ and npm 3+ installed. [More info](https://nodejs.org/)
> Note: [gulp](https://www.npmjs.com/package/gulp) must be installed globally - `npm i -g gulp-cli`


```
npm i -g gulp-cli
npm i -g bower
npm i
bower i
gulp serve
```

## ServiceWorker

ServiceWorker is in `src/assets/js/app.js` at the bottom.
ServiceWorker itself is in `src/sw.js`.

|                         |                    | t  |
|------------------------:|--------------------|---:|
| ohne SW                 | DOMContentLoaded   | 1.14s |
|                         | Load               | 1.65s |
|                         | Finish             | 2.89s |
| mit SW                  | DOMContentLoaded   | 1.06s |
|                         | Load               | 1.56s |
|                         | Finish             | 2.57s |
