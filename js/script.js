/**
 * Created by deadlove on 12.10.18.
 */
(function ($) {
    $(document).ready(function() {
        const key = "8b4c002003d3d0bf6b77643c2544e4cb";
        const url = "https://api.themoviedb.org/3/search/movie?";
        const img_url = "http://image.tmdb.org/t/p/w500";
        var modal_block = $('<div class="modal"><div class="modal-dialog modal-lg"></div></div>');
        var modal = modal_block.find('.modal-dialog');
        window.search_timeout = 0;
        var input = document.getElementById('search');
        input.onkeyup = function () {
            if(window.search_timeout > 0){
                clearTimeout(window.search_timeout);
            }
            window.search_timeout = setTimeout(function () {
                window.search_timeout = 0;
                var name = document.getElementById('search').value;
                if(name.length > 0) {
                    $.ajax({
                        type: "GET",
                        url: url,
                        data: {
                            api_key: key,
                            language: "ru",
                            query: name
                        },
                        crossDomain: true,
                        dataType: "json", // xml, html, script, json, jsonp, text
                        success: function (data) {
                            $('.film_container').html('');
                            $.each(data.results, function (e, el) {
                                var block = $('<div class="film_block"></div>');
                                var film_name = $("<h2>" + el.title + "</h2>");
                                if (el.poster_path) {
                                    var img = $('<img src="' + img_url + el.poster_path + '">');
                                    img.appendTo(block);
                                }
                                film_name.appendTo(block);
                                block.appendTo(".film_container");

                                block.click(function (e) {
                                    e.preventDefault();
                                    modal.html('');
                                    if (el.poster_path) {
                                        var img = $('<img src="' + img_url + el.poster_path + '">');
                                        img.clone().appendTo(modal);
                                    }
                                    film_name.clone().appendTo(modal);
                                    var overview = $('<p>'+el.overview+'</p>')
                                    overview.clone().appendTo(modal);
                                    modal_block.appendTo("body");
                                    modal_block.modal();
                                });

                            });
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('error');
                        }
                    });
                }}, 1000);
        };
    });
})(jQuery);

// url: "https://api.themoviedb.org/3/movie/550?api_key="+key+"",