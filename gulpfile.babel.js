import {Preset, Clean, CleanJavascripts, CleanStylesheets, Copy, Jekyll, CssNano, MochaPhantomJs, Prepublish, PublishBuild, PublishGhPages, Sass, RollupUmd, RollupIife, ScssLint, EsLint, Aggregate, Uglify, series, parallel} from 'gulp-pipeline'
import gulp from 'gulp'
import pkg from './package.json'
import moment from 'moment'

const preset = Preset.baseline()

const rollupConfig = {
  options: {
    banner: `/*!
  * ${pkg.name} v${pkg.version} (${pkg.homepage})
  * Copyright ${moment().format("YYYY")} ${pkg.author}
  * Licensed under ${pkg.license}
  */`
  }
}

const jsTest = new Aggregate(gulp, 'js:test',
  series(gulp,
    // self executing (fully bundled)
    new RollupIife(gulp, preset, rollupConfig, {
      task: {name: 'rollup:iife:test'},
      source: { // rollup the source code and all test files - they are ES2015
        options: {cwd: 'test'}
      },
      options: {
        dest: 'picker-tests.js.iife.js',
        moduleName: 'pickerTests',
        globals: {
          buffer: 'Buffer'
        }
      }
    }, {debug: true}),
    new MochaPhantomJs(gulp, preset)
  )
)

const js = new Aggregate(gulp, 'js',
  series(gulp,
    new CleanJavascripts(gulp, preset),
    new EsLint(gulp, preset),
    parallel(gulp,
      // umd (non-bundled)
      new RollupUmd(gulp, preset, rollupConfig, {
        options: {
          dest: 'picker.js.umd.js',
          moduleName: 'picker'
        }
      }),
      // self executing (fully bundled)
      new RollupIife(gulp, preset, rollupConfig, {
        options: {
          dest: 'picker.js.iife.js',
          moduleName: 'picker'
        }
      })
    ),
    jsTest
  )
)

const css = new Aggregate(gulp, 'css',
  series(gulp,
    new CleanStylesheets(gulp, preset),
    new ScssLint(gulp, preset),
    new Sass(gulp, preset)
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
        task: {name: 'iife:uglify'},
        source: {glob: '*.iife.js'}
      })
    )
  )
)

// publish
new Aggregate(gulp, 'publish',

  series(gulp,
    new Prepublish(gulp, preset),   // asserts committed

    all,

    //new Jekyll(gulp, preset, {options: {raw: 'baseurl: "/picker.js"'}}),

    new PublishBuild(gulp, preset)

    //new PublishGhPages(gulp, preset, {
    //  options: {
    //    remote: {
    //      repo: 'git@github.com:rosskevin/picker.js.git' // FIXME: temporary, remove this option when we are deploying to our home repo
    //    }
    //  }
    //})
  )
)


//const sandbox = new Copy(gulp, preset, {
//  task: {name: 'sandbox'},
//  source: {
//    options: {cwd: 'sandbox'},
//    glob: ['**/*']
//  },
//  dest: 'dist/'
//})

