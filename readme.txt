let's get right into it since i already talked to you during office hours

there are five screens and three contexts

the general flow between each screen is as follows:

			CREATE
			||
	INDEX => SPACE DOCK => BATTLE
			||
			EDIT
index screen is extremely simple but there are still a few tricks at play
i get a reference to the eurotransaction function because i cannot do that later in indexscreen's heder
	this is for how creating a new fleet from the header costs 100 euros

also there's lose message which also prints a message from a navigate in battlescreen's lose case. i'll get to that in a second

then theres your space dock inspired from the drydock of the last app
	the space dock uses a flatlist similar to what was used in the Blog app
	not much more to see other than how i pass along a screen width and height down to all the later screens, this way i only need to destructure once here
	also creating a new fleet calls the admiral reducer's eurotransaction for -100 space euros

this brings me to what's in each of the contexts
	FleetContext is an array of all fleets. Later on you'll see that I use the icons (which are not unique as identifiers, oops)
		Each fleet looks like this: {name: "Wondrous Wedge", id: 1, icon: "pizza", attack: 100, defense: 100}
		You might notice that theres no health for each fleet so there's no reason why you can't just stack three fleets
	AdmiralContext is an object with keys that represent attributes of your character.
		{nick: "Green", spaceEuros: 300, level: 0}
		nick doesn't add anything to your character but it does represent progression as it comes with a space euro bonus
		spaceEuros are your currency, if you dip below 0 you lose
		level makes the game harder as the higher your level the more attack and defense the enemy will have
	ArmadaContext
		Looks like this: [{wing: "left", attack: 0, defense: 0}, {wing: "center", attack: 0, defense: 0}, {wing: "right", attack: 0, defense: 0}]
		Represents all the fleets currently deployed. May also include enemy fleets when battle is started
		reducer has functions to reset all wings. cannot reset individual wings for some reason don't remember
		also updates the wing based on a new fleet selected
		

Also let me quickly say that the Create and Edit screens are fairly similar to BlogPostForm
	but now theres a modal with a list of each icon

And finally let's talk about the Battle screen
	There's a lot of stuff going on so let jump to the battle. All you need to know is that there's a reusuble comp with vars that are stored on this screen and are updated from player input
	Battle starts by creating enemy fleets by assining attack and defense stats based on player level
	Then battleResults is computed based on the ArmadaState after all those vars on this screen were added to the armadastate
	You win if you have more defense than the enemys combined attack. unfortunately this means that your attack is meaningless right now
	By winning you get 100 euros and level up. If you lose, you lose 100 euros
	Lose 100 euros and you get sent back to the start. Get up to lvl 3 and you are promoted

some things I used that we didn't cover in class that stood out to me was the reduce function, Modals, Dimensions, and Alert

reduce is another array function like filter or map but instead maps through the array as usual and adds up some value to an acc that can then be returned

Modal is a popup window that I toggle on and off. Not much to say here because the modal itself is more of an alternative to an additional page and less of a feature,
but it is nice and holds some important information so don't skip out on it. Also remember to add a button at the end to close the window when you're done.

Remember Cleanphobia? Well I'm sure you remember how the arrows didn't adapt to the desktop screen. But now with Dimensions, the app can get the width and height
of the screen. I can then modify these values as coordinates for the fleetAddIcons.