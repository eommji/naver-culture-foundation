import gulp from "gulp";
import del from "del";
import image from "gulp-image";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
// import bro from "gulp-bro";
// import babelify from "babelify";
import ghPages from "gulp-gh-pages";

sass.compiler = require("node-sass");

const routes = {
  html: {
    src: "src/*.html",
    dest: "build/"
  },
  img: {
    src: "src/img/*",
    dest: "build/img"
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "build/css"
  },
  js: {
    watch: "src/js/**/*.js",
    src: "src/js/*.js",
    dest: "build/js"
  }
};

const clean = () => del(["build/", ".publish"]);

const html = () => gulp.src(routes.html.src).pipe(gulp.dest(routes.html.dest));

const img = () =>
  gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));

const styles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest(routes.scss.dest));

const js = () =>
  gulp
    .src(routes.js.src)
    // .pipe(
    //   bro({
    //     transform: [babelify.configure({ presets: ["@babel/preset-env"] })]
    //   })
    // )
    .pipe(gulp.dest(routes.js.dest));

const gh = () => gulp.src("build/**/*").pipe(ghPages());

const watch = () => {
  gulp.watch(routes.html.src, html);
  gulp.watch(routes.img.src, img);
  gulp.watch(routes.scss.watch, styles);
  gulp.watch(routes.js.watch, js);
};

const prepare = gulp.series([clean, img]);

const assets = gulp.series([html, styles, js]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build]);
export const deploy = gulp.series([build, gh, clean]);
