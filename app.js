// Function to build both charts based on the csv data
function buildCharts(sample) {
  d3.csv("netflix_tv_shows_and_movies.csv").then(function(data) {
    
    // Filter the type "MOVIE"
    let movies = data.filter(function (movie) {
         return movie.type == "MOVIE";
    });

    // Filter the type "SHOW"
    let tvshows = data.filter(function (tvshow) {
      return tvshow.type == "SHOW";
    });
  
  // Define parameters for the buildChart function based on the type (movies or tv shows)
  buildChart(sample,movies,"bar","Release Movies per Year");
  buildChart(sample,tvshows,"bubble","Release TV Shows per Year");
  });
}

// Function to build each of the charts based on the type (movies or tv shows)
function buildChart(sample,data,divname,title){
  function filterSample(movie) {
    return movie.imdb_score==sample;
  }

  //
  let resultedSample = data.filter(filterSample);

  // 
  let years = resultedSample.map(function(movie) {
    return movie.release_year;
    })

  //   
  let moviesperyear = years.reduce((a, v) => {
    a[v] = (a[v] ?? 0) + 1;
    return a;
  }, {});

  //
  let cantMovies = Object.entries(moviesperyear).map(([k,v]) => v);
  console.log(years);
  
  // Build the bar charts with information about number of movies/tv shows released per year
  var trace = {
    x: years,
    y: cantMovies,
    type: 'bar',
    orientation: 'v',
    marker: {
      color: 'rgb(201, 11, 11)'
    }
  };
  
  var data = [trace];
  
  var layout = {
    title: title,
    height: 400,
    width: 800,
    xaxis: {
      title:{
        text: 'Release Year'
      }}
  };
      
  // Render the bar charts
  Plotly.newPlot(divname, data, layout);
}


// Function to run on page load
function init() {
  d3.csv("netflix_tv_shows_and_movies.csv").then(function(data) {

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");
    
    //
    let scores = data.map(function(movie) {
      return movie.imdb_score;
      }).filter(function (v, i, self) {

      //
      return i == self.indexOf(v);
  }).sort(function sortFunction(a, b) {
    return b - a;
  });
  
    //
    scores.forEach((score) => {
      dropdown
          .append("option")
          .text(score)
          .property("value", score);
  });

    // Get the first element from the list
    let first_sample = scores[0];

    // 
    optionChanged(first_sample);
  });
}

//
 function optionChanged(newSample) {
   
  //
   buildCharts(newSample);
 }

// Initialize the dashboard
init();
