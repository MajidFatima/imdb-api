const api_url = 'http://www.omdbapi.com/';	
var request_details = new XMLHttpRequest

function search_movie()
{
  document.getElementById("movie-details").style.display = "block"
    var movie_searched = document.getElementById("search_name").value;	
    var api_key = document.getElementById("api_key").value;				
    request_details.open('GET', api_url+'?apikey=' + api_key +'&s='+movie_searched.toLowerCase(), true);
    request_details.onload = function () {
       var movie_list = JSON.parse(this.response);
      if(movie_list.Response != "False") {
        document.getElementById("movie-details").innerHTML = '<h3>' +  movie_list.Search.length + ' Title Found </h3>';
        movie_list.Search.forEach(movie => {
          var movie_details = new XMLHttpRequest();
          movie_details.open('GET', api_url+'?apikey=' + api_key +'&i='+movie.imdbID+'&plot=full', true);
          movie_details.onload = function () {
            var movie_details = JSON.parse(this.response);
            var content = '<div class="card p-2 m-2"><h1>' + movie_details.Title + '(' + movie_details.Year +')</h1>';
              if(!(movie_details.Poster  === "N/A")) { content += '<div class="row m-0"><div class="col-sm-4"><img src="' + movie_details.Poster + '" style="width: 100%"></div>'; }
              content += '<div class="col-sm-8"><h4>IMDB RATING: ' + movie_details.imdbRating + '/10</h4>';
              content += '<ul> <li> <b>Type</b>: ' + movie_details.Type + '</li>';
              content += '<li> <b>Genre</b>: ' + movie_details.Genre + '</li>';
              content += '<li> <b>Language </b>: ' + movie_details.Language + '</li>';
              content += '<li> <b>Director</b>: ' + movie_details.Director + '</li>';
              content += '<li> <b>Actors</b> : ' + movie_details.Actors + '</li></ul>';
              content += '<div class="font-weight-bold">Plot</div><div>' + movie_details.Plot + '</div></div></div></div>';
              document.getElementById("movie-details").innerHTML += content; 
          }
          movie_details.send();

        });
      }
      else
      {
        document.getElementById("movie-details").innerHTML = '<h3>We were unable to find titles matching - ' + movie_searched +' - on IMDB. </h3> <div>ERROR DESCRIPTION: ' + movie_list.Error +'</div>';

      }
    }
      request_details.send();

}
