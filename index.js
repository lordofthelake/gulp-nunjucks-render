
var _        = require('lodash');
var gutil    = require('gulp-util');
var through  = require('through2');
var nunjucks = require('nunjucks');

module.exports = function (options, environment) {
    options = options || {};

    return through.obj(function (file, enc, cb) {

        var data = _.cloneDeep(options);

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.data) {
            data = _.merge(file.data, data);
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-nunjucks', 'Streaming not supported'));
            return cb();
        }

        var _this = this;
        var template = nunjucks.compile(file.contents.toString(), environment, file.path);
        template.render(data, function (err, result) {
            if (err) {
                _this.emit('error', new gutil.PluginError('gulp-nunjucks', err));
            }
            file.contents = new Buffer(result);
            _this.push(file);
            cb();
        });
    });
};
