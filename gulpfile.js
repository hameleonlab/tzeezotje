let preprocessor = 'sass'
let fileswatch = 'html,htm,txt,json,md,woff2' 

const { src, dest, parallel, series, watch } = require('gulp')
const browserSync  = require('browser-sync').create()
const bssi         = require('browsersync-ssi')
const ssi          = require('ssi')
const webpack      = require('webpack-stream')
const sass         = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const rename       = require('gulp-rename')
const imagemin     = require('gulp-imagemin')
const del          = require('del')
const cleancss     = require('gulp-clean-css')
const sassglob     = require('gulp-sass-glob')


function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'dist/',
			middleware: bssi({ baseDir: 'dist/', ext: '.html' })
		},
		ghostMode: { clicks: false },
		notify: false,
		online: false
	})
}

function scripts() {
	return src('app/js/**/*.js')
		.pipe(webpack({
			mode: 'production',
			performance: { hints: false },
			module: {
				rules: [
					{
						test: /\.(js)$/,
						exclude: /(node_modules)/,
						loader: 'babel-loader',
						query: {
							presets: ['@babel/env'],
							plugins: ['babel-plugin-root-import']
						}
					}
				]
			}
		})).on('error', function handleError() {
			this.emit('end')
		})
		.pipe(rename('app.min.js'))
		.pipe(dest('dist/js'))
		.pipe(browserSync.stream())
}

function scripts_contrib() {
	return src('app/js_contrib/**/*.js')
		.pipe(dest('dist/js'))
		.pipe(browserSync.stream())
}

function styles() {
	return src([`app/scss/app.scss`, `!app/scss/_*.*`])
        .pipe(eval(`${preprocessor}glob`)())
        .pipe(eval(preprocessor)())
		.pipe(autoprefixer())
		.pipe(cleancss({ level: { 1: { specialComments: 0 } },/* format: 'beautify' */ }))
		.pipe(rename('app.min.css'))
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream())
}

function images() {
	return src(['app/img/**/*'])
		.pipe(imagemin())
		.pipe(dest("dist/img"))
		.pipe(browserSync.stream())
}

async function buildhtml() {
	let includes = new ssi('app/', 'dist/', '/**/*.html')
	includes.compile()
	del('dist/parts', { force: true })
}

function cleandist() {
	return del('dist/**/*', { force: true })
}

function startwatch() {
	watch('app/scss/**/*.scss', { usePolling: true }, styles)
	watch(['app/js/**.js', '!app/js/**/*.min.js'], { usePolling: true }, series(scripts))
	watch('app/img/**/*.{jpg,jpeg,png,webp,svg,gif}', { usePolling: true }, images)
	watch(`app/**/*.{${fileswatch}}`, { usePolling: true }).on('change', series(buildhtml, browserSync.reload))
}

exports.scripts = scripts
exports.scripts_contrib = scripts_contrib
exports.styles  = styles
exports.images  = images
exports.assets  = series(scripts, scripts_contrib, styles, images)
exports.build   = series(cleandist, scripts, scripts_contrib, styles, images, buildhtml)
exports.default = series(scripts, scripts_contrib, styles, images, parallel(browsersync, startwatch))