const http = {
    ajaxSpinner: function (status) {
        $('body').toggleClass('loading', status);
    },
    cache: {},
    load: function (path, params, callback) {

        var _this = this,
            cacheKey = path + $.param(params);

        if (this.cache[cacheKey] !== undefined) {
            callback(this.cache[cacheKey]);
            return false;
        }

        $.ajax({
            url: path,
            type: 'get',
            dataType: 'text',
            data: params,
            beforeSend: function () {
                _this.ajaxSpinner(true);
            },
            complete: function () {
                _this.ajaxSpinner(false);
            },
            success: function (response) {
                _this.cache[cacheKey] = response;
                callback(response);
            },
            error: function (e) {
                if (e.status === 404) {
                    render.page('notFound');
                }
            }
        });
    },
    getJSON: function (path, params, callback) {

        this.load(path, params, function (response) {
            callback(JSON.parse(response));
        });
    }
};

export default http;