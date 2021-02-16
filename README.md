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

:heavy_exclamation_mark:

### ESM syntax










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
The `--` syntax basicly says 
>'add the following flags or command to the expression on the left'