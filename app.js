// Function to build both release year charts based on the csv data
function buildCharts(sample) {
  d3.csv("tv_shows.csv").then(function(tvdata) {
    
  // Define parameters for the buildChart function based on the type (movies or tv shows)
  buildChart(sample,tvdata,"tvshowsperyear","Released TV Shows per Year");
  });

  d3.csv("MoviesOnStreamingPlatforms.csv").then(function(moviedata) {
    
    // Define parameters for the buildChart function based on the type (movies or tv shows)
    buildChart(sample,moviedata,"moviesperyear","Released Movies per Year");
    });

}
// Function to filter the Rotten Tomatoes Score in the dropdown by score intervals
function filterSample(arr, sample) {
  return arr.filter((el) => {
    let scores = sample.split("-");
    let elscore = el.rottentomatoes.split("/");
    return parseInt(elscore[0]) > parseInt(scores[0]) && parseInt(elscore[0]) <= parseInt(scores[1]);
  });
}

// Function to build each of the charts based on the type (movies or tv shows)
function buildChart(sample,data,divname,title){
  
  // Read the data
  let resultedSample = filterSample(data, sample);

  // Take the years
  let years = resultedSample.map(function(film) {
    return film.Year;
    })

  // Calculate how many films were released each year
  let filmsperyear = years.reduce((a, v) => {
    a[v] = (a[v] ?? 0) + 1;
    return a;
  }, {});

  
  let cantYears = Object.entries(filmsperyear).map(([k,v]) => k);
  let cantFilms = Object.entries(filmsperyear).map(([k,v]) => v);
  
  // Build the bar charts with information about number of movies/tv shows released per year
  var trace = {
    x: cantYears,
    y: cantFilms,
    type: 'bar',
    orientation: 'v',
    marker: {
      color: 'rgb(59, 109, 150)'
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
      
  // Render the release year bar charts
  Plotly.newPlot(divname, data, layout);
}

// Function to build both age category charts based on the csv data
function buildCharts2(sample) {
  d3.csv("tv_shows.csv").then(function(tvdata) {
    
  // Define parameters for the buildChart function based on the type (movies or tv shows)
  buildChart2(sample,tvdata,"tvshowsperage","TV Shows per Age Category");
  });

  d3.csv("MoviesOnStreamingPlatforms.csv").then(function(moviedata) {
    
    // Define parameters for the buildChart function based on the type (movies or tv shows)
    buildChart2(sample,moviedata,"moviesperage","Movies per Age Category");
    });

}

// Function to build each of the charts based on the type (movies or tv shows)
function buildChart2(sample,data,divname,title){
 
  // Read the data
  let resultedSample = filterSample(data, sample);
  
  // Take the age categories
  let Agecategories = resultedSample.map(function(film) {
    return film.Age;
  })
  
  // Calculate how many films are in each age category  
  let filmsperyear = Agecategories.reduce((a, v) => {
    a[v] = (a[v] ?? 0) + 1;
    return a;
  }, {});

  
  let cantAgeCat = Object.entries(filmsperyear).map(([k,v]) => k);
  let cantFilmAgeCat = Object.entries(filmsperyear).map(([k,v]) => v);

   
  // Build the bar charts with information about number of movies/tv shows per age category
  var trace = {
    x: cantAgeCat,
    y: cantFilmAgeCat,
    type: 'bar',
    orientation: 'v',
    marker: {
      color: 'rgb(213,211,216)'
    }
  };
  
  var data = [trace];
  
  var layout = {
    title: title,
    height: 400,
    width: 800,
    xaxis: {
      title:{
        text: 'Age Category'
      }}
  };
      
  // Render the release year bar charts
  Plotly.newPlot(divname, data, layout);
}

// Function to build both age category charts based on the csv data
function buildChartsPlatforms(sample) {
  d3.csv("tv_shows.csv").then(function(tvdata) {
    
  // Define parameters for the buildChart function based on the type (movies or tv shows)
  buildChartPlatforms(sample,tvdata,"platformtv","TV Shows per Streaming Platform");
  });

  d3.csv("MoviesOnStreamingPlatforms.csv").then(function(moviedata) {
    
    // Define parameters for the buildChart function based on the type (movies or tv shows)
    buildChartPlatforms(sample,moviedata,"platformmovies","Movies per Streaming Platform");
    });

}

// Function to build the bubble chart based on the type (movies or tv shows)
function buildChartPlatforms(sample,data,divname,title){
  
  // Read the data
  let resultedSample = filterSample(data, sample);

  // Take the information about presence in each streaming platform
  let netflix = resultedSample.map(function(film) {
    return film.Netflix;
    })

  let hulu = resultedSample.map(function(film) {
    return film.Hulu;
    })  

  let primevideo = resultedSample.map(function(film) {
    return film.PrimeVideo;
    })

  let disney = resultedSample.map(function(film) {
    return film.Disney;
    })

  // Calculate how many films in each streaming platform  
  let filmsnetflix = netflix.reduce((a, v) => {
    a[v] = (a[v] ?? 0) + 1;
    return a;
  }, {});

  let filmshulu = hulu.reduce((a, v) => {
    a[v] = (a[v] ?? 0) + 1;
    return a;
  }, {});

  let filmsprimevideo = primevideo.reduce((a, v) => {
    a[v] = (a[v] ?? 0) + 1;
    return a;
  }, {});

  let filmsdisney = disney.reduce((a, v) => {
    a[v] = (a[v] ?? 0) + 1;
    return a;
  }, {});

  // Create a list with the information for the y axis
  platformvalues = [filmsdisney[1], filmsnetflix[1], filmshulu[1], filmsprimevideo[1]]
  
  // Build the bubble charts with information about number of movies/tv shows in each streaming platform
  var trace = {
    x: ['disney', 'netflix', 'hulu', 'primevideo'],
    y: platformvalues,
    mode: 'markers',
    marker: {
      size: platformvalues,
      color: platformvalues,
      colorscale: 'Blues'
    },
    text: platformvalues
  };
  
  var data = [trace];
  
  var layout = {
    title: title,
    height: 600,
    width: 1200,
    xaxis: {
      title:{
        text: 'Streaming Platform'
      }}
  };
      
  // Render the release year bar charts
  Plotly.newPlot(divname, data, layout);
}

// Function to run on page load
function init() {
  
  // Use d3 to select the dropdown with id of `#selDataset`
  let dropdown = d3.select("#selDataset");
  
  // Create a list to store the Rotten Tomatoes scores and create the dropdown considering rating categories
  let scores = [];
  
  for (var i = 0; i < 10; i++){
    scores.push(i*10 + "-" + ((i*10)+10));
  }

  scores.forEach((score) => {
        dropdown
            .append("option")
            .text(score)
            .property("value", score);
    });
  
      // Get the first element from the list
      let first_sample = scores[0];
  
      
      optionChanged(first_sample);

}

// Call function
 function optionChanged(newSample) {
   
  // Call functions
   buildCharts(newSample);
   buildCharts2(newSample);
   buildChartsPlatforms(newSample);
 }

// Initialize the dashboard
init();
