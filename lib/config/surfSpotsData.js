'use strict';

var surfSpots = 
  [
    {
      "name": "Bolinas",
      "region": "Marin",
      "lat": 37.903574,
      "long": -122.681236,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Cronkhite",
      "region": "Marin",
      "lat": 37.831073,
      "long": -122.54041,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Other",
      "region": "Marin",
      "lat": 38.106467,
      "long": -122.76535,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Fort Point",
      "region": "SF",
      "lat": 37.811649,
      "long": -122.475586,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Deadman\'s",
      "region": "SF",
      "lat": 37.78954,
      "long": -122.499104,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Ocean Beach North",
      "region": "SF",
      "lat": 37.77397,
      "long": -122.516454,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Ocean Beach Middle",
      "region": "SF",
      "lat": 37.751034,
      "long": -122.513892,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Ocean Beach South",
      "region": "SF",
      "lat": 37.735222,
      "long": -122.511384,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Other",
      "region": "SF",
      "lat": 37.780484,
      "long": -122.419281,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Pacifica Pier \/ Sharp Park",
      "region": "San Mateo",
      "lat": 37.632858,
      "long": -122.496443,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Rockaway",
      "region": "San Mateo",
      "lat": 37.610084,
      "long": -122.499146,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Linda Mar",
      "region": "San Mateo",
      "lat": 37.601006,
      "long": -122.502365,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Grey Whale Cove",
      "region": "San Mateo",
      "lat": 37.565025,
      "long": -122.515068,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Montara",
      "region": "San Mateo",
      "lat": 37.55077,
      "long": -122.515755,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "HMB Jetty",
      "region": "San Mateo",
      "lat": 37.500125,
      "long": -122.472239,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "HMB beachbreaks",
      "region": "San Mateo",
      "lat": 37.47227,
      "long": -122.456017,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Other",
      "region": "San Mateo",
      "lat": 37.557642,
      "long": -122.420654,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "A\u00f1o Nuevo",
      "region": "SC North County",
      "lat": 37.115979,
      "long": -122.313194,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Waddell \/ Big Creek",
      "region": "SC North County",
      "lat": 37.096299,
      "long": -122.281995,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Scotts Creek",
      "region": "SC North County",
      "lat": 37.040586,
      "long": -122.232277,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Davenport",
      "region": "SC North County",
      "lat": 37.022599,
      "long": -122.216957,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "4 mile",
      "region": "SC North County",
      "lat": 36.965101,
      "long": -122.123916,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "3 mile",
      "region": "SC North County",
      "lat": 36.961243,
      "long": -122.117329,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Other",
      "region": "SC North County",
      "lat": 36.977872,
      "long": -122.042999,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Natural Bridges",
      "region": "Santa Cruz",
      "lat": 36.949309,
      "long": -122.06008,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Steamer Lane",
      "region": "Santa Cruz",
      "lat": 36.952087,
      "long": -122.023859,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Other",
      "region": "Santa Cruz",
      "lat": 36.954213,
      "long": -122.045403,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "26th Ave",
      "region": "Santa Cruz",
      "lat": 36.955808,
      "long": -121.979313,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Pleasure Point",
      "region": "Santa Cruz",
      "lat": 36.955276,
      "long": -121.971138,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "The Hook",
      "region": "Santa Cruz",
      "lat": 36.959631,
      "long": -121.964421,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Sharks",
      "region": "Santa Cruz",
      "lat": 36.960557,
      "long": -121.963327,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Other",
      "region": "Santa Cruz",
      "lat": 36.960249,
      "long": -121.968241,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Manresa \/ Sunset",
      "region": "Santa Cruz",
      "lat": 36.900075,
      "long": -121.852996,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Moss Landing",
      "region": "Santa Cruz",
      "lat": 36.811069,
      "long": -121.797721,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Other",
      "region": "Santa Cruz",
      "lat": 36.933291,
      "long": -121.856918,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Monterey \/ Carmel",
      "region": "CA",
      "lat": 36.619937,
      "long": -121.983948,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Big Sur",
      "region": "CA",
      "lat": 36.070192,
      "long": -121.661224,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Other",
      "region": "CA",
      "lat": null,
      "long": null,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "West Coast - Other",
      "region": "USA",
      "lat": null,
      "long": null,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "East Coast - Other",
      "region": "USA",
      "lat": null,
      "long": null,
      "default": false,
      "private": false,
      "notes": null
    },
    {
      "name": "Other",
      "region": "International",
      "lat": null,
      "long": null,
      "default": false,
      "private": false,
      "notes": null
    }
  ];

exports.surfSpots = surfSpots;