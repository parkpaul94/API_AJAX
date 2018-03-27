$(document).ready(function() {

    var actions = ["Bleach", "Anime", "DBZ", "Friends", "HIMYM", "Funny", "Sad", "Memes", "Walking Dead", "Dogs", "Cats"];
    var searchText = "";
    function displayGifButtons(){
        $("#BDiv").empty();
        for (var i = 0; i < actions.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", actions[i]);
            gifButton.text(actions[i]);
            $("#BDiv").append(gifButton);
        }
    }
    
    function newButton(){
        event.preventDefault();
        $("#add").on("click", function(){
            
        var action = $("#searchbar").val().trim();
        if (action == ""){
          return false;
        }
            $("#searchbar").val('');
        actions.push(action);
        displayGifButtons();
        return false;
        
        });
        
    }
    
    function RemoveLast(){
        $("#remove").on("click", function(){
        $("button:last").remove();
        actions.pop();
        });
    };
    
    function displayGifs(){
        var action = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=15";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response);
            $("#gifdisplay").empty();
            var results = response.data;
            if (results == ""){
              alert("There weren't any results for your search...");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#gifdisplay").prepend(gifDiv);
            }
        });
    }
    displayGifButtons();
    newButton();
    RemoveLast();
    
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
    