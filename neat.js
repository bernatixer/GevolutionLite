let Neat    = neataptic.Neat;
let Methods = neataptic.methods;

var PLAYER_AMOUNT    = 10;
var MUTATION_RATE    = 0.5;
var ELITISM          = Math.round(0.1 * PLAYER_AMOUNT);

let neat = new Neat(
    2, 4,
    function(genome) { return genome.score },
    {
        mutation: Methods.mutation.ALL,
        popsize: PLAYER_AMOUNT,
        mutationRate: MUTATION_RATE,
        elitism: ELITISM
    }
);

function startEvaluation(){
    entities = [];

    for(var genome in neat.population){
        genome = neat.population[genome];
        
        let x = Math.floor(Math.random() * Math.floor(canvasWidth));
        let y = Math.floor(Math.random() * Math.floor(canvasHeight));
        entities.push(new Entity(x,y,genome));
    }
}

function endEvaluation(){
    console.log('Generation:', neat.generation, '- average score:', Math.round(neat.getAverage()));
    console.log('Fittest score:', Math.round(neat.getFittest().score));

    // Networks shouldn't get too big
    for(var genome in neat.population){
        genome = neat.population[genome];
        genome.score -= genome.nodes.length / 10;
    }

    // Sort the population by score
    neat.sort();

    // Init new pop
    var newPopulation = [];

    // Elitism
    for(var i = 0; i < neat.elitism; i++){
        newPopulation.push(neat.population[i]);
    }

    // Breed the next individuals
    for(var i = 0; i < neat.popsize - neat.elitism; i++){
        newPopulation.push(neat.getOffspring());
    }

    // Replace the old population with the new population
    neat.population = newPopulation;
    neat.mutate();

    neat.generation++;
    startEvaluation();
}