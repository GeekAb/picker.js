import {
  Preset,
  Clean,
  CleanJavascripts,
  CleanStylesheets,
  Copy,
  Jekyll,
  CssNano,
  MochaPhantomJs,
  Prepublish,
  PublishBuild,
  PublishGhPages,
  Sass,
  RollupUmd,
  RollupIife,
  ScssLint,
  EsLint,
  Aggregate,
  Uglify,
  series,
  parallel
} from 'gulp-pipeline'
import gulp from 'gulp'
import pkg from './package.json'
import moment = require('moment')

const preset = Preset.baseline()

const rollupConfig = {
  options: {
    moduleName: 'picker',
    banner: `/*!
  * ${pkg.name} v${pkg.version} (${pkg.homepage})
  * Copyright ${moment().format("YYYY")} ${pkg.author}
  * Licensed under ${pkg.license}
  */`
  }
}
const copyJsToSite = new Copy(gulp, preset, {
  task: {name: 'dist:js->site'},
  source: {
    options: {cwd: 'dist'},
    glob: ['*.iife*.js']
  },
  dest: 'site/dist/'
})

const copyCssToSite = new Copy(gulp, preset, {
  task: {name: 'dist:css->site'},
  source: {
    options: {cwd: 'dist'},
    glob: ['*.css']
  },
  dest: 'site/dist/'
})

const jsTest = new Aggregate(gulp, 'js:test',
  series(gulp,
    // self executing (fully bundled)
    new RollupIife(gulp, preset, rollupConfig, {
      task: {name: 'rollup:iife:test'},
      source: { // rollup test code - they are ES2015
        options: {cwd: 'test'}
      },
      watch: { // rollup test code - they are ES2015
        options: {cwd: 'test'}
      },
      options: {
        dest: 'picker-tests.iife.js',
        moduleName: 'pickerTests'
      }
    }, {debug: false}),
    new MochaPhantomJs(gulp, preset)
  )
)

const rollupIife = new RollupIife(gulp, preset, rollupConfig, {
  options: {
    dest: 'picker.iife.js'
  }
})

const js = new Aggregate(gulp, 'js',
  series(gulp,
    new CleanJavascripts(gulp, preset),
    new EsLint(gulp, preset),
    parallel(gulp,
      // umd (non-bundled)
      new RollupUmd(gulp, preset, rollupConfig, {
        options: {
          dest: 'picker.umd.js'
        }
      }),
      // self executing (fully bundled)
      rollupIife
    ),
    jsTest,
    copyJsToSite
  )
)

new Aggregate(gulp, 'js:dev',
  series(gulp,
    new CleanJavascripts(gulp, preset),
    rollupIife,
    copyJsToSite
  )
)

const css = new Aggregate(gulp, 'css',
  series(gulp,
    new CleanStylesheets(gulp, preset),
    new ScssLint(gulp, preset),
    new Sass(gulp, preset),
    copyCssToSite
  )
)


const defaultRecipes = new Aggregate(gulp, 'default', series(gulp,
  new Clean(gulp, preset),
  parallel(gulp,
    css,
    js
  )
))


// all - both core and docs
const all = new Aggregate(gulp, 'all',
  series(gulp,
    defaultRecipes,
    parallel(gulp,
      new CssNano(gulp, preset),
      new Uglify(gulp, preset, {
        debug: true,
        task: {name: 'iife:uglify'},
        source: {
          glob: 'picker.iife.js'
        }
      })
    ),
    // pick up minified files
    copyJsToSite,
    copyCssToSite
  )
)

// publish
new Aggregate(gulp, 'publish',

  series(gulp,
    new Prepublish(gulp, preset),   // asserts committed

    all,

    //new Jekyll(gulp, preset, {options: {raw: 'baseurl: "/picker.js"'}}),

    // setup the site in a non-monitored directory - it does it's own git thing.
    new Copy(gulp, preset, {
      task: {name: 'copy:site-to-gh-pages'},
      source: {
        options: {cwd: 'site'},
        glob: ['**']
      },
      dest: '_gh_pages'
    }),

    new PublishBuild(gulp, preset),

    new PublishGhPages(gulp, preset)
  )
)
