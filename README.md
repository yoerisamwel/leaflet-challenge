# leaflet-challenge

As part of the GWU bootcamp we dove into the Leaflet library with JavaScript. We got the following assignment for this part of the bootcamp:

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

The assigment was split in two parts Leaflet 1 and 2.

Leaflet 1

With the d3 library we pull in the JSON script form the USGS website through a URL. A weeks worth of erthquake data was pulled in for the analysis/visualization. With a feature function the features are processed and the markers are created and a GEO-JSON layer was created. Then the map is created using a function and a URL to basemaps. The USA was used as the the default center of the map. Then a legend was added with the earthquake depths as the legend values. Then the color of the markers was set.

![image](https://github.com/yoerisamwel/leaflet-challenge/assets/39857716/89232c0a-f433-4ee4-8466-5f8287ecaf76)

Leaflet 2

With the d3 library we pull in the JSON script form the USGS website through a URL. A weeks worth of erthquake data was pulled in for the analysis/visualization as well as the geograpic coordinates for the teutanic plates. With a feature function the features are processed and the markers are created and a GEO-JSON layer was created. The the map was created and the layers for for both the datasets was created.

![image](https://github.com/yoerisamwel/leaflet-challenge/assets/39857716/1eedf8ba-2cb9-4897-be72-b695b5a4b647)
