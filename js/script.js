
function loadData() {

    var $body = $('body');
    
    var $wikipediaContainer = $('#wikipedia-container');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $nytimesContainer = $('#nytimes-container');
    
    var $street = $('#street').val();
    var $city = $('#city').val();
    var $address = $street + ', ' + $city;

    $greeting.text('So you want to live at ' + $address);

    // Streetview AJAX request
    $body.append('<img class="bgimg" \
        src="https://maps.googleapis.com/maps/api/streetview?location=' 
        + $address + 
        '&size=456x456&key=AIzaSyDDOcmlGj05utj9s1VXTUCYKx6OByMPRvM">');

    // NYTimes AJAX request
    $nytElem.empty();
    $(".article-list").remove();
    $nytimesContainer.append(
        "<ul id='nytimes-articles' class='article-list'>This is what's going on \
        there: </ul>");
    $nytElem = $('#nytimes-articles');

    var $URL = 'https://api.nytimes.com/svc/search/v2//articlesearch.json?q=' + 
        $street + ' ' + $city + 
        '&api-key=336e8270267142a69c5b1fb8e02d3004&&sort=newest';
    $.getJSON($URL)
        .done(function(data) {
            fLen = data.response.docs.length;
            for (i = 0; i < fLen; i++) {
                if (data.response.docs[i].document_type !== "article") {
                    continue;
                }
                var $articleWebUrl = data.response.docs[i].web_url;
                var $headline = data.response.docs[i].headline.main;
                var $snippet = data.response.docs[i].snippet;
                $nytElem.append(
                    "<li class='article'> \
                        <a href='" + $articleWebUrl + "' target='_blank'>" 
                            + $headline + 
                    "   </a> \
                        <BR>" 
                            + $snippet + 
                    "</li>");
            }
        })
        .fail(function(error) {
            $nytElem.text('Not possible to load any article from NY Times this time. Try again later.');
        });

    // Wikipedia(EN) AJAX request
    $wikiElem.remove();
    $wikipediaContainer.append(
        "<ul id='wikipedia-links'>Relevant Wikipedia articles:</ul>");
    $wikiElem = $('#wikipedia-links');
    var $URL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + 
        $city + '&callback=?';
    $.getJSON($URL)
        .done(function(data) {
            fLen = data[2].length;
            for (i = 0; i < fLen; i++) {
                var $headline = data[2][i];
                var $articleWebUrl = data[3][i];
                $wikiElem.append(
                    "<li class='article'> \
                        <a href='" + $articleWebUrl + "' target='_blank'>" 
                            + $headline + 
                    "   </a>" + 
                    "</li>");
            }
        })
        .fail(function(error) {
            $wikiElem.text('Failed to get wikipedia resources');
        });
    return false;
};

$('#form-container').submit(loadData);
