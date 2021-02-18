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
- feature/0310-add-first-config-mode-none 
- feature/0312-webpack-dev-server
- feature/04010-composing-configs-webpack-merge
- feature/040101-add-style-loader
- feature/04011-adding-styles-css 
- feature/04012-adding-images 
- feature/04013-adding-presets

---

### Why Webpack ?

#### Origins

There is only 2 ways to run javascript in the browser

- Adding a script tag (with ``src`` attribute)
- Writing javascript in your html (with script tag)

What are the problems ? 

- It doesn't scale (too many script tags in html + browsers have a limit of concurrent requests to fetch data)
- Unmaintainable scripts (Scope - Size - Readability - Fragility - Monolith Files)

---

## Getting started

### Using webpack for the first time

There is 3 ways to use webpack:

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

- The webpack CLI almost every property of a config file is bound to cli arguments and params
  
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

These are various ways to create modules, using ESM syntax (Ecmascript module)

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

Tree shaking (or code elimination) is when Webpack (or any build tool), identifies what you are using and bundles it and only **it** (ex: importing only the loadash functions you use will perform tree shaking, leading to a much smaller bundled package)
By default, when running `yarn webpack`, Webpack will look for a `webpack.config.js`, if there isn't, it will use the default config (cf above)

Setting `mode: false`, webpack will bundle without doing anything else.



❗️❗️❗️Methods inside class can't be tree shaken.

### Webpack bundling walkthrough

Webpack will bundle your app in a `./dist/main.js` by default. It will produce an IIFE, that takes a `modules` arg, that will be an array of IIFEs, which are our modules.
The content of this file is called the **Webpack bootstrap** or more commonly called **Runtime**

How the built file works ? 

- `var installedModules = {}` : is a module cache (ex: useful when a module is used by several modules)
- `function __webpack_require__(moduleId)` : is a function that takes an id and calls the corresponding module and returns its exports if the module is available

So basically, for every modules, Webpack will execute it and returns an export of its content in a form of an object (cf: `build-example-explained.js` file, check for KEY_POINTS-n for order)

## The core concepts

### Entry

Webpack will use this entry point as the first file to load to "kick-off" the app. Everything will start from the entry that you provided in the webpack config or the default one (remember `./src/index`).

```javascript
// webpack.config.js
module.exports = {
  entry: './src/app.js'
}
```

This tells webpack what to load in the browser.
This file compliments the output property.

### Output

The output is where the input provided will be bundled to.

Webpack will understand your code as a "graph", with the nested dependencies , leading to something like a tree, it will keep it in memory and will create a bundle from it.

```javascript
module.exports = {
  entry: './src/app.js',
  output: {
    path: './dist',
    filename: './bundle.js',
  },
}
```

There are way more options for the ouput file, this is just the surface.

Basically, it's just where the bundled file will be created in and the file name. Since Webpack 4, the default path and filename is `./dist/main.js`.

The output tells webpack where and how to distribute the file provided by the `entry`

### Loaders + Rules

A rule set tells webpack how to modify files before webpack adds it to the dependency graph. 

It has at minimum 2 criteria :

- test (a regular expression matching a type of file)

- use (a loader to transform this file into a javascript module)

```javascript
module: {
  rules: [
    {test, /\.ts$/, use: 'ts-loader'},
    {test, /\.js$/, use: 'babel-loader'},
    {test, /\.css$/, use: 'css-loader'},
  ]
}
```

What the sample just above says, ,`apply this node module to this type of file`.

The node module like  `ts-loader` is basically just a function that will parse the file into valid language for the dependency graph that will be used by webpack to bundle it. 

Rule sets can be highly customized.

```javascript
module: {
  rules: [
    {
      ...,
      exclude: [/\.(spec|e2e)\.ts$/],
    }
  ]
}
```

For example, the line just above excludes files containing `.spec` or `.e2e`, since it's testing files, we don't need them in production mode

 A loader takes a source, returns an other one.
 By doing so we can **chain loaders**.

```javascript
rules: [
  {
    test: /\.less$/,
    use: ['style', 'css', 'less']
  }
]
```

These loaders are executed from right to left

```javascript
style(css(less()))
// 'style', 'css', 'less'
```

That's basically what is done under the hood

`style.less -> [less-loader] -> style.css -> [css-loader]-> style.js -> [style-loader] -> inlineStyleInBrowser.js `

The css loader converts the css file in an array of style rules that can be understood by the style-loader that will convert it into a javascript module that will added into a script tag in the browser.

That is one way to do it in webpack, **not the best for performance** . There are Webpack plugins to do it in a much more performance friendly way.

Loaders doesn't not only transform code, you can have loaders that will collect metadata and emit a fil on disk.

❗️❗️❗️
The strings we reference in the `use: []`, are just node_modules references.

### Plugins

A plugin is basically an object (an instance of a class to be more precise), that has a `.prototype.apply` method attached. It allows you to hook into the entire webpack lifecycle of events. Webpack is gonna pass itself as a parameter to this plugin, so this plugin can access to differents events of webpack.

Plugins adds additional functionality to the compilations process. They let you do anything that you can't do with a loader. Loaders are only for files, but with a plugin you can access to a whole bundle.

There are several use cases when you can use plugins: 

- Interact more with the compiler runtime

- Interact with the event lifecycle

- Apply functionality at the bundle level

> 80% of webpack is made up of its own plugin system. 

Webpack itself is a event driven architecture (just like plugins is a way).

```javascript
function BellOnBundlerErrorPlugin () { }

BellOnBundlerErrorPlugin.prototype.apply = function(compiler) {
  if (typeof(process) !== 'undefined') {

    // Compiler events that are emitted and handled
    compiler.plugin('done', function(stats) { 
      if (stats.hasErrors()) { 
        process.stderr.write('\x07'); 
      }
    });

    compiler.plugin('failed', function(err) { 
      process.stderr.write('\x07'); 
    });

  }
}

module.exports = BellOnBundlerErrorPlugin;
```

This plugin basically listens to a done and a fail events. That event passes data and will write a dinging noise based on what the data contains.

```javascript
// require() from node_modules or webpack or local file
var BellOnBundlerErrorPlugin = require(‘bell-on-error’);
var webpack = require(‘webpack’);

module.exports = {
  //...
  plugins: [
    new BellOnBundlerErrorPlugin(),

    // Just a few of the built in plugins
    new webpack.optimize.CommonsChunkPlugin(‘vendors’),
    new webpack.optimize.UglifyJsPlugin()
  ]
  //...
}
```

## Starting out right

This section will cover everything you will find in every webpack config.

Webpack can take an object as a configuration file 

### Intro

```javascript
// webpack.config.js
module.exports = { }
```

But it can also take a function that returns an object

```javascript
module.exports = () => ({ })
```

You can change the output filename like so

```javascript
module.exports = () => ({ 
  output: {
    filename: 'bundle.js'
  }
})
```

### Env variable

```json
"prod": 'npm run webpack --mode production',
// 
"prod" : 'npm run webpack --env.mode production',
```

Using the `--env.mode`, webpack will pass an `env` object with a `mode` property and is gonna be provided to the config., in this case it will be `production`.
So to use it we need to:

```javascript
module.exports = (env) => { 
  console.log(env) // {mode: 'production'}
  return {
    output: {
      filename: 'bundle.js'
    }
  }
})
```

So in order to have a dynamic `mode` we can: 

```javascript
module.exports = ({ mode }) => { 
  console.log(mode) // 'production'
  return {
    mode,
    output: {
      filename: 'bundle.js'
    }
  }
})
```

By doing so, configuring our webpack config, depending on environment is way cleaner and easier to maintain.

### Adding Plugins

The first essential plugin that we can add is the `html-webpack-plugin`

```bash
yarn add html-webpack-plugin --dev
```

and simply add it to the `webpack.config.js`

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({ mode }) => ({
  // ...
  plugins: [
    new HtmlWebpackPlugin()
  ]
})
```

What does it do ? 

When you build your project, with `yarn prod`for instance, it will add a `index.html`file and the output you provided in your config will be appended at the end of your body 

```javascript
<script src="bundle.js"></script>
</body>
```

`HtmlWebpackPluging`is an essential, especially for SPAs or multi Multi Pages Application.

You can also add a plugin to have more informations about your build progress when you are running build commands (ex: `yarn prod`).

You can access all the webpack plugins under the webpack plugins using the dot syntax

```javascript
const webpack = require('webpack')


module.exports = ({ mode }) => ({
  // ...
  plugins: [
    new webpack.ProgressPlugin()
  ]
})
```

Now logs of your build will be more precise and descriptive.

### Webpack dev server

For now, we just saw some features about bundling our code by running commands. Pretty  useful for prod environment but what about dev environment with webpack ? 

This is where the package `webpack-dev-server`comes in.

```bash
yarn add webpack-dev-server --dev
```

Then add a script using this package

```json
// package.json
"webpack-dev-server": "webpack-dev-server"
```

When you run `yarn dev`, it will start a web server, based on express. 
So instead of bundling you code into the `/dist`folder, it will generate a bundle in memory, pass it to express that will use a web-socket to inform that it has been updated and will automatically reload the page.



### Dynamic imports

To not overload your bundle output with modules, you can use the dynamic import syntax

```javascript
const loadModule = () => import('./myModule.js')
```

And then call this `loadModule()` inside whatever callback or function that needs it.



### Composition config

Check branch `feature/04010-composing-configs-webpack-merge` to see how you can compose your webpack configs.

❗️❗️❗️Be careful not using prod features in dev (like hashing)

  

### Using plugins

#### CSS

To see changes happening in dev mode, we have to pass to webpack loaders for css

```javascript
// webpack.config.js
modules: { 
  rules: [
    { test: /\.css$/, use: ['style-loader', 'css-loader'] }
  ]
}
```

`css-loader` will just provide an array that will be usable by `style-loader` that will convert the style into javascript and append a script tag containing the css provided.

#### HMR with Css

From now, in dev mode (with the dev-server), every time we made a change, the browser would reload. Causing state reset that might be quite painful when you only want to change css.

Adding `--hot`at the end of your dev command will set up the Hot Module Replacement feature. It basically patches changes incrementally and applies them without having the browser reloading

`feature/04011-adding-styles-css`. This branch shows how to make usage of the `MiniCssExtractPlugin`. It will take your css files and merge them it into a single css file, then it will append it to the index.html, in the `<head></head>` tag (just like the HtmlWebpackPlugin does with `bundle.js`), very useful in prod environment

### Must haves

What about static assets like jpeg ?
To build them into your output directory or transform then into base64 strings, you can add the `url-loader`.

By default, `url-loader` will transform your image into base64 string.
The problem with that is that it'll burden up your javascript file, depending on the image original weight. You can set a limit on that.

```javascript
  rules: [
    { 
      test: /\.jpe?g$/, 
      use: [
        {
          loader: 'url-loader',
          limit: 5000,
        }
      ],
    }
  ]
```

`use: ['url-loader']` is the shorthand syntax for the sample above.
Behind the scenes, `url-loader`takes the image, puts it in the `/dist` directory and returns it as a dist url. That's what `file-loader`does, that's why you should install both

`url-loader filer-loader`. Url loader calls file loader to produce a dist path filename



### Presets

See branch `feature/04013-adding-presets` , folder `/build-utils/presets` and `package.json` to see how to add presets.



### Webpack bundle analyzer

To see the tree map of your bundle, add the plugin `webpack-bundle-analyzer`



### Compression webpack plugin

This plugin allows you to compress any type of asset you want, even your bundled output. `compression-webpack-plugin`.



### Source maps

[Devtool | webpack](https://webpack.js.org/configuration/devtool/)

---

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

The `--` syntax basically says 

> add the following flags or command to the expression on the left

### ESM

Esm performs live bindings.

> Bindings imported are called live bindings because they are updated by the module that exported the binding.
> Live bindings is a feature that allows us to create cyclical dependencies
> link for what cyclical dependencies are : https://gist.github.com/mpotra/bc8906e2ae7522e7acb3e291a92aa86bx