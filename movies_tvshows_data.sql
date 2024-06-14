CREATE TABLE "tv_shows" (
    "count" int,
    "ID" int,
    "Title" varchar(500),
    "Year" int,
    "Age" varchar(100),
    "IMDb" varchar(100),
    "rottentomatoes" varchar(100),
    "Netflix" int,
    "Hulu" int,
	"PrimeVideo" int,
    "Disney" int,
    "Type" int,
    CONSTRAINT "pk_tv_shows" PRIMARY KEY (
        "count","ID","Title"
     )
);

CREATE TABLE "MoviesOnStreamingPlatforms" (
    "count" int,
    "ID" int,
    "Title" varchar(500),
    "Year" int,
    "Age" varchar(100),
    "rottentomatoes" varchar(100),
    "Netflix" int,
    "Hulu" int,
	"PrimeVideo" int,
    "Disney" int,
    "Type" int,
    CONSTRAINT "pk_MoviesOnStreamingPlatforms" PRIMARY KEY (
        "count","ID","Title"
     )
);

CREATE TABLE "netflix_titles" (
    "show_id" varchar(100),
    "type" varchar(100),
    "title" varchar(1000),
    "director" varchar(1000),
    "cast" varchar(10000),
    "country" varchar(10000),
    "date_added" varchar(100),
    "release_year" int,
    "rating" varchar(100),
    "duration" varchar(100),
    "listed_in" varchar(100),
    "description" varchar(10000),
    CONSTRAINT "pk_netflix_titles" PRIMARY KEY (
        "show_id","title"
     )
);

SELECT * FROM netflix_titles;
SELECT * FROM "MoviesOnStreamingPlatforms";
SELECT * FROM tv_shows;