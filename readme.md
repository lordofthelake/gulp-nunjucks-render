# gulp-nunjucks-render-env

Render [Nunjucks](http://jlongster.github.io/nunjucks/) templates, with optional Environment.

*Issues with the output should be reported on the Nunjucks [issue tracker](https://github.com/jlongster/nunjucks/issues).*


## Install

Install with [npm](https://npmjs.org/package/gulp-nunjucks)

```
npm install --save-dev gulp-nunjucks-render-env
```


## Example

```js
var gulp = require('gulp');
var nunjucks = require('nunjucks');
var nunjucksRender = require('gulp-nunjucks-render-env');

gulp.task('default', function () {
	var env = new nunjucks.Environment(/* ... */);
    var context = { template: 1, vars: 2, here: 3};
	return gulp.src('src/templates/*.html')
		.pipe(nunjucksRender(context, env))
		.pipe(gulp.dest('dist'));
});
```

## Example with gulp data

```js
var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');

function getDataForFile(file){
    return {
        example: 'data loaded for ' + file.relative
    };
}

gulp.task('default', function () {
	return gulp.src('src/templates/*.html')
	    .pipe(data(getDataForFile))
		.pipe(nunjucksRender())
		.pipe(gulp.dest('dist'));
});
```


## API

### nunjucks-render(context)

Same context as [`nunjucks.render()`](http://jlongster.github.io/nunjucks/api.html#render).

For example
```
nunjucksRender({css_path: 'http://company.com/css/'});
```

For the following template
```
<link rel="stylesheet" href="{{ css_path }}test.css" />
```

Would render
```
<link rel="stylesheet" href="http://company.com/css/test.css" />
```

## License

MIT © [Carlos G. Limardo](http://limardo.org)

## Shout-outs

[Sindre Sorhus](http://sindresorhus.com/) who wrote the original [gulp-nunjucks](https://www.npmjs.org/package/gulp-nunjucks) for precompiling Nunjucks templates. I updated his to render instead of precompile.
