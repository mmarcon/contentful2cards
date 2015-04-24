;(function($, M, w, d){
    var CONTENTFUL_PUB_URL = 'https://cdn.contentful.com/spaces/ytivo3qay7d1/entries?access_token=605db5b74362fa9a550103eb2a64e4c75678ea9db025ee622ddcc69766f81879';

    function lazyCacheImage(url, callback) {
        var image = new Image();
        image.onload = function(){
            callback(url);
        };
        image.src = url;
    }

    $(function(){
        var template = $('#card-reveal-template').html(), cards = $('.cards');
        M.parse(template);
        $.get(CONTENTFUL_PUB_URL, function(data){
            var rendered = '';
            data.items.forEach(function(i){
                var place = {
                    name: i.fields.name,
                    location: i.fields.location.lat + ',' + i.fields.location.lon
                };
                rendered += M.render(template, place);
            });
            cards.html(rendered);
            $('.lazy-image').each(function(_, i){
                var image = $(i);
                lazyCacheImage(image.data('src'), function(url){
                    image.attr('src', url);
                })
            });
        });
    });
}(jQuery, Mustache, window, document));