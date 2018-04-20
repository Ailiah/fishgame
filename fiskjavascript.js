//GLOBAL VARIABLES//
var gameSpeed = 500//Game Speed; 1000ms = 1 second.
var finalFishInformationList = [];
var fishesDead = [];
var fishDeathByFishers = 0
var fishDeathByPredators = 0
var fishFoodAvailable = 0
var fishFoodEaten = 0
var fishFoodNeed = 10
var fishGrowthModifier = 1
var foodSurplus = 0
var kgsum = 0
var months = 0;
var oceanFishingVessel = (Math.random() * (800 - 600) + 600);
var oceanPredators = (Math.random() * (800 - 600) + 600);
var oceanSalinity = (Math.random() * (5 - 1.00) + 1.00);
var oceanTemperature = (Math.random() * (36 - 1.00) + 1.00);
var planktonAmount = (Math.random() * (10000000 - 5000000) + 5000000);
var playerName = document.getElementById("insertPlayerName").value;
var randomOceanName = ""
var saltModifier = 1
var sliderId = document.getElementById("sliderId").value;
var sum = 0
var tempModifier = 1
var years = 0;
var c = document.getElementById("bestCanvas");
var ctx = c.getContext("2d");
var test = document.getElementById("showSliderAmount")
test.innerHTML = sliderId
const taste = Object.freeze({
    0: "Inedible",
    1: "Slightly poisonous",
    2: "Disgusting",
    3: "Bad",
    4: "Decent",
    5: "Good",
    6: "Great"
})
const monthName = Object.freeze({
    1: "January",
    2: "Febuary",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11:"November", 
    12:"December"
})
//STARTING THE GAME//
function enterPlayerName() {
    var playerName = document.getElementById("insertPlayerName").value;
    if (playerName.length > "20" || playerName.length < "3") {
        alert("Enter a name between 3 and 20 characters")
    }
    else {
        document.getElementById("startMenu").style.display = "none";
        document.getElementById("wrapper").style.display = "block";
        document.getElementById("wrapper2").style.display = "block";
        document.getElementById("hideButtons").style.display = "block";
        document.getElementById("logo").style.display = "none";
        document.getElementById("smallLogo").style.display = "block";
        mapScreenFunction()
        startGameFunction()
    }
}
function startGameFunction() {
    fishRandomizer();
    marketValue();
    oceanName();
    oceanFunction(); //The ocean values are available from year 0
    oceanPlankton(); //Plankton is available from year 0
    fishDeathByMarketValue()
    adaptionPoints()
    evolutionPoints()
    setTimeout(timeFunction)
}
function menuSlider(slider) {
    var sliderAmount = document.getElementById("showSliderAmount");
    // sliderId = document.getElementById("sliderId").value;
    sliderAmount.innerHTML = slider.value
}
//TIME FUNCTION//
function timeFunction() {
    if (months < 12) {
        months++
        document.getElementById("months").innerHTML = monthName[months]
        document.getElementById("years").innerHTML = "Year: " + years
        fishBreeding();
        marketValue();
        fishDeathByMarketValue();
        oceanFoodLeft();
        totalFishKg();
        totalFish();
        fishDeathByMarketValue();
        fishDeathByPredatorsFunction();
        printFishAmount();
        setTimeout(timeFunction, gameSpeed)
    } else {
        months = months - 12;
        years = years + 1;
        oceanPlankton();
        oceanFunction();
        temperatureResistance();
        saltResistance();
        aiAdaptionTasteOrTemp()
        if (years % 10 === 0) {
            evolutionPoints();
        }
        if (years % 5 === 0) {
            adaptionPoints();
        }
        setTimeout(timeFunction(years), gameSpeed)
    }
    return months, years
}

//MENU FUNCTIONS//
function speciesScreenFunction() {
    document.getElementById("speciesScreen").style.display = "block";
    document.getElementById("evolutionScreen").style.display = "none";
    document.getElementById("mapScreen").style.display = "none";
    document.getElementById("historyScreen").style.display = "none";
}
function evolutionScreenFunction() {
    document.getElementById("evolutionScreen").style.display = "block";
    document.getElementById("speciesScreen").style.display = "none";
    document.getElementById("mapScreen").style.display = "none";
    document.getElementById("historyScreen").style.display = "none";
}
function mapScreenFunction() {
    document.getElementById("mapScreen").style.display = "block";
    document.getElementById("speciesScreen").style.display = "none";
    document.getElementById("evolutionScreen").style.display = "none";
    document.getElementById("historyScreen").style.display = "none";
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 200);
    ctx.stroke();

    function drawCircle(x) {
        ctx.beginPath();
        ctx.arc(x, 50, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
    function drawtext(x) {
        ctx.beginPath();
        ctx.fillText("blub blub", 10, 10)
        ctx.fillStyle = "black";
        ctx.fill();
    }
    var x = 0;
    setInterval(function () {
        ctx.clearRect(0, 0, 200, 200);
        drawCircle(x % 200);
        drawtext(x % 200)
        x++;
    }, 25);
}
function historyScreenFunction() {
    document.getElementById("historyScreen").style.display = "block";
    document.getElementById("speciesScreen").style.display = "none";
    document.getElementById("evolutionScreen").style.display = "none";
    document.getElementById("mapScreen").style.display = "none";
}

//FISHINFO//
function fishInfo(fishId, fishTotalAmount, fishDeadAmount, fishFullNames, fishAdaptionPoints,
    fishAverageSizeKg, fishEvolutionPoints, fishAge, fishTemperatureTolerance, fishSaltTolerance,
    fishMarketValue, fishTempModifier, fishSaltModifier, fishDeathByFishers, fishDeathByPredators, fishTaste, fishIsAlive, fishAggression, isPlayer) {
    this.fishId = fishId;
    this.fishTotalAmount = fishTotalAmount;
    this.fishDeadAmount = fishDeadAmount;
    this.fishFullNames = fishFullNames;
    this.fishAdaptionPoints = fishAdaptionPoints;
    this.fishAverageSizeKg = fishAverageSizeKg;
    this.fishEvolutionPoints = fishEvolutionPoints;
    this.fishAge = fishAge;
    this.fishTemperatureTolerance = fishTemperatureTolerance;
    this.fishSaltTolerance = fishSaltTolerance;
    this.fishMarketValue = fishMarketValue;
    this.fishTempModifier = fishTempModifier;
    this.fishSaltModifier = fishSaltModifier;
    this.fishDeathByFishers = fishDeathByFishers;
    this.fishDeathByPredators = fishDeathByPredators;
    this.fishTaste = fishTaste;
    this.fishIsAlive = fishIsAlive;
    this.fishAggression = fishAggression;
    this.isPlayer = isPlayer;
    this.getName = function () {
        return this.fishFullNames
    }
    this.addEvolution = function () {
        this.fishEvolutionPoints = this.fishEvolutionPoints + 1
    }
    this.removeEvolution = function () {
        this.fishEvolutionPoints = this.fishEvolutionPoints - 1
    }
    this.addAdaption = function () {
        this.fishAdaptionPoints = this.fishAdaptionPoints + 1
    }
    this.removeAdaption = function () {
        this.fishAdaptionPoints = this.fishAdaptionPoints - 1
    }
    this.getEvolution = function () {
        return this.fishEvolutionPoints
    }
    this.getAdaption = function () {
        return this.fishAdaptionPoints
    }
    this.getSize = function () {
        return this.fishAverageSizeKg
    }
    this.getAge = function () {
        return this.fishAge;
    }
    this.addAge = function () {
        this.fishAge = this.fishAge + 1
    }
    this.getAmount = function () {
        return this.fishTotalAmount;
    }
    this.getValue = function () {
        return this.fishMarketValue;
    }
    this.killALife = function () {
        this.fishIsAlive = 0
        fishAliver()
    }
    this.getALife = function () {
        return this.fishIsAlive;
    }
    this.getId = function () {
        return this.fishId;
    }
    this.getPlayer = function () {
        return this.isPlayer;
    }
}
function fishRandomizer() {
    var prefixList = ["Top", "Best", "Great", "Golden", "King", "Toxic", "Red", "Blue", "Retarded", "Armored", "Flathead", "Killer", "Electric", "Ugly", "Strange", "Slippery", 
    "Prince", "Grotesque", "Hideous", "Attractive", "Atrocious", "Adorable", "Oily", "Shiny", "Sleek", "Evasive", "Superior", "Insignificant", "Agile", "Transparent", "Penetrating", "Stubborn", "Enduring", "Radioactive"];
    var speciesList = ["Pike", "Tuna", "Swordfish", "Cod", "Catfish", "Mackerel", "Carp", "Bass", "Cavefish", "Herring", "Trout", "Eel", "Sardine", "Flounder", "Dogfish", "Perch", 
    "Goldfish", "Trout", "Bream", "Ray", "Halibut", "Koi", "Mudsucker", "Monkfish", "Pufferfish", "Hake", "Snapper", "Stingray", "Piranha", "Roach", "Burbot", "Tench", "Ide", "Rudd"];
    var fullNameList = [];
    var y = 1
    prefixList.forEach(function (a1) {
        speciesList.forEach(function (a2) {
            fullNameList.push(a1 + " " + a2);
        });
    });
    fullNameList = shuffle(fullNameList)
    for (i = 0; i < sliderId; i++) {
        finalFishInformationList.push(new fishInfo(y, //Assigns each fish a number
            1000, //Amount of fish alive per species
            0, //Amount of dead
            fullNameList[i], //Gives fish their full name
            4, //Fish adaption points at start (+1)
            Math.floor(Math.random() * (20 - 1) + 1), //Average size of fish (in kg)
            0, //Evolution points at start (+1)
            0, //Fish age at birth
            Math.floor(Math.random() * (35 - 1) + 1), //Temperature resistance modifier number
            Math.floor(Math.random() * (5 - 1) + 1), //Salt resistance modifier number
            0,//Market value 
            0,//Tempmod
            0,//Saltmod
            0,//Deathbyfishers
            0,//Deathbypredators
            6, //Taste
            1,//Is alive
            1,//Aggression
            false));//is Player
        y = y + 1
    }
    var playerName = document.getElementById("insertPlayerName").value;
    finalFishInformationList.push(new fishInfo(0, //Assigns each fish a number
        50000, //Amount of fish alive per species
        0, //Amount of dead
        playerName, //Gives fish their full name
        4, //Fish adaption points at start (+1)
        Math.floor(Math.random() * (20 - 1) + 1), //Average size of fish (in kg)
        0, //Evolution points at start (+1)
        0, //Fish age at birth
        Math.floor(Math.random() * (35 - 1) + 1), //Temperature resistance modifier number
        Math.floor(Math.random() * (5 - 1) + 1), //Salt resistance modifier number
        0,//Market value 
        0,//Tempmod
        0,//Saltmod
        0,//Deathbyfishers
        0,//Deathbypredators
        6, //Taste
        1,//Is alive
        1,//Aggression
        true)); //is Player
    console.log(JSON.stringify(finalFishInformationList))
    temperatureResistance()
    saltResistance()
}
function totalFish() {
    var fishAmountArray = []
    finalFishInformationList.forEach(function (fish) {
        finalFishInformationList[i].getAmount()
        fishAmountArray.push(fish.fishTotalAmount)
        sum = fishAmountArray.reduce(function (a, b) { return a + b; }, 0);
    });

}
function totalFishKg() {
    var fishKgArray = []
    finalFishInformationList.forEach(function (fish) {
        finalFishInformationList[i].getAmount()
        fishKgArray.push(fish.fishAverageSizeKg)
        kgsum = fishKgArray.reduce(function (a, b) { return a + b; }, 0);
    });
}
function printFishAmount() {
    var onceWhat = ["great ", "glorious ", "proud ", "strong ", "excellent ", "wonderful ", "capable ", "common ", "large ", "huge ","virile ", "fertile ", "energetic ", "industrious ", "tireless ", "steadfast ", "persistent ", "potent ", "stubborn ", "brave ", "withstanding ", "resilient ", "dominating "]
    var diedOut = ["died", "passed away", "expired", "perished", "succumbed", "ceased to exist", "met its end", "departed from this world", "went to the afterlife","joined his fallen comrades", "took its final breath", "said its last words", "went to meet its ancestors"]
    var deathReason = ["eaten by ", "mutilated by ", "ended by ", "picked apart by ", "wasted by ", "butchered by ", "demolished by ", "destroyed by ", "cut to pieces by ", "swallowed by ", "put to death by ", "cut in half by ", "decapacitated by ", "stuck between the teeth of ", "beaten after a long fight with "]
    var theKiller = ["another fish", "a bird", "a shark", "a walrus", "a dolphin", "a lonely old fisherman", "the crew of a fishing vessel",
        "a small kid with a bucket", "a diver", "recreational fishers", "something unexplainable", "monsters of the deep", "old friends", 
        "the most common fish in the ocean", "a mermaid", "a killer whale", "native fishermen with spears", "a polar bear lost at sea", "a starving castaway", "survivors of a nearby naval battle", "a hungry missionary", "someone it once called a friend", "an ancient creature", "the one it least expected would betray it"]

    randomonceWhat = onceWhat[Math.floor(Math.random() * onceWhat.length)];
    randomdiedOut = diedOut[Math.floor(Math.random() * diedOut.length)];
    randomdeathReason = deathReason[Math.floor(Math.random() * deathReason.length)];
    randomtheKiller = theKiller[Math.floor(Math.random() * theKiller.length)];

    document.getElementById("left").innerHTML = "";
    document.getElementById("left2").innerHTML = "";
    finalFishInformationList.slice(0, 8).forEach(function (fish) {
        if (fish.fishTotalAmount > 50 && fish.fishIsAlive == 1) {
            var para = document.createElement("p");
            var node = document.createTextNode(fish.fishFullNames + " " + (fish.fishTotalAmount).toFixed(0));
            para.appendChild(node);
            var element = document.getElementById("left");
            element.appendChild(para);
        }
        else if (fish.fishTotalAmount < 50 && fish.fishIsAlive == 1) {
            var para = document.createElement("p");
            var node = document.createTextNode("In the month of  " + monthName[months] + ", year " + years + ", the last organism of the once " + randomonceWhat + fish.fishFullNames+ " species " + randomdiedOut + ". " + "It was " + randomdeathReason + randomtheKiller + ".");
            para.appendChild(node);
            var element = document.getElementById("historyTest");
            element.appendChild(para);
            fish.killALife()
        }
        else {
            // console.log("the dead salute you")
        }
    });




    finalFishInformationList.slice(8, 16).forEach(function (fish) {
        if (fish.fishTotalAmount > 50 && fish.fishIsAlive == 1) {
            var para = document.createElement("p");
            var node = document.createTextNode(fish.fishFullNames + " " + (fish.fishTotalAmount).toFixed(0));
            para.appendChild(node);
            var element = document.getElementById("left2");
            element.appendChild(para);
        }
        else if (fish.fishTotalAmount < 50 && fish.fishIsAlive == 1) {
            var para = document.createElement("p");
            var node = document.createTextNode("In the month of " + monthName[months] + ", year " + years + ", the last organism of the once " + randomonceWhat + fish.fishFullNames + " species " + randomdiedOut + ". " + "It was " + randomdeathReason + randomtheKiller + ".");
            para.appendChild(node);
            var element = document.getElementById("historyTest");
            element.appendChild(para);
            fish.killALife()
        }
        else {
            // console.log("the dead salute you")
        }
    });
}

//OCEAN FUNCTIONS//
function oceanFunction() { //Controls the ocean
    if (oceanTemperature > 0 && oceanTemperature <= 35) { //Temperature stays between 0 and 35 celsius
        oceanTemperature = oceanTemperature + (Math.random() * 4) - 2; //Gives random temperature based on the previous year
    }
    else if (oceanTemperature >= 36) {
        oceanTemperature = oceanTemperature + (Math.random() * 3) - 6; //Makes sure the temperature wont rise too high
    }
    else {
        oceanTemperature = oceanTemperature + (Math.random() * 3); //Makes sure the temperature wont sink too low
    }
    if (oceanSalinity > 1.0 && oceanSalinity <= 5.0) {
        oceanSalinity = oceanSalinity + (Math.random() * 0.3) - 0.15; //Gives random salinity based on the previous year
    }
    else if (oceanSalinity >= 5) {
        oceanSalinity = oceanSalinity + (Math.random() * 0.25) - 0.5; //Makes sure the salinity wont rise too high
    }
    else {
        oceanSalinity = oceanSalinity + (Math.random() * 0.25); //Makes sure the salinity wont sink too low
    }
    if (oceanFishingVessel > 1.0 && oceanFishingVessel <= 5.0) {
        oceanFishingVessel = oceanFishingVessel + (Math.random() * 4) - 2;
    }
    else if (oceanFishingVessel >= 5) {
        oceanFishingVessel = oceanFishingVessel + (Math.random() * 2) - 1;
    }

    if (oceanPredators > 1.0 && oceanPredators <= 5.0) {
        oceanPredators = oceanPredators + (Math.random() * 4) - 2;
    }
    else if (oceanPredators >= 5) {
        oceanPredators = oceanPredators + (Math.random() * 2) - 1;
    }

    document.getElementById("ocean1").innerHTML = "<b>Ocean name:</b>" + randomOceanName + "<br>"
        + "<b>Plankton:</b> " + kFormatter(planktonAmount.toFixed(0)) + "t" + "<br>"
        + "<b>Ocean temperature:</b> " + oceanTemperature.toFixed(1) + "°C" + "<br>"
        + "<b>Ocean salinity:</b> " + oceanSalinity.toFixed(1) + "%" + "<br>"
        + "<b>Fishing vessels:</b> " + oceanFishingVessel.toFixed(0) + "<br>"
        + "<b>Predators:</b> " + oceanPredators.toFixed(0)


}
function oceanPlankton() { //Controls the amount of plankton
    var randomNumber = (Math.random() * (1.2 - 0.8) + 0.8).toFixed(4)
    planktonAmount = planktonAmount * randomNumber//Multiplies amount of plankton by a number between (max-min) + min
}
function oceanName() {
    var oceanList1 = ["The Ancient", "The Supreme", "The Great", "The Wet", "The Deep", "The Cold", "The Neptunian", "The Huge", "The Massive", "The Terrifying",
        "The Old", "The New", "The Small", "The Stormy", "The Dark", "The Restless", "The Shoreless", "The Polar", "The Beautiful", "The Attractive", "The Agonizing",
        "The Lovely", "The Wild", "The Tiny", "The Sexy", "The Unruly", "The Quiet", "The Harrowing", "The Hollow", "The Chilling"]
    var oceanList2 = ["Sea", "Ocean", "Abyss"]
    var oceanList3 = ["of Death", "of Dead Fish", "of Secrets", "of Hopelessness", "of Desperation", "of Misery", "of Sorrow", "of Pain", "of Misery", "of Regret", "of Remorse",
        "of Suffering", "of Hardship", "of Misfortune", "of Torment", "of Discomfort", "of Bitterness", "of Regret", "of Dissatisfaction", "of Mourning", "of Grief", "of Angry Plankton", "of Dead Plankton", "of Terrible Secrets"]
    var fullNameGenerated = [];
    oceanList1.forEach(function (a1) {
        oceanList2.forEach(function (a2) {
            oceanList3.forEach(function (a3) {
                fullNameGenerated.push(a1 + " " + a2 + " " + a3); //combines all possible values from prefix and species list to fullNameGenerated
                randomOceanName = fullNameGenerated[Math.floor(Math.random() * fullNameGenerated.length)];
            });
        });
    });


}
function oceanFoodLeft() { //Controls plankton availability
    var planktonAvailability = 0
    var newWeightModifier = fishWeightModifier();
    planktonAvailability = (planktonAmount / (sum * 1.2))
    if (planktonAvailability >= 200) {
        foodSurplus = 0.33 - newWeightModifier
        return foodSurplus;
    }
    else if (planktonAvailability >= 100 && planktonAvailability < 200) {
        foodSurplus = 0.31 - newWeightModifier
        return foodSurplus;
    }
    else if (planktonAvailability < 100 && planktonAvailability > 50) {
        foodSurplus = 0.30 - newWeightModifier
        return foodSurplus;
    }
    else {
        foodSurplus = 0.28 - newWeightModifier
        return foodSurplus;
    }
}
function fishWeightModifier() { //Returns modifier which will be added to the plankton available
    var weightModifier = 0
    finalFishInformationList.forEach(function (fish) {
        fishWeight = fish.fishAverageSizeKg;//Go through each fish weight and see how it affects the weight modifier
        if (fishWeight <= 5) {//tiny
            if (finalFishInformationList.length > 7) {
                weightModifier += 0.00025;
            } else {
                weightModifier += 0.002;
            }
        } else
            if (fishWeight > 5 && fishWeight <= 10) {//small
                if (finalFishInformationList.length > 7) {
                    weightModifier += 0.00025;
                } else {
                    weightModifier += 0.0025;
                }
            } else
                if (fishWeight > 10 && fishWeight <= 15) {//big
                    if (finalFishInformationList.length > 7) {
                        weightModifier += 0.00035;
                    } else {
                        weightModifier += 0.006;
                    }
                } else//huge
                {
                    if (finalFishInformationList.length > 7) {
                        weightModifier += 0.00035;
                    } else {
                        weightModifier += 0.007;
                    }
                }
    })
    return weightModifier;
}

//FISH FUNCTIONS//
function temperatureResistance() { //Fish temperature modifiers
    finalFishInformationList.forEach(function (fish) {
        var tempDifference = oceanTemperature.toFixed(0) - fish.fishTemperatureTolerance
        if (tempDifference < -17 || tempDifference > 17) {
            fish.fishTempModifier = 0.4
        }
        else if ((tempDifference >= 11 && tempDifference <= 17) || (tempDifference <= -11 && tempDifference >= -17)) {
            fish.fishTempModifier = 0.42
        }
        else if ((tempDifference >= 5 && tempDifference <= 10) || (tempDifference <= -5 && tempDifference >= -10)) {
            fish.fishTempModifier = 0.44
        }
        else {
            fish.fishTempModifier = 0.45
        }
    });

}
function saltResistance() { //Fish temperature modifiers
    finalFishInformationList.forEach(function (fish) {
        var saltDifference = oceanSalinity.toFixed(0) - fish.fishSaltTolerance
        if (saltDifference < -4 || saltDifference > 4) {
            fish.fishSaltModifier = 0.32
        }
        else if ((saltDifference >= 2.5 && saltDifference <= 4) || (saltDifference <= -2.5 && saltDifference >= -4)) {
            fish.fishSaltModifier = 0.33
        }
        else if ((saltDifference >= 1 && saltDifference <= 2.4) || (saltDifference <= -1 && saltDifference >= -2.4)) {
            fish.fishSaltModifier = 0.35
        }
        else {
            fish.fishSaltModifier = 0.37
        }
    });

}
function fishBreeding() { //Fish population growth rate
    var bornRate = 0
    var deathRate = 0
    var growthModifier = 0
    var lastStand = 1
    var weakGenes = 1
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() < 500) {
            lastStand = 1.05
        }
        else if (fish.getAmount() > 750000) {
            weakGenes = 0.9
        }
        else if (fish.getAmount() > 2000000) {
            weakGenes = 0.85
        }
        else if (fish.getAmount() > 10000000) {
            weakGenes = 0.75
        }
        if (fish.getAmount() > 50) {//Minimum amount of fish a species need for survival
            bornRate = fish.fishTempModifier + foodSurplus + fish.fishSaltModifier
            deathRate = fish.fishDeathByFishers + fish.fishDeathByPredators
            growthModifier = bornRate - deathRate
            fish.fishTotalAmount = ((((fish.fishTotalAmount) * (growthModifier)) - (fish.fishTotalAmount * 0.05)) * (lastStand)) * (weakGenes) //TOTAL FISH AMOUNT * GROWTHMODIFIER-DEATH RATE
            return fish.fishTotalAmount
        }
    });



}
function marketValue() { //The price for each fish
    finalFishInformationList.forEach(function (fish) {
        finalFishInformationList[i].getValue()
        fish.fishMarketValue = fish.fishAverageSizeKg + (Math.random() * (30 - 1.00) + 1.00);
        return fish.fishMarketValue
    });
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50) {
            // ctx.fillText(fish.fishMarketValue.toFixed(1) + "€/kg", 350, y3Axis);

        }
        else {
            // ctx.fillText("-", 350, y3Axis)

        }
    });
}
function fishDeathByMarketValue() { //Fish death caused by fishing
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.fishMarketValue.toFixed(1) >= 40) {
            fish.fishDeathByFishers = 0.00008 * oceanFishingVessel
        }
        else if (fish.getAmount() > 50 && fish.fishMarketValue.toFixed(1) >= 30 && fish.fishMarketValue.toFixed(1) < 40) {
            fish.fishDeathByFishers = 0.00006 * oceanFishingVessel
        }
        else if (fish.getAmount() > 50 && fish.fishMarketValue.toFixed(1) >= 20 && fish.fishMarketValue.toFixed(1) < 30) {
            fish.fishDeathByFishers = 0.00004 * oceanFishingVessel
        }
        else if (fish.getAmount() > 50 && fish.fishMarketValue.toFixed(1) >= 10 && fish.fishMarketValue.toFixed(1) < 20) {
            fish.fishDeathByFishers = 0.00002 * oceanFishingVessel
        }
        else if (fish.getAmount() > 50 && fish.fishMarketValue.toFixed(1) < 10) {
            fish.fishDeathByFishers = 0.00001 * oceanFishingVessel
        }
    });
}
function fishDeathByPredatorsFunction() { //Fish death caused by predators
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.fishTaste == 6) {
            fish.fishDeathByPredators = 0.00002 * oceanPredators
        }
        else if (fish.getAmount() > 50 && fish.fishTaste == 5) {
            fish.fishDeathByPredators = 0.000015 * oceanPredators
        }
        else if (fish.getAmount() > 50 && fish.fishTaste == 4) {
            fish.fishDeathByPredators = 0.00001 * oceanPredators
        }
        else if (fish.getAmount() > 50 && fish.fishTaste == 3) {
            fish.fishDeathByPredators = 0.000005 * oceanPredators
        }
        else if (fish.getAmount() > 50 && fish.fishTaste == 2) {
            fish.fishDeathByPredators = 0.0000025 * oceanPredators
        }
        else if (fish.getAmount() > 50 && fish.fishTaste == 1) {
            fish.fishDeathByPredators = 0.00000125 * oceanPredators
        }
        else if (fish.getAmount() > 50 && fish.fishTaste == 0) {
            fish.fishDeathByPredators = 0 * oceanPredators
        }

    });
}
//ADAPTION FUNCTIONS//
function adaptionPoints() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.getPlayer()) {
            fish.addAdaption()
            document.getElementById("speciesName").innerHTML = "Species name: " + fish.fishFullNames
            document.getElementById("adaptionPoints").innerHTML = "Adaption points available: " + fish.fishAdaptionPoints
            document.getElementById("speciesTemp").innerHTML = "Optimal temperature: " + fish.fishTemperatureTolerance
            document.getElementById("speciesSalt").innerHTML = "Optimal salinity: " + fish.fishSaltTolerance
            document.getElementById("speciesTaste").innerHTML = "Taste: " + taste[fish.fishTaste]
            document.getElementById("adaptions").innerHTML = "AP: " + fish.fishAdaptionPoints
            document.getElementById("evolutions").innerHTML = "EP: " + fish.fishEvolutionPoints
        }
    });

}
function adaptionTemperaturePos() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.getPlayer() && fish.fishAdaptionPoints >= 1 && fish.fishTemperatureTolerance <= 35) {
            fish.fishTemperatureTolerance = fish.fishTemperatureTolerance + 1
            document.getElementById("speciesTemp").innerHTML = "Optimal temperature: " + fish.fishTemperatureTolerance
            fish.removeAdaption()
        }
    });
}
function adaptionTemperatureNeg() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.getPlayer() && fish.fishAdaptionPoints >= 1 && fish.fishTemperatureTolerance >= 1) {
            fish.fishTemperatureTolerance = fish.fishTemperatureTolerance - 1
            document.getElementById("speciesTemp").innerHTML = "Optimal temperature: " + fish.fishTemperatureTolerance
            fish.removeAdaption()
        }
    });
}
function adaptionSalinityPos() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.getPlayer() && fish.fishAdaptionPoints >= 1 && fish.fishSaltTolerance < 5) {
            fish.fishSaltTolerance = fish.fishSaltTolerance + 0.5
            document.getElementById("speciesSalt").innerHTML = "Optimal salinity: " + fish.fishSaltTolerance
            fish.removeAdaption()
        }
    });
}
function adaptionSalinityNeg() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.getPlayer() && fish.fishAdaptionPoints >= 1 && fish.fishSaltTolerance >= 0.5) {
            fish.fishSaltTolerance = fish.fishSaltTolerance - 0.5
            document.getElementById("speciesSalt").innerHTML = "Optimal salinity: " + fish.fishSaltTolerance
            fish.removeAdaption()
        }
    });
}
function adaptionTastePos() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.getPlayer() && fish.fishAdaptionPoints >= 1 && fish.fishTaste < 6) {
            fish.fishTaste = fish.fishTaste + 1
            document.getElementById("speciesTaste").innerHTML = "Taste: " + taste[fish.fishTaste]
            fish.removeAdaption()
        }
    });
}
function adaptionTasteNeg() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.getPlayer() && fish.fishAdaptionPoints >= 1 && fish.fishTaste >= 3) {
            fish.fishTaste = fish.fishTaste - 1
            document.getElementById("speciesTaste").innerHTML = "Taste: " + taste[fish.fishTaste]
            fish.removeAdaption()
        }
    });
}

function aiAdaptionTasteOrTemp(){
    finalFishInformationList.forEach(function (fish) {
        var pickOne = Math.floor(Math.random() * 2) + 1
        var pickOne2 = Math.floor(Math.random() * 6) + 1
        if (fish.getAmount() > 50 && fish.fishAdaptionPoints >= 1 && fish.fishTaste >= 5 &&fish.getPlayer()==false) {
            if (pickOne == 1) {
                aiAdaption()
            }
            else{
                fish.fishTaste = fish.fishTaste - 1
            fish.removeAdaption()
            }
        }
    
        else if (fish.getAmount() > 50 && fish.fishAdaptionPoints >= 1 && fish.fishTaste >= 3 && fish.fishTaste <=4 && fish.getPlayer()==false) {
            if (pickOne2 <= 2) {
                aiAdaption()
            }
            else{
                fish.fishTaste = fish.fishTaste - 1
                fish.removeAdaption()
        }
    }
        else if (fish.getAmount()>50 && fish.getPlayer()==false){
            aiAdaption()
        
        }
        
    });
}

function aiAdaption() {
    finalFishInformationList.forEach(function (fish) {
        var pickOne = Math.floor(Math.random() * 2) + 1
        var tempDifference = oceanTemperature.toFixed(0) - fish.fishTemperatureTolerance
        var saltDifference = oceanSalinity.toFixed(0) - fish.fishSaltTolerance
        var tempVs = tempDifference / oceanTemperature
        var saltVs = saltDifference / oceanSalinity
        var tempSaltVsDifference = tempVs - saltVs
        if ((fish.getAmount() > 50 && fish.fishAdaptionPoints >= 1) && (tempSaltVsDifference <= 0.6 && tempSaltVsDifference >= -0.6) && fish.fishId != 0) {
            // console.log("The tempSaltVsDifference is1:"+tempSaltVsDifference)
            if (pickOne == 1 && tempDifference > 0) {
                fish.fishTemperatureTolerance = fish.fishTemperatureTolerance + 1
                fish.removeAdaption()
            }
            else if (pickOne == 1 && tempDifference < 0) {
                fish.fishTemperatureTolerance = fish.fishTemperatureTolerance - 1
                fish.removeAdaption()
            }
            else if (pickOne == 2 && saltDifference > 0) {
                fish.fishSaltTolerance = fish.fishSaltTolerance + 0.5
                fish.removeAdaption()
            }
            else if (pickOne == 2 && saltDifference < 0) {
                fish.fishSaltTolerance = fish.fishSaltTolerance - 0.5
                fish.removeAdaption()
            }

            // console.log("(CLOSE)Sea temperature is: "+oceanTemperature.toFixed(0)+", my optimal is "+fish.fishTemperatureTolerance.toFixed(0))
            // console.log("(CLOSE)Sea salinity is: "+oceanSalinity.toFixed(1)+", my optimal is "+fish.fishSaltTolerance.toFixed(1))
        }

    });
    aiAdaption2()
}
function aiAdaption2() {
    finalFishInformationList.forEach(function (fish) {
        var tempDifference = oceanTemperature.toFixed(0) - fish.fishTemperatureTolerance
        var saltDifference = oceanSalinity.toFixed(0) - fish.fishSaltTolerance
        var tempVs = tempDifference / oceanTemperature
        var saltVs = saltDifference / oceanSalinity
        var tempSaltVsDifference = tempVs - saltVs
        if ((tempSaltVsDifference > 0.6|| tempSaltVsDifference < -0.6) && fish.fishId != 0) {
            // console.log("The tempSaltVsDifference is1:"+tempSaltVsDifference)
            if ((fish.getAmount() > 50 && fish.fishAdaptionPoints >= 1) && tempDifference > 0 && fish.fishId != 0) {
                fish.fishTemperatureTolerance = fish.fishTemperatureTolerance + 1
                fish.removeAdaption()
            }
            else if ((fish.getAmount() > 50 && fish.fishAdaptionPoints >= 1) && tempDifference < 0 && fish.fishId != 0) {
                fish.fishTemperatureTolerance = fish.fishTemperatureTolerance - 1
                fish.removeAdaption()
            }
            else if ((fish.getAmount() > 50 && fish.fishAdaptionPoints >= 1) && saltDifference > 0 && fish.fishId != 0) {
                fish.fishSaltTolerance = fish.fishSaltTolerance + 0.5
                fish.removeAdaption()
            }
            else if ((fish.getAmount() > 50 && fish.fishAdaptionPoints >= 1) && saltDifference < 0 && fish.fishId != 0) {
                fish.fishSaltTolerance = fish.fishSaltTolerance - 0.5
                fish.removeAdaption()
            }
            // console.log("Sea temperature is: "+oceanTemperature.toFixed(0)+", my optimal is "+fish.fishTemperatureTolerance.toFixed(0))
            // console.log("Sea salinity is: "+oceanSalinity.toFixed(1)+", my optimal is "+fish.fishSaltTolerance.toFixed(1))
        }
    });

}
//EVOLUTION FUNCTIONS//
function evolutionPoints() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50) {
            fish.addEvolution() //Adds an evolution point
        }
    });
}
//RANDOM FUNCTIONS//
function shuffle(fullNameList) { //Performs the Fisher–Yates shuffle on fullNameList so the first values can be chosen for fish names.
    var currentIndex = fullNameList.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = fullNameList[currentIndex];
        fullNameList[currentIndex] = fullNameList[randomIndex];
        fullNameList[randomIndex] = temporaryValue;
    }
    return fullNameList;
}
function kFormatter(num) {
    if (num > 99999 && num < 999999) {
        return num > 99999 ? (num / 1000).toFixed(0) + 'k' : num
    }
    else if (num > 999999) {
        return num > 999999 ? (num / 1000000).toFixed(0) + 'M' : num
    }
    else {
        return num
    }
}

function fishAliver() { //Sum of all fishes.
    var deadArray = []
    finalFishInformationList.forEach(function (fish) {
        finalFishInformationList[i].getALife()
        deadArray.push(fish.fishIsAlive)
        sumOfDead = deadArray.reduce(function (a, b) { return a + b; }, 0);

    });

    if (sumOfDead == 1) {
        finalFishInformationList.forEach(function (fish) {
            if (fish.getALife() == 1) {
                if (fish.getPlayer()) {
                    var para = document.createElement("p");
                    var node = document.createTextNode("In the month of  " + monthName[months] + ", year " + years + ", only the "+randomonceWhat+" species named " +fish.fishFullNames
                    +" is alive in the ocean! With no competition, survival seems guaranteed.");
                    para.appendChild(node);
                    var element = document.getElementById("historyTest");
                    element.appendChild(para);
                }
                else {
                    var para = document.createElement("p");
                    var node = document.createTextNode("In the month of  " + monthName[months] + ", year " + years + ", only the "+randomonceWhat+" species named " +fish.fishFullNames
                    +" is alive in the ocean! With no competition, survival seems guaranteed.");
                    para.appendChild(node);
                    var element = document.getElementById("historyTest");
                    element.appendChild(para);
                }
            }


        });
    }
}
//JQUERY FUNCTIONS//
$(document).ready(function(){
$(function () {
    setInterval(function () {
        $('h1').effect('bounce', 1000)
    }, 500);
    setInterval(function () {
        $('h1').effect('puff', 1000)
    }, 500);
}); 
$(document).keyup(function(e){
    if (e.keyCode == 107 && gameSpeed==500){
       (gameSpeed = gameSpeed - 250);
       console.log("Gamespeed x2")
    }
    else if (e.keyCode == 107 && gameSpeed==250){
       (gameSpeed = gameSpeed - 125);
       console.log("Gamespeed x3")
    }
    else if (e.keyCode == 107 && gameSpeed==125){
       (gameSpeed = gameSpeed - 62.5);
       console.log("Gamespeed x4")
    }
    else if (e.keyCode == 109 && gameSpeed==250){
       (gameSpeed = gameSpeed + 250);
       console.log("Gamespeed x1")
    }
    else if (e.keyCode == 109 && gameSpeed==125){
       (gameSpeed = gameSpeed + 125);
       console.log("Gamespeed x2")
    }
    else if (e.keyCode == 109 && gameSpeed==62.5){
       (gameSpeed = gameSpeed + 62.5);
       console.log("Gamespeed x3")
    } 
 });
 $('#speed1').click(function (){
     gameSpeed = 500;
});
$('#speed2').click(function (){
    gameSpeed = 250;
});
$('#speed3').click(function (){
    gameSpeed = 125;
});
$('#speed4').click(function (){
    gameSpeed = 62.5;
});
}); 