const { src, dest, watch, series, parallel } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const imagemin = require("gulp-imagemin");

const css = (done) => {
  //Compilar sass
  //paso 1-identificar archivo, 2-compilarlo, 3-guardar .css

  src("src/scss/app.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(dest("build/css"));

  done();
};

const dev = () => {
  watch("src/scss/**/*.scss", css);
  watch("src/img/**/*", imagenes);
};

const imagenes = (done) => {
  src("src/img/**/*").pipe(imagemin()).pipe(dest("build/img"));
  done();
};

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = parallel(css, imagenes, dev);

//series - inicia una tarea y cuando la finaliza empieza la otra

//parallel-inicia las tareas al tiempo
