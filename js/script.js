
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
    $nytElem.text("");
    $nytElem.append("What's going on in \"" + $address + "\", according to <a href='https://www.nytimes.com/'>NY Times</a>:");

    $greeting.text('So you want to live at ' + $address);

    // load streetview
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?location=' + $address + '&size=456x456&key=AIzaSyDDOcmlGj05utj9s1VXTUCYKx6OByMPRvM">');
    // YOUR CODE GOES HERE!
    console.log($street + $city);

    // NYTimes AJAX request
    var $URL = 'https://api.nytimes.com/svc/search/v2//articlesearch.json?q=' + $street + ' ' + $city + '&api-key=336e8270267142a69c5b1fb8e02d3004&&sort=newest';
    $.getJSON($URL, function(data) {
        var items = [];
        $.each( data.response.docs, function( key, val ) {
            $.each(val, function( key1, val1 ) {
                items.push( "<li id='" + key1 + "'>" + val1 + "</li>" );
            });
        });
       
        $( "<ul/>", {
          "class": "my-new-list",
          html: items.join( "" )
        }).appendTo( "body" );
    });

    return false;
};

$('#form-container').submit(loadData);
