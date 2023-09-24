# What
This is a simple website that displays a list of Trailhead modules with their calculated PPM (points per minute) value. The list is sorted by PPM value, but can also be sorted by module points or minutes. It started off as a [Google Sheet](https://docs.google.com/spreadsheets/d/1_9YO8dsBjTuU1z90PO0GK6fIzvWCvXJv99gXiyhHVrg/edit?usp=sharing), but I wanted to make it easier to use on mobile devices, as well as just overall better looking.

# Why
This [website](https://trailheadppm.stoiber.network) and [Google Sheet](https://docs.google.com/spreadsheets/d/1_9YO8dsBjTuU1z90PO0GK6fIzvWCvXJv99gXiyhHVrg/edit?usp=sharing) was created for anyone trying to optimize their Trailhead point gain. 

# How
All the data comes from the Trailhead GraphQL API. The data is fetched using a Node.js script and stored in a JSON file. Since the modules don't get updated very often, the data is fetched and published manually every so often. A JSON array containing all the modules can be found in the `modules.json` file.

# Who
Hey there! 👋 My name is Daniel Stoiber, I'm currently a student and full-stack developer. If you'd like to check out some of my work you can do so [here](https://daniel.stoiber.network). If you have any questions or feedback, feel free to shoot me an email at [daniel@stoiber.network](mailto:daniel@stoiber.network).