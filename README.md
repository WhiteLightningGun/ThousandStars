The Thousand Stars.

The first five thousands brightest stars in the entire night sky in nice 3d viewer, down to magnitude 5.99. Made with React, with some nice CSS animations here and there.

https://whitelightninggun.github.io/ThousandStars/

![Screenshot of the Thousand Stars in action](https://github.com/whitelightninggun/ThousandStars/blob/main/thousandstars.PNG)

To-do:

1. Add planets
2. nebulas
3. The ability to rotate the star map to reflect locations on Earth

Discussion of to-do points

1. What do we need to render a planet? We need:

a. right ascension
b. declination
c1. a radius (assuming we will render the planet as a sphere and not an image)
c2. a colour
d. a name

Therefore a planet object could take the form:

{ra: ra, dec: dec, radius: radius, colour: #FF8080, name: "jupiter"}
or
[ra, dec, radius, colour, name]
