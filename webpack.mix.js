const mix = require('laravel-mix');

mix.js('src/js/index.js', 'public/assets/js')
    .sass('src/css/app.scss', 'public/assets/css')
    .sourceMaps()
    .browserSync({
        files: ['public/assets/css/*.css', 'public/assets/js/*.js'],
        https: true,
        proxy: 'liftinginspections-temp.ddev.site',
    });
