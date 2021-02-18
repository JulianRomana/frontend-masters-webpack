# Webpack 4 Fundamentals

## Summary
- Why Webpack ? 
- Getting Started
- The Core Concepts
- Starting out right
- The essentials
- Putting in to practice
- Triage and debug

*link: https://github.com/thelarkinn/webpack-workshop-2018*

branches (same order as in the course):
- feature/01-fem-first-script
- feature/03-fem-debug-script
- feature/031-all-module-types

---
### Why Webpack ?
#### Origins

There is only 2 ways to run javascript in the browser
- Adding a script tag (with ``src`` attribute)
- Writing javacript in your html (with script tag)

What are the problems ? 
- It doesn't scale (too many script tags in html + browsers have a limit of concurrent requests to fetch data)
- Unmaintainable scripts (Scope - Size - Readability - Fragility - Monolith Files)

---
## Getting started

### Using webpack for the first time
There is 3 ways to use webpack
- The webpack config file is just a commonJS module that describes to webpack what you should be doing with this code

```javascript
module.exports = {
  entry: {
    vendor: './src/vendors.ts',
    main: './src/main.browser.ts',
  },
  output: {
    path: 'dist/',
    main: '[name].bundle.js',
  },
}
```

- The webpack CLI almost every proprety of a config file is bound to cli arguments and params
```bash
webpack <entry.js> <result.js> --colors --progress 
 ```

 - The webpack node api, allows you to create your own node wrapper.

Running `yarn webpack` will run successfully without any config file. Why ?

By default, before webpack 4, webpack only needed to specify 2 propreties, input and output, webpack does that by default so people can start using it easily and fastly.
It will look for an entry property by default in `src/index.js`


### Adding npm scripts for environment builds
So you should always have different commands (environments) for builds, so you can have faster builds and/or more optimized builds

```json
"scripts": {
    "webpack": "webpack",
    "dev": "npm run webpack -- --mode development",
    "prod": "npm run webpack -- --mode production"
  },
```

### Debugging
To debug webpack, go to `chrome://inspect` > `Open dedicated DevTools for Node` and run `node --inspect --inspect-brk ./node_modules/webpack/bin/webpack.js`

Especially if you debug custom plugins or custom loaders, using the chrome debug console and breakpoints can be very useful


### First module
By default, webpack will take the output into a folder called `/dist` and a file called `main.js`
Running `node ./dist/main.js `, will execute what's in the input file, so basicly, we created modules and it compiled into a single javascript file.

### Watch mode
The problem with `npm run webpack -- --mode development` that the webpack process stops after the build is finished. What we would need is that every time a file is saved, webpack should recompile so we don't have to type in the command every time.

The watch mode is made for that. Add the flag `--watch` to your dev command `npm run webpack -- --mode development --watch` in order to solve the problem above.

❗️❗️❗️ If you add a file, edit it, and save, you will not see anything in your terminal that runs the dev process, why ?
Since your input file is the `./src/index.js`, if you edit a file that is not used by this file or a module/submodule related to this file, webpack won't know that anything happened somewhere

### Syntaxes

Webpack rules: 
- `You cannot use commonJS and ES syntax in the same file`
- `You cannot use a default and a named export in the same file`
  
You can combine, in your app, esm and commonJS syntax if they are seperated in different files, although it's not advised and bad practice.

The only use case would be a package that exports in commonJS, but since you can use ESM syntax to import commonJS modules, it does'nt matter.

When using named exports and destructuring, you should only pull what you are going to use. Webpack exploits what you import to bundle it.

So if you are using something like loadash (1mo) and you are importing only one function, it will bundle only that function
#### ESM syntax
Webpack supports ESM imports
```javascript
export default () => 'Neo'
export const trinity = 'Trinity'
export { morpheus, theOracle }
---
import NeoTheoGod from './the-matrix-caracters.js' // 'Neo'
import { trinity } from './the-matrix-reloaded.js' // 'Trinity'
```
These are various ways to create modules, using ESM syntax (Ecmascript module


#### CommonJS syntax

Webpack supports commonJS
```javascript
exports.neo = 'neo' // commonJS named export
module.exports = enterTheMatrix // commonJS default export
---
import { neo } from './the-matrix-caracters.js' // 'Neo'
import enterTheMatrixxxx from './the-matrix.js' // Function()
```

### Tree shaking


Tree shaking (or code elimination) is when Webpack (or any build tool), identifies what you are using and bundles it and only **it** (ex: importing only the lodash functions you use will perform tree shaking, leading to a much smaller bundled package)
By default, when running `yarn webpack`, Webpack will look for a `webpack.config.js`, if there isn't, it will use the default config (cf above)

Setting `mode: false`, webpack will bundle without doing anything else.
---


### Webpack bundling walkthrough

Webpack will bundle your app in a `./dist/main.js` by default. It will produce an IIFE, that takes a `modules` arg, that will be an array of IIFEs, which are our modules.
The content of this file is called the **Webpack bootstrap** or more commonly called **Runtime**

How the built file works ? 

- `var installedModules = {}` : is a module cache (ex: usefull when a module is used by several modules)
- `function __webpack_require__(moduleId)` : is a function that takes an id and calls the corresponding module and returns its exports if the module is available
## Complements

### How npm works ?

When typing a command like `npm run webpack`, npm will look for the executable called `webpack` in `node_modules/.bin/`.

These executables all have either a cli or a binary executable.

Npm can compose commands:
```json
"scripts": {
  "webpack": "webpack",
  "dev": "npm run webpack -- --mode development",
}
```
The `--` syntax basicly says 
>'add the following flags or command to the expression on the left'

### ESM 

Esm performs live bindings.

> Bindings imported are called live bindings because they are updated by the module that exported the binding.
> Live bindings is a feature that allows us to create cyclical dependencies
link for what cyclical dependencies are : https://gist.github.com/mpotra/bc8906e2ae7522e7acb3e291a92aa86bx