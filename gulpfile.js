const gulp = require('gulp');
const path = require('path');

const config = {
  projectDir: __dirname,
  distDir: path.join(__dirname, 'dist'),
  distFile: path.join(__dirname, 'dist', 'index.js'),
};

gulp.task('serve', () => {
  return require('browser-sync').init({
    server: {
      baseDir: [config.projectDir]
    },
    open: true,
    host: 'localhost',
    browser: 'default',
    notify: false
  });
});

gulp.task('check', () => {
  const eslint = require('gulp-eslint');
  return gulp.src(['index.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build:js', () => {
  const Builder = require('jspm').Builder;
  const builder = new Builder();
  const packageJson = require(path.join(config.projectDir, 'package.json'));
  return beginBuild()
    .then(buildSFX)
    .catch((err) => {
      console.log('\n\tBuild Failed\n', err);
      process.exit(1);
    });
  function beginBuild() {
    builder.reset();
    return builder.loadConfig(path.join(config.projectDir, packageJson.jspm.configFile))
  }

  function buildSFX() {
    const moduleName = './index';
    const buildConfig = {
      format: 'global',
      minify: true,
      sourceMaps: false
    };
    return builder.buildStatic(moduleName, config.distFile, buildConfig);
  }
});
