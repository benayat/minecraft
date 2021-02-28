# minecraft
notes:
my implementation : I used two classes, one for the shapes(for trees, clouds and trees), and one for the minecraft.
- the shape class also contains the different choises for shapes(3 shapes total). for the tree - one shape.
- the main game\mineCraft class has a big constructor, and all the small functionalities are implemented in class methods. 
- despite that, I decided to implement all the event handlers outside the class, while using  call() and bind() to pass this as a parameter.

- to change apeareances, I used mostly plain css - removing or adding classes did the job. 
randomizing: I randomized the number of trees, clouds and rocks, their shape(choosing between pre-made shapes randomly),
and their placement on the screen - either shape will be chosen, the ground objects will be orders one of each after the other(rock, tree, rock etc..)
- the places on the screen: devided the x-axle by the random chosen number of objects, and each place will randomly be set on one of the places.
- for the sky - the same, just easier: different shapes, placement same as ground objects.

events: for the tools I used radio buttons inside labels, with corresponding background images.
for the inventory I just used  divs, with smaller numbers inside the, which will update on removing and adding things from the inventory.
inserting and removing from the matrix - each square has its own event and handler, related to it's type - remove for filled objects and insert for
empty divs.

rules: 
- shovel can harvest clouds, grass land and dirt:
- pickaxe can harvest only rocks.
- axe can harvest tree logs and leaves. 

object placement: can only be placed above another object.
clouds - no restrictions. 

problems and pending improvements: 
- I used queue-like array to keep everything in memory. it's working fine, but the user has to remember what he took from the inventory. 
the fix will be one of two: either find a spot on the screen to display the memory queue, or just remove the memory and change the inventory from
simple divs to radio buttons like the tools, and than the user won't have to remember. this is my prefered solution.

- maybe adding more shapes and differentiate them from clouds and rocks.

- reset button(that will be added tonight.)

