const mix = require('laravel-mix');

mix.js('src/js/index.js', 'public/assets/js')
    .sass('src/scss/app.scss', 'public/assets/css')
    .sourceMaps()
    .browserSync('liftinginspections-temp.ddev.site');
