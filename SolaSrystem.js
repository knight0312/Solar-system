const illo = new Zdog.Illustration({
  element: '#z-dog',    
	dragRotate: true,
	zoom: 0.7,
	resize: "fullscreen",
	rotate: {
		x: 90,
		y: -9.2,
	}
});

const orbitColor = '#fff', orbitSize = 0.1;

const planets = [
	{
		name: 'mercury',
		color: '#bbbbbb',
		size: 10,
		orbitDiameter: 380,
		velocity: 0.03,
	},
	{
		name: 'venus',
		color: '#ffa36c',
		size: 7,
		orbitDiameter: 450,
		velocity: 0.02,
	},
	{
		name: 'earth',
		color: '#3282b8',
		size: 15,
		orbitDiameter: 550,
		velocity: 0.015,
		satellites: [
			{
				name: 'moon',
				color: '#eee',
				velocity: 0.015,
				size: 5,
				orbitDiameter: 30
			}
		]
	},
	{
		name: 'mars',
		color: '#ff5722',
		size: 12,
		orbitDiameter: 700,
		velocity: 0.01,
	},
	{
		name: 'jupiter',
		color: '#ba7967',
		size: 65,
		orbitDiameter: 1000,
		velocity: 0.0065,
	},
	{
		name: 'saturn',
		color: '#feceab',
		size: 50,
		orbitDiameter: 1400,
		velocity: 0.0025,
	},
	{
		name: 'uranus',
		color: '#b2ebf2',
		size: 30,
		orbitDiameter: 1800,
		velocity: 0.001,
	},
	{
		name: 'neptune',
		color: '#318fb5',
		size: 30,
		orbitDiameter: 2000,
		velocity: 0.0008,
	}
];

const sun = new Zdog.Shape({
	addTo: illo,
  stroke: 170,
  color: '#febf63',
});

const renderSatellites = (planet, satellites) => {
	satellites.forEach(satellite => {
		const satelliteOrbit = new Zdog.Shape({
			addTo: planet,
			diameter: satellite.orbitDiameter,
			stroke: orbitSize,
			color: orbitColor,
		});
		
		const satelliteModel = new Zdog.Shape({
			addTo: satelliteOrbit,
			stroke: satellite.size,
			color: satellite.color,
			translate: {
				x: satellite.orbitDiameter / 2
			}
		});
	})
}

const renderPlanets = planet => {
	const planetOrbit = new Zdog.Ellipse({
		addTo: illo,
		diameter: planet.orbitDiameter,
		stroke: orbitSize,
		color: orbitColor
	});
	const planetModel = new Zdog.Shape({
		addTo: planetOrbit,
		stroke: planet.size,
		color: planet.color,
		translate: {
			x: planet.orbitDiameter / 2
		}
	});
	
	// if saturn generate rings
	if(planet.name === 'saturn') {
		for(let i = 0; i < 10; i++) {
			const ring = new Zdog.Ellipse({
				addTo: planetModel,
				stroke: 1,
				diameter: 60 + i,
				color: planet.color
			})
		}
	}
	
	if(planet.satellites) {
		renderSatellites(planetModel, planet.satellites);
	}
	
	//save above objects in the planet object
	planet.model = planetModel;
	planet.orbit = planetOrbit;
}

// render planets
planets.forEach(renderPlanets)


const computeOrbitalRotation = (planet) => {
	planet.orbit.rotate.z += planet.velocity;
	planet.orbit.updateGraph();
}

rotatePlanets();

function rotatePlanets() {
	planets.forEach(computeOrbitalRotation);
	
	illo.updateRenderGraph();
	requestAnimationFrame(rotatePlanets)
}
