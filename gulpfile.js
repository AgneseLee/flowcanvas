const gulp = require('gulp');
const gulpLess = require('gulp-less');
const babel = require('gulp-babel');
const gulpRename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
// const gulpTS = require('gulp-typescript');
const gulpEslint = require('gulp-eslint');
const del = require('del');
const uglify = require('gulp-uglify');
const react = require('gulp-react');
// require('babel-polyfill');

const srcPath = './src/';
const distPath = './dist/';
// const tsFiles = [`${srcPath}/**/*.ts`];
// const tsFiles = [`${srcPath}/**/*.ts`];
const lessFiles = [`${srcPath}/**/*.less`];
const weuiLessFile = [`${srcPath}/weui-wxss/src/style/**/*.less`];
const wxmlFiles = [`${srcPath}/**/**/*.wxml`];
const jsonFiles = [
  `${srcPath}/*.json`,
  `${srcPath}/**/**/*.json`,
];
const imgFiles = [
  `${srcPath}/**/*.{png,jpg,svg,gif,ico}`,
  `${srcPath}/**/**/*.{png,jpg,svg,gif,ico}`,
];
const tsFiles = [`${srcPath}/**/*.ts`, `${srcPath}/**/*.tsx`];
const jsFiles = [`${srcPath}/**/*.js`, `${srcPath}/**/*.jsx`];
const jsxFiles = [`${srcPath}/**/**/*.jsx`];
const wxssFiles = [`${srcPath}/**/**/*.wxss`];
const ignoreFiles = ['./src/weui-wxss/**'];

const Lint = () => {
  return gulp.src(['src/**/*.js'], { ignore: ignoreFiles })
    .pipe(gulpEslint({
      useEslintrc: true,
    }))
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
    .pipe(gulpEslint.format())
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
    .pipe(gulpEslint.failAfterError());
};

const LintFix = () => {
  return gulp.src(tsFiles)
    .pipe(gulpEslint({
      fix: true,
    }))
    .pipe(gulpEslint.format())
    .pipe(gulp.dest(srcPath))
    .pipe(gulpEslint.failAfterError());
};

const Clean = (done) => {
  del.sync(['./dist/**']);
  done();
};

const Less = () => {
  return gulp.src(lessFiles, { since: gulp.lastRun(Less), ignore: ignoreFiles })
    .pipe(gulpLess({
      paths: [weuiLessFile],
    }))
  // .pipe(postcss([autoprefixer(['iOS >= 8', 'Android >= 4.1'])]))
    .pipe(cleanCSS())
  // .pipe(
  //   cssnano({
  //     discardComments: { removeAll: true },
  //   })
  // )
    .pipe(gulpRename((curPath) => {
      curPath.extname = '.wxss';
    }))
    .pipe(gulp.dest(distPath));
};

// const TS = () => {
//   const tsProject = gulpTS.createProject('./tsconfig.json');
//   return gulp.src(tsFiles, { since: gulp.lastRun(TS), ignore: ignoreFiles })
//     .pipe(tsProject())
//     .pipe(gulp.dest(distPath));
// };

const CopyWxml = () => {
  return gulp.src(wxmlFiles, { since: gulp.lastRun(CopyWxml), ignore: ignoreFiles })
    .pipe(gulp.dest(distPath));
};

const CopyJson = () => {
  return gulp.src(jsonFiles, { since: gulp.lastRun(CopyJson), ignore: ignoreFiles })
    .pipe(gulp.dest(distPath));
};

const CopyImg = () => {
  return gulp.src(imgFiles, { since: gulp.lastRun(CopyImg), ignore: ignoreFiles })
    .pipe(gulp.dest(distPath));
};

const CopyJs = () => {
  // const isWatching = Object.keys(params).indexOf('watch') > -1;
  // const targetFiles = tsFiles.slice();
  // if (isWatching) targetFiles.push(`!${srcPath}/plugin/config/buildConfig.ts`);

  return gulp.src(jsFiles, { since: gulp.lastRun(CopyJs) })
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(distPath));
};

const compileJsx = () => {
  return gulp.src(jsxFiles)
    .pipe(react({
      es6module: true, // 这里必须要添加该配置项，不然会报Illegal import declaration
    }))
    .pipe(gulp.dest(distPath));
};

const CopyWxss = () => {
  return gulp.src(wxssFiles, { since: gulp.lastRun(CopyWxss), ignore: ignoreFiles })
    .pipe(gulp.dest(distPath));
};

const TaskBuild = gulp.series(Clean, Lint, gulp.parallel(Less, CopyWxml, CopyJson, CopyImg, CopyJs, CopyWxss));
const TaskWatch = () => {
  gulp.watch(imgFiles, CopyImg);
  gulp.watch(jsonFiles, CopyJson);
  gulp.watch(wxmlFiles, CopyWxml);
  gulp.watch(lessFiles, Less);
  gulp.watch(jsFiles, CopyJs);
};

exports.less = Less;
// exports.ts = TS;
exports.build = TaskBuild;
exports.watch = TaskWatch;
exports.clean = Clean;
exports.lint = Lint;
exports.fix = LintFix;
