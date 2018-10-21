
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    
    var $street = $('#street').val();
    var $city = $('#city').val();
    var $address = $street + ', ' + $city;

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.empty();

    $greeting.text('So you want to live at ' + $address);

    // load streetview
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?location=' + $address + '&size=456x456&key=AIzaSyDDOcmlGj05utj9s1VXTUCYKx6OByMPRvM">');
    // YOUR CODE GOES HERE!
    console.log($street + $city);

    // NYTimes AJAX request
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
                        <p>" 
                            + $snippet + 
                    "   </p> \
                    </li>");
            }
        })
        .fail(function(error) {
            $nytElem.text('Not possible to load any article from NY Times this time. Try again later.');
        });

    return false;
};

$('#form-container').submit(loadData);
