//VARIABLES WITH NO HOME//
var gameSpeed = 500; //Game Speed; 1000ms = 1 second.
var finalFishInformationList = [];
var fishesDead = [];
var fishDeathByFishers = 0;
var fishDeathByPredators = 0;
var fishFoodAvailable = 0;
var fishFoodEaten = 0;
var fishFoodNeed = 10;
var fishGrowthModifier = 1;
var foodSurplus = 0;
var kgsum = 0;
var months = 0;
var oceanFishingVessel = (Math.random() * (800 - 600) + 600);
var oceanPredators = (Math.random() * (800 - 600) + 600);
var oceanSalinity = (Math.random() * (5 - 1.00) + 1.00);
var oceanTemperature = (Math.random() * (36 - 1.00) + 1.00);
var planktonAmount = (Math.random() * (10000000 - 5000000) + 5000000);
var playerName = document.getElementById("insertPlayerName").value;
var randomOceanName = "";
var saltModifier = 1;
var sliderId = document.getElementById("sliderId").value;
var sum = 0;
var tempModifier = 1;
var years = 0;
var c = document.getElementById("bestCanvas");
var ctx = c.getContext("2d");
var c2 = document.getElementById("speciesCanvas");
var ctx2 = c2.getContext("2d");
var test = document.getElementById("showSliderAmount");
test.innerHTML = sliderId;
var pause = 1;

//RENAMING THINGS//
const taste = Object.freeze({
    0: "Inedible",
    1: "Almost inedible",
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
    11: "November",
    12: "December"
})
//STARTING THE GAME//
function enterPlayerName() {
    var playerName = document.getElementById("insertPlayerName").value;
    if (playerName.length > "20" || playerName.length < "3") {
        alert("Enter a name between 3 and 20 characters")
    } else {
        document.getElementById("startMenu").style.display = "none";
        document.getElementById("wrapper").style.display = "block";
        document.getElementById("wrapper2").style.display = "block";
        document.getElementById("hideButtons").style.display = "block";
        document.getElementById("logo").style.display = "none";
        document.getElementById("smallLogo").style.display = "block";
        document.getElementById("textBoxThing").style.display = "block";
        document.getElementById("screens").style.display = "block";
        historyScreenFunction()
        startGameFunction()
    }
}

function startGameFunction() {
    fish();
    marketValue();
    oceanName();
    oceanFunction();
    oceanPlankton();
    fishDeathByMarketValue()
    adaptionPoints()
    evolutionPoints()
    conservationStatus()
    fishPic()
    setTimeout(timeFunction)
}

function menuSlider(slider) {
    var sliderAmount = document.getElementById("showSliderAmount");
    sliderAmount.innerHTML = slider.value
}
//TIME FUNCTION//
function timeFunction() {
    if (pause == 1) {
        if (months < 12) {
            months++
            document.getElementById("months").innerHTML = monthName[months]
            document.getElementById("years").innerHTML = "Year: " + years
            ing();
            fishDeathByMarketValue();
            oceanFoodLeft();
            totalFishKg();
            totalFish();
            fishDeathByMarketValue();
            fishDeathByPredatorsFunction();
            printFishAmount();
            updateDifference();
            conservationStatus();
            fishInFightCount()
            damageDoneFunction()
            testFunction($("select[id='fishSelect'").find('option:selected').text())
            fishPic()
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
                marketValue();
            }
            if (years % 5 === 0) {
                adaptionPoints();

            }
            setTimeout(timeFunction(years), gameSpeed)
        }
        return months, years
    }
}

//MENU FUNCTIONS//
function speciesScreenFunction() {
    document.getElementById("speciesScreen").style.display = "block";
    document.getElementById("speciesScreenAi").style.display = "block";
    document.getElementById("evolutionScreen").style.display = "none";
    document.getElementById("mapScreen").style.display = "none";
    document.getElementById("historyScreen").style.display = "none";
    document.getElementById("combatScreen").style.display = "none";
}

function evolutionScreenFunction() {
    document.getElementById("evolutionScreen").style.display = "block";
    document.getElementById("speciesScreenAi").style.display = "none";
    document.getElementById("speciesScreen").style.display = "none";
    document.getElementById("mapScreen").style.display = "none";
    document.getElementById("historyScreen").style.display = "none";
    document.getElementById("combatScreen").style.display = "none";
}

function mapScreenFunction() {
    document.getElementById("mapScreen").style.display = "block";
    document.getElementById("speciesScreenAi").style.display = "none";
    document.getElementById("speciesScreen").style.display = "none";
    document.getElementById("evolutionScreen").style.display = "none";
    document.getElementById("historyScreen").style.display = "none";
    document.getElementById("combatScreen").style.display = "none";
}

function historyScreenFunction() {
    document.getElementById("historyScreen").style.display = "block";
    document.getElementById("speciesScreenAi").style.display = "none";
    document.getElementById("speciesScreen").style.display = "none";
    document.getElementById("evolutionScreen").style.display = "none";
    document.getElementById("mapScreen").style.display = "none";
    document.getElementById("combatScreen").style.display = "none";
}

function combatScreenFunction() {
    document.getElementById("combatScreen").style.display = "block";
    document.getElementById("mapScreen").style.display = "none";
    document.getElementById("speciesScreenAi").style.display = "none";
    document.getElementById("speciesScreen").style.display = "none";
    document.getElementById("evolutionScreen").style.display = "none";
    document.getElementById("historyScreen").style.display = "none";
}
//FISHINFO//
function fishInfo(fishId, fishTotalAmount, fishDeadAmount, fishFullNames, fishAdaptionPoints,
    fishAverageSizeKg, fishEvolutionPoints, fishAge, fishTemperatureTolerance, fishSaltTolerance,
    fishMarketValue, fishTempModifier, fishSaltModifier, fishDeathByFishers, fishDeathByPredators,
    fishTaste, fishIsAlive, fishConservationStatus, fishAttackModifier, fishDefenseModifier, fishFightingPopPercentage,
    fishFightingPopNumber, relativeStrengthPercentage, fishDamageDone, isPlayer) {
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
    this.fishConservationStatus = fishConservationStatus;
    this.fishAttackModifier = fishAttackModifier;
    this.fishDefenseModifier = fishDefenseModifier;
    this.fishFightingPopPercentage = fishFightingPopPercentage;
    this.fishFightingPopNumber = fishFightingPopNumber;
    this.relativeStrengthPercentage = relativeStrengthPercentage;
    this.fishDamageDone = fishDamageDone;
    this.isPlayer = isPlayer;

    this.getName = function () {
        return this.fishFullNames
    }
    this.getStatus = function () {
        return this.fishConservationStatus
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
    this.getFightAmount = function () {
        return this.fishFightingPopNumber;
    }
    this.getFightPercentage = function () {
        return this.fishFightingPopPercentage;
    }
    this.getDamage = function () {
        return this.fishDamageDone;
    }
    this.getRelative = function () {
        return this.relativeStrengthPercentage;
    }
}
//RANDOMIZER//
function fish() {
    var prefixList = ["Top", "Best", "Great", "Golden", "King", "Toxic", "Red", "Blue", "Armored", "Flathead", "Killer", "Electric", "Ugly", "Strange", "Slippery",
        "Prince", "Grotesque", "Hideous", "Attractive", "Atrocious", "Adorable", "Oily", "Shiny", "Sleek", "Evasive", "Superior", "Insignificant", "Agile", "Transparent", "Penetrating", "Stubborn", "Enduring", "Radioactive"
    ];
    var speciesList = ["Pike", "Tuna", "Swordfish", "Cod", "Catfish", "Mackerel", "Carp", "Bass", "Cavefish", "Herring", "Trout", "Eel", "Sardine", "Flounder", "Dogfish", "Perch",
        "Goldfish", "Trout", "Bream", "Ray", "Halibut", "Koi", "Mudsucker", "Monkfish", "Pufferfish", "Hake", "Snapper", "Stingray", "Piranha", "Roach", "Burbot", "Tench", "Ide", "Rudd"
    ];
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
            100000, //Amount of fish alive per species
            0, //Amount of dead
            fullNameList[i], //Gives fish their full name
            4, //Fish adaption points at start (+1)
            Math.floor(Math.random() * (20 - 1) + 1), //Average size of fish (in kg)
            -1, //Evolution points at start (+1)
            0, //Fish age at birth
            Math.floor(Math.random() * (35 - 1) + 1), //Temperature resistance modifier number
            Math.floor(Math.random() * (5 - 1) + 1), //Salt resistance modifier number
            0, //Market value 
            0, //Tempmod
            0, //Saltmod
            0, //Deathbyfishers
            0, //Deathbypredators
            6, //Taste
            1, //Is alive
            0, //Conservationstatus
            1, //ATCK (HIGHER = more damage)
            0.5, //DEF (LOWER= less damage taken)
            0.05, //FIGHTPOP(%)
            0, //FIGHTPOPNUMBER
            0, //RELATIVESTRENGTH%
            0, //damageDone
            false, )); //is player
        y = y + 1
    }
    var playerName = document.getElementById("insertPlayerName").value;
    finalFishInformationList.push(new fishInfo(0, //Assigns each fish a number
        100000, //Amount of fish alive per species
        0, //Amount of dead
        playerName, //Gives fish their full name
        4, //Fish adaption points at start (+1)
        Math.floor(Math.random() * (20 - 1) + 1), //Average size of fish (in kg)
        0, //Evolution points at start (+1)
        0, //Fish age at birth
        Math.floor(Math.random() * (35 - 1) + 1), //Temperature resistance modifier number
        Math.floor(Math.random() * (5 - 1) + 1), //Salt resistance modifier number
        0, //Market value 
        0, //Tempmod
        0, //Saltmod
        0, //Deathbyfishers
        0, //Deathbypredators
        6, //Taste
        1, //Is alive
        0, //Conservationstatus
        1, //ATCK (HIGHER = more damage)
        0.5, //DEF
        0.05, //FIGHTPOP(%)
        0, //FIGHTPOPNUMBER
        0, //RELATIVESTRENGTH%
        0, //damageDone
        true, )); //is player
    console.log(JSON.stringify(finalFishInformationList))
    temperatureResistance()
    saltResistance()
    fishNamesToDropDown()
}

function fishPic() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getPlayer()) {
            document.getElementById("fishPicName").innerHTML = fish.fishFullNames
            document.getElementById("fishPicFull").innerHTML = "Pop: " + fish.fishTotalAmount.toFixed(0) + " | In combat: " + fish.fishFightingPopNumber.toFixed(0) + " (" + fish.fishFightingPopPercentage * 100 + "%)"
            document.getElementById("growthRate").innerHTML = fish.fishConservationStatus
        }
    });
    ctx2.beginPath();
    ctx2.moveTo(20, 50);
    ctx2.quadraticCurveTo(35, 65, 20, 80);
    ctx2.quadraticCurveTo(35, 69, 50, 70);
    ctx2.quadraticCurveTo(100, 95, 175, 70);
    ctx2.quadraticCurveTo(180, 60, 175, 50);
    ctx2.quadraticCurveTo(90, 25, 50, 55);
    ctx2.quadraticCurveTo(35, 65, 20, 50);
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.arc(160, 55, 3, 0, 2 * Math.PI);
    ctx2.stroke();
}

function totalFish() {
    var fishAmountArray = []
    finalFishInformationList.forEach(function (fish) {
        finalFishInformationList[i].getAmount()
        fishAmountArray.push(fish.fishTotalAmount)
        sum = fishAmountArray.reduce(function (a, b) {
            return a + b;
        }, 0);

    });
    return sum;
}

function totalFishKg() {
    var fishKgArray = []
    finalFishInformationList.forEach(function (fish) {
        finalFishInformationList[i].getAmount()
        fishKgArray.push(fish.fishAverageSizeKg)
        kgsum = fishKgArray.reduce(function (a, b) {
            return a + b;
        }, 0);
    });
}

function printFishAmount() {
    var onceWhat = ["great ", "glorious ", "proud ", "strong ", "excellent ", "wonderful ", "capable ", "common ", "large ", "huge ", "virile ", "fertile ", "energetic ", "industrious ", "tireless ", "steadfast ", "persistent ", "potent ", "stubborn ", "brave ", "withstanding ", "resilient ", "dominating "]
    var diedOut = ["died", "passed away", "expired", "perished", "succumbed", "ceased to exist", "met its end", "departed from this world", "went to the afterlife", "joined his fallen comrades", "took its final breath", "said its last words", "went to meet its ancestors"]
    var deathReason = ["eaten by ", "mutilated by ", "ended by ", "picked apart by ", "wasted by ", "butchered by ", "demolished by ", "destroyed by ", "cut to pieces by ", "swallowed by ", "put to death by ", "cut in half by ", "decapacitated by ", "stuck between the teeth of ", "beaten after a long fight with "]
    var theKiller = ["another fish", "a bird", "a shark", "a walrus", "a dolphin", "a lonely old fisherman", "the crew of a fishing vessel",
        "a small kid with a bucket", "a diver", "recreational fishers", "something unexplainable", "monsters of the deep", "old friends",
        "the most common fish in the ocean", "a mermaid", "a killer whale", "native fishermen with spears", "a polar bear lost at sea", "a starving castaway",
        "survivors of a nearby naval battle", "a hungry missionary", "someone it once called a friend", "an ancient creature", "the one it least expected would betray it", "a marine biologist", "a Michelin star chef on vacation", "a flightless bird", "the Kraken"
    ]

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
        } else if (fish.fishTotalAmount < 50 && fish.fishIsAlive == 1) {
            var para = document.createElement("p");
            var node = document.createTextNode(monthName[months] + ", year " + years + " - The last organism of the once " + randomonceWhat + fish.fishFullNames + " species " + randomdiedOut + ". " + "It was " + randomdeathReason + randomtheKiller + ".");
            para.appendChild(node);
            var element = document.getElementById("historyTest");
            element.appendChild(para);
            document.getElementById("historyTest2").innerHTML = monthName[months] + ", year " + years + " - " + fish.fishFullNames + ": Extinct"
            fish.killALife()
            $("#fishSelect option").filter(function (i, e) {
                return $(e).text() == fish.fishFullNames
            }).addClass("deadFish")
        } else {
            // console.log("test")
        }
    });

    finalFishInformationList.slice(8, 16).forEach(function (fish) {
        if (fish.fishTotalAmount > 50 && fish.fishIsAlive == 1) {
            var para = document.createElement("p");
            var node = document.createTextNode(fish.fishFullNames + " " + (fish.fishTotalAmount).toFixed(0));
            para.appendChild(node);
            var element = document.getElementById("left2");
            element.appendChild(para);
        } else if (fish.fishTotalAmount < 50 && fish.fishIsAlive == 1) {
            var para = document.createElement("p");
            var node = document.createTextNode(monthName[months] + ", year " + years + " - The last organism of the once " + randomonceWhat + fish.fishFullNames + " species " + randomdiedOut + ". " + "It was " + randomdeathReason + randomtheKiller + ".");
            para.appendChild(node);
            var element = document.getElementById("historyTest");
            element.appendChild(para);
            document.getElementById("historyTest2").innerHTML = monthName[months] + ", year " + years + " - " + fish.fishFullNames + ": Extinct"
            fish.killALife()
            $("#fishSelect option").filter(function (i, e) {
                return $(e).text() == fish.fishFullNames
            }).addClass("deadFish")
        } else {
            // console.log("test")
        }
    });
}

//OCEAN FUNCTIONS//
function oceanFunction() { //Controls the ocean
    if (oceanTemperature > 0 && oceanTemperature <= 35) { //Temperature stays between 0 and 35 celsius
        oceanTemperature = oceanTemperature + (Math.random() * 4) - 2; //Gives random temperature based on the previous year
    } else if (oceanTemperature >= 36) {
        oceanTemperature = oceanTemperature + (Math.random() * 3) - 6; //Makes sure the temperature wont rise too high
    } else {
        oceanTemperature = oceanTemperature + (Math.random() * 3); //Makes sure the temperature wont sink too low
    }
    if (oceanSalinity > 1.0 && oceanSalinity <= 5.0) {
        oceanSalinity = oceanSalinity + (Math.random() * 0.3) - 0.15; //Gives random salinity based on the previous year
    } else if (oceanSalinity >= 5) {
        oceanSalinity = oceanSalinity + (Math.random() * 0.25) - 0.5; //Makes sure the salinity wont rise too high
    } else {
        oceanSalinity = oceanSalinity + (Math.random() * 0.25); //Makes sure the salinity wont sink too low
    }
    if (oceanFishingVessel > 1.0 && oceanFishingVessel <= 5.0) {
        oceanFishingVessel = oceanFishingVessel + (Math.random() * 4) - 2;
    } else if (oceanFishingVessel >= 5) {
        oceanFishingVessel = oceanFishingVessel + (Math.random() * 2) - 1;
    }

    if (oceanPredators > 1.0 && oceanPredators <= 5.0) {
        oceanPredators = oceanPredators + (Math.random() * 4) - 2;
    } else if (oceanPredators >= 5) {
        oceanPredators = oceanPredators + (Math.random() * 2) - 1;
    }

    document.getElementById("ocean1").innerHTML = "Ocean name:" + randomOceanName + "<br>" +
        "Plankton: " + kFormatter(planktonAmount.toFixed(0)) + "t" + "<br>" +
        "Ocean temperature: " + oceanTemperature.toFixed(1) + "°C" + "<br>" +
        "Ocean salinity: " + oceanSalinity.toFixed(1) + "%" + "<br>" +
        "Fishing vessels: " + oceanFishingVessel.toFixed(0) + "<br>" +
        "Predators: " + oceanPredators.toFixed(0)


}

function oceanPlankton() { //Controls the amount of plankton
    var randomNumber = (Math.random() * (1.2 - 0.8) + 0.8).toFixed(4)
    planktonAmount = planktonAmount * randomNumber //Multiplies amount of plankton by a number between (max-min) + min
}

function oceanName() {
    var oceanList1 = ["The Ancient", "The Supreme", "The Great", "The Wet", "The Deep", "The Cold", "The Neptunian", "The Huge", "The Massive", "The Terrifying",
        "The Old", "The New", "The Small", "The Stormy", "The Dark", "The Restless", "The Shoreless", "The Polar", "The Beautiful", "The Attractive", "The Agonizing",
        "The Lovely", "The Wild", "The Tiny", "The Sexy", "The Unruly", "The Quiet", "The Harrowing", "The Hollow", "The Chilling", "The Brutal", "The Unforgiving", "The Stormy", "The Forsaken", "The Calm"
    ]
    var oceanList2 = ["Sea", "Ocean", "Abyss"]
    var oceanList3 = ["of Death", "of Dead Fish", "of Secrets", "of Hopelessness", "of Desperation", "of Misery", "of Sorrow", "of Pain", "of Misery", "of Regret", "of Remorse",
        "of Suffering", "of Hardship", "of Misfortune", "of Torment", "of Discomfort", "of Bitterness", "of Regret", "of Dissatisfaction", "of Mourning", "of Grief", "of Angry Plankton", "of Dead Plankton", "of Terrible Secrets"
    ]
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

function oceanFoodLeft() {
    var planktonAvailability = 0
    var newWeightModifier = fishWeightModifier();
    planktonAvailability = (planktonAmount / (sum * 1.2))
    if (planktonAvailability >= 200) {
        foodSurplus = 0.37 - newWeightModifier
        return foodSurplus;
    } else if (planktonAvailability >= 100 && planktonAvailability < 200) {
        foodSurplus = 0.36 - newWeightModifier
        return foodSurplus;
    } else if (planktonAvailability < 100 && planktonAvailability > 50) {
        foodSurplus = 0.35 - newWeightModifier
        return foodSurplus;
    } else {
        foodSurplus = 0.34 - newWeightModifier
        return foodSurplus;
    }
}

function fishWeightModifier() { //Returns modifier which will be added to the plankton available
    var weightModifier = 0
    finalFishInformationList.forEach(function (fish) {
        fishWeight = fish.fishAverageSizeKg; //Go through each fish weight and see how it affects the weight modifier
        if (fishWeight <= 5) { //tiny
            if (finalFishInformationList.length > 7) {
                weightModifier += 0.00025;
            } else {
                weightModifier += 0.002;
            }
        } else
        if (fishWeight > 5 && fishWeight <= 10) { //small
            if (finalFishInformationList.length > 7) {
                weightModifier += 0.00025;
            } else {
                weightModifier += 0.0025;
            }
        } else
        if (fishWeight > 10 && fishWeight <= 15) { //big
            if (finalFishInformationList.length > 7) {
                weightModifier += 0.00035;
            } else {
                weightModifier += 0.006;
            }
        } else //huge
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

function conservationStatus() {
    finalFishInformationList.forEach(function (fish) {
        document.getElementById("speciesPop").innerHTML = "Species population size: " + fish.fishTotalAmount.toFixed(0)
        document.getElementById("speciesCons").innerHTML = "Conservation status: " + fish.fishConservationStatus
        if (fish.getAmount() >= 500000) {
            fish.fishConservationStatus = "Least concern (LC)"
        } else if (fish.getAmount() < 500000 && fish.getAmount() >= 250000) {
            fish.fishConservationStatus = "Near threatened (NT)"
        } else if (fish.getAmount() < 250000 && fish.getAmount() >= 50000) {
            fish.fishConservationStatus = "Vulnerable (VU)"
        } else if (fish.getAmount() < 50000 && fish.getAmount() >= 2500) {
            fish.fishConservationStatus = "Endangered (EN)"
        } else if (fish.getAmount() < 2500 && fish.getAmount() >= 50) {
            fish.fishConservationStatus = "Critically endangered (CR)"
        } else {
            fish.fishConservationStatus = "Extinct (EX)"
        }
    });
}

function temperatureResistance() { //Fish temperature modifiers
    finalFishInformationList.forEach(function (fish) {
        var tempDifference = oceanTemperature.toFixed(0) - fish.fishTemperatureTolerance
        if (tempDifference < -17 || tempDifference > 17) {
            fish.fishTempModifier = 0.34
        } else if ((tempDifference >= 11 && tempDifference <= 17) || (tempDifference <= -11 && tempDifference >= -17)) {
            fish.fishTempModifier = 0.35
        } else if ((tempDifference >= 5 && tempDifference <= 10) || (tempDifference <= -5 && tempDifference >= -10)) {
            fish.fishTempModifier = 0.36
        } else {
            fish.fishTempModifier = 0.37
        }
    });

}

function saltResistance() { //Fish temperature modifiers
    finalFishInformationList.forEach(function (fish) {
        var saltDifference = oceanSalinity.toFixed(0) - fish.fishSaltTolerance
        if (saltDifference < -4 || saltDifference > 4) {
            fish.fishSaltModifier = 0.34
        } else if ((saltDifference >= 2.5 && saltDifference <= 4) || (saltDifference <= -2.5 && saltDifference >= -4)) {
            fish.fishSaltModifier = 0.35
        } else if ((saltDifference >= 1 && saltDifference <= 2.4) || (saltDifference <= -1 && saltDifference >= -2.4)) {
            fish.fishSaltModifier = 0.36
        } else {
            fish.fishSaltModifier = 0.37
        }
    });

}

function ing() { //Fish population growth rate
    var bornRate = 0
    var deathRate = 0
    var growthModifier = 0
    var lastStand = 1
    var weakGenes = 1
    var deathByOtherFish = 0
    var defenseThing = 0
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() < 500) {
            lastStand = 1.035
        } else if (fish.getAmount() > 750000) {
            weakGenes = 0.96
        } else if (fish.getAmount() > 2000000) {
            weakGenes = 0.9
        } else if (fish.getAmount() > 1000000) {
            weakGenes = 0.1
        } else {
            laststand = 1
            weakGenes = 1
        }

        if (fish.getAmount() > 50) { //Minimum amount of fish a species need for survival
            bornRate = fish.fishTempModifier + foodSurplus + fish.fishSaltModifier
            deathRate = fish.fishDeathByFishers + fish.fishDeathByPredators
            growthModifier = bornRate - deathRate
            deathByOtherFish = (((sumDamageDone - fish.fishDamageDone) * fish.relativeStrengthPercentage / 100)) * fish.fishDefenseModifier
            fish.fishTotalAmount = ((((fish.fishTotalAmount) * (growthModifier)) - (fish.fishTotalAmount * 0.05)) * (lastStand)) * (weakGenes) //TOTAL FISH AMOUNT * GROWTHMODIFIER-DEATH RATE
            fish.fishTotalAmount = fish.fishTotalAmount - deathByOtherFish
            return fish.fishTotalAmount
        } else if (fish.getAmount() <= 50) {
            fish.fishTotalAmount = 0
        }
    });
}

function updateDifference() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getPlayer())
            var tempDifference = fish.fishTemperatureTolerance - oceanTemperature.toFixed(0)
        var saltDifference = fish.fishSaltTolerance - oceanSalinity.toFixed(1)
        document.getElementById("speciesTemp").innerHTML = "Optimal temperature: " + fish.fishTemperatureTolerance + "°C  (Difference: " + tempDifference + "°C)"
        document.getElementById("speciesSalt").innerHTML = "Optimal salinity: " + fish.fishSaltTolerance + "%  (Difference: " + saltDifference.toFixed(1) + "%)"
        document.getElementById("speciesTemp2").innerHTML = "Optimal temperature: " + fish.fishTemperatureTolerance + "°C  (Difference: " + tempDifference + "°C)"
        document.getElementById("speciesSalt2").innerHTML = "Optimal salinity: " + fish.fishSaltTolerance + "%  (Difference: " + saltDifference.toFixed(1) + "%)"
    });
}

function marketValue() { //The price for each fish
    finalFishInformationList.forEach(function (fish) {
        finalFishInformationList[i].getValue()
        fish.fishMarketValue = fish.fishAverageSizeKg + (Math.random() * (30 - 1.00) + 1.00);
        return fish.fishMarketValue
    });
}

function fishDeathByMarketValue() { //Fish death caused by fishing
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.fishMarketValue.toFixed(1) >= 40) {
            fish.fishDeathByFishers = 0.00007 * oceanFishingVessel
        } else if (fish.getAmount() > 50 && fish.fishMarketValue.toFixed(1) >= 30 && fish.fishMarketValue.toFixed(1) < 40) {
            fish.fishDeathByFishers = 0.00005 * oceanFishingVessel
        } else if (fish.getAmount() > 50 && fish.fishMarketValue.toFixed(1) >= 20 && fish.fishMarketValue.toFixed(1) < 30) {
            fish.fishDeathByFishers = 0.00003 * oceanFishingVessel
        } else if (fish.getAmount() > 50 && fish.fishMarketValue.toFixed(1) >= 10 && fish.fishMarketValue.toFixed(1) < 20) {
            fish.fishDeathByFishers = 0.000015 * oceanFishingVessel
        } else if (fish.getAmount() > 50 && fish.fishMarketValue.toFixed(1) < 10) {
            fish.fishDeathByFishers = 0.0000075 * oceanFishingVessel
        }
    });
}

function fishDeathByPredatorsFunction() { //Fish death caused by predators
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.fishTaste == 6) {
            fish.fishDeathByPredators = 0.00002 * oceanPredators
        } else if (fish.getAmount() > 50 && fish.fishTaste == 5) {
            fish.fishDeathByPredators = 0.000015 * oceanPredators
        } else if (fish.getAmount() > 50 && fish.fishTaste == 4) {
            fish.fishDeathByPredators = 0.00001 * oceanPredators
        } else if (fish.getAmount() > 50 && fish.fishTaste == 3) {
            fish.fishDeathByPredators = 0.000005 * oceanPredators
        } else if (fish.getAmount() > 50 && fish.fishTaste == 2) {
            fish.fishDeathByPredators = 0.0000025 * oceanPredators
        } else if (fish.getAmount() > 50 && fish.fishTaste == 1) {
            fish.fishDeathByPredators = 0.00000125 * oceanPredators
        } else if (fish.getAmount() > 50 && fish.fishTaste == 0) {
            fish.fishDeathByPredators = 0 * oceanPredators
        }

    });
}

//COMBAT FUNCTIONS//

function fishInFightCount() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.fishIsAlive == 1) {
            fish.fishFightingPopNumber = fish.fishTotalAmount * fish.fishFightingPopPercentage
            return fish.fishFightingPopNumber;
        }
    });
    fishInFightFunction()
}
var sumFight = 0

function fishInFightFunction() {
    var fishAmountInFight = []
    finalFishInformationList.forEach(function (fish) {
        finalFishInformationList[i].getFightAmount()
        fishAmountInFight.push(fish.fishFightingPopNumber)
        sumFight = fishAmountInFight.reduce(function (a, b) {
            return a + b;
        }, 0);
    });
    return sumFight;
}

function damageDoneFunction() {
    var damageDoneTotalList = []
    finalFishInformationList.forEach(function (fish) {
        if (fish.fishIsAlive == 1) {
            fish.relativeStrengthPercentage = fish.fishFightingPopNumber / sumFight * 100
            fish.fishDamageDone = fish.fishAttackModifier * fish.fishFightingPopNumber
            damageDoneTotal()
            return fish.fishDamageDone;
        }
    });
}
var sumDamageDone = 0

function damageDoneTotal() {
    var damageDoneTotalList = []

    finalFishInformationList.forEach(function (fish) {
        finalFishInformationList[i].getDamage()
        damageDoneTotalList.push(fish.fishDamageDone)
        sumDamageDone = damageDoneTotalList.reduce(function (a, b) {
            return a + b;
        }, 0);
    });
    return sumDamageDone;
}

//ADAPTION FUNCTIONS//
function adaptionPoints() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.getPlayer()) {
            var tempDifference = fish.fishTemperatureTolerance - oceanTemperature.toFixed(0)
            var saltDifference = fish.fishSaltTolerance - oceanSalinity.toFixed(1)
            fish.addAdaption()
            document.getElementById("speciesName").innerHTML = "Species name: " + fish.fishFullNames
            document.getElementById("adaptionPoints").innerHTML = "Adaption points available: " + fish.fishAdaptionPoints
            document.getElementById("speciesTaste").innerHTML = "Taste: " + taste[fish.fishTaste]
            document.getElementById("speciesTaste2").innerHTML = "Taste: " + taste[fish.fishTaste]
            document.getElementById("adaptions").innerHTML = "AP: " + fish.fishAdaptionPoints + " EP: " + fish.fishEvolutionPoints
            document.getElementById("speciesValue").innerHTML = "Market value: " + fish.fishMarketValue.toFixed(2) + "€/kg"
            document.getElementById("speciesTemp2").innerHTML = "Optimal temperature: " + fish.fishTemperatureTolerance + "°C  (Difference: " + tempDifference + "°C)"
            document.getElementById("speciesSalt2").innerHTML = "Optimal salinity: " + fish.fishSaltTolerance + "%  (Difference: " + saltDifference.toFixed(1) + "%)"
        } else if (fish.getAmount() > 50 && fish.getPlayer() == 0) {
            fish.addAdaption()
        }
    });
}

function adaptionTemperaturePos() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.getPlayer() && fish.fishAdaptionPoints >= 1 && fish.fishTemperatureTolerance <= 35) {
            fish.fishTemperatureTolerance = fish.fishTemperatureTolerance + 1
            var tempDifference = fish.fishTemperatureTolerance - oceanTemperature.toFixed(0)
            document.getElementById("speciesTemp").innerHTML = "Optimal temperature: " + fish.fishTemperatureTolerance + "°C  (Difference: " + tempDifference + "°C)"
            fish.removeAdaption()
            document.getElementById("adaptions").innerHTML = "AP: " + fish.fishAdaptionPoints + " EP: " + fish.fishEvolutionPoints
            document.getElementById("adaptionPoints").innerHTML = "Adaption points available: " + fish.fishAdaptionPoints
            document.getElementById("speciesTemp2").innerHTML = "Optimal temperature: " + fish.fishTemperatureTolerance + "°C  (Difference: " + tempDifference + "°C)"
        }
    });
}

function adaptionTemperatureNeg() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.getPlayer() && fish.fishAdaptionPoints >= 1 && fish.fishTemperatureTolerance >= 1) {
            fish.fishTemperatureTolerance = fish.fishTemperatureTolerance - 1
            var tempDifference = fish.fishTemperatureTolerance - oceanTemperature.toFixed(0)
            document.getElementById("speciesTemp").innerHTML = "Optimal temperature: " + fish.fishTemperatureTolerance + "°C  (Difference: " + tempDifference + "°C)"
            fish.removeAdaption()
            document.getElementById("adaptions").innerHTML = "AP: " + fish.fishAdaptionPoints + " EP: " + fish.fishEvolutionPoints
            document.getElementById("adaptionPoints").innerHTML = "Adaption points available: " + fish.fishAdaptionPoints
            document.getElementById("speciesTemp2").innerHTML = "Optimal temperature: " + fish.fishTemperatureTolerance + "°C  (Difference: " + tempDifference + "°C)"
        }
    });
}

function adaptionSalinityPos() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.getPlayer() && fish.fishAdaptionPoints >= 1 && fish.fishSaltTolerance < 5) {
            fish.fishSaltTolerance = fish.fishSaltTolerance + 0.5
            var saltDifference = fish.fishSaltTolerance - oceanSalinity.toFixed(1)
            document.getElementById("speciesSalt").innerHTML = "Optimal salinity: " + fish.fishSaltTolerance + "%  (Difference: " + saltDifference.toFixed(1) + "%)"
            fish.removeAdaption()
            document.getElementById("adaptions").innerHTML = "AP: " + fish.fishAdaptionPoints + " EP: " + fish.fishEvolutionPoints
            document.getElementById("adaptionPoints").innerHTML = "Adaption points available: " + fish.fishAdaptionPoints
            document.getElementById("speciesSalt2").innerHTML = "Optimal salinity: " + fish.fishSaltTolerance + "%  (Difference: " + saltDifference.toFixed(1) + "%)"
        }
    });
}

function adaptionSalinityNeg() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.getPlayer() && fish.fishAdaptionPoints >= 1 && fish.fishSaltTolerance >= 0.5) {
            fish.fishSaltTolerance = fish.fishSaltTolerance - 0.5
            var saltDifference = fish.fishSaltTolerance - oceanSalinity.toFixed(1)
            document.getElementById("speciesSalt").innerHTML = "Optimal salinity: " + fish.fishSaltTolerance + "%  (Difference: " + saltDifference.toFixed(1) + "%)"
            fish.removeAdaption()
            document.getElementById("adaptions").innerHTML = "AP: " + fish.fishAdaptionPoints + " EP: " + fish.fishEvolutionPoints
            document.getElementById("adaptionPoints").innerHTML = "Adaption points available: " + fish.fishAdaptionPoints
            document.getElementById("speciesSalt2").innerHTML = "Optimal salinity: " + fish.fishSaltTolerance + "%  (Difference: " + saltDifference.toFixed(1) + "%)"
        }
    });
}

function adaptionTastePos() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.getPlayer() && fish.fishAdaptionPoints >= 1 && fish.fishTaste < 6) {
            fish.fishTaste = fish.fishTaste + 1
            document.getElementById("speciesTaste").innerHTML = "Taste: " + taste[fish.fishTaste]
            document.getElementById("speciesTaste2").innerHTML = "Taste: " + taste[fish.fishTaste]
            fish.removeAdaption()
            document.getElementById("adaptions").innerHTML = "AP: " + fish.fishAdaptionPoints + " EP: " + fish.fishEvolutionPoints
            document.getElementById("adaptionPoints").innerHTML = "Adaption points available: " + fish.fishAdaptionPoints

        }
    });
}

function adaptionTasteNeg() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && fish.getPlayer() && fish.fishAdaptionPoints >= 1 && fish.fishTaste >= 3) {
            fish.fishTaste = fish.fishTaste - 1
            document.getElementById("speciesTaste").innerHTML = "Taste: " + taste[fish.fishTaste]
            document.getElementById("speciesTaste2").innerHTML = "Taste: " + taste[fish.fishTaste]
            fish.removeAdaption()
            document.getElementById("adaptions").innerHTML = "AP: " + fish.fishAdaptionPoints + " EP: " + fish.fishEvolutionPoints
            document.getElementById("adaptionPoints").innerHTML = "Adaption points available: " + fish.fishAdaptionPoints
        }
    });
}

function aiAdaptionTasteOrTemp() {
    finalFishInformationList.forEach(function (fish) {
        var pickOne = Math.floor(Math.random() * 2) + 1
        var pickOne2 = Math.floor(Math.random() * 6) + 1
        if (fish.getAmount() > 50 && fish.fishAdaptionPoints >= 1 && fish.fishTaste >= 3 && fish.getPlayer() == false) {
            if (pickOne == 1) {
                aiAdaption()
            } else {
                fish.fishTaste = fish.fishTaste - 1
                fish.removeAdaption()
            }
        } else {
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
            if (pickOne == 1 && tempDifference > 0) {
                fish.fishTemperatureTolerance = fish.fishTemperatureTolerance + 1
                fish.removeAdaption()
            } else if (pickOne == 1 && tempDifference < 0) {
                fish.fishTemperatureTolerance = fish.fishTemperatureTolerance - 1
                fish.removeAdaption()
            } else if (pickOne == 2 && saltDifference > 0) {
                fish.fishSaltTolerance = fish.fishSaltTolerance + 0.5
                fish.removeAdaption()
            } else if (pickOne == 2 && saltDifference < 0) {
                fish.fishSaltTolerance = fish.fishSaltTolerance - 0.5
                fish.removeAdaption()
            }

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
        if ((tempSaltVsDifference > 0.6 || tempSaltVsDifference < -0.6) && fish.fishId != 0) {
            if ((fish.getAmount() > 50 && fish.fishAdaptionPoints >= 1) && tempDifference > 0 && fish.fishId != 0) {
                fish.fishTemperatureTolerance = fish.fishTemperatureTolerance + 1
                fish.removeAdaption()
            } else if ((fish.getAmount() > 50 && fish.fishAdaptionPoints >= 1) && tempDifference < 0 && fish.fishId != 0) {
                fish.fishTemperatureTolerance = fish.fishTemperatureTolerance - 1
                fish.removeAdaption()
            } else if ((fish.getAmount() > 50 && fish.fishAdaptionPoints >= 1) && saltDifference > 0 && fish.fishId != 0) {
                fish.fishSaltTolerance = fish.fishSaltTolerance + 0.5
                fish.removeAdaption()
            } else if ((fish.getAmount() > 50 && fish.fishAdaptionPoints >= 1) && saltDifference < 0 && fish.fishId != 0) {
                fish.fishSaltTolerance = fish.fishSaltTolerance - 0.5
                fish.removeAdaption()
            }
        }
    });

}
//EVOLUTION FUNCTIONS//
function evolutionPoints() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50) {
            fish.addEvolution() //Adds an evolution point
            document.getElementById("adaptions").innerHTML = "AP: " + fish.fishAdaptionPoints + " EP: " + fish.fishEvolutionPoints
            document.getElementById("evolutionPoints").innerHTML = "Evolution points available: " + fish.fishEvolutionPoints

        }
    });
}

function evolutionTaste() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getAmount() > 50 && (fish.getPlayer() && fish.fishEvolutionPoints >= 1) && (fish.fishTaste < 3 && fish.fishTaste >= 0)) {
            fish.fishTaste = fish.fishTaste - 1
            fish.fishEvolutionPoints = fish.fishEvolutionPoints - 1
            document.getElementById("speciesTaste").innerHTML = "Taste: " + taste[fish.fishTaste]
            document.getElementById("speciesTaste2").innerHTML = "Taste: " + taste[fish.fishTaste]
            if (talentTaste.textContent == "Inedibility 0/2") {
                talentTaste.textContent = "Inedibility 1/2"
                ctx2.beginPath();
                ctx2.moveTo(100, 70);
                ctx2.lineTo(110, 80)
                ctx2.stroke();
                ctx2.beginPath();
                ctx2.moveTo(110, 70);
                ctx2.lineTo(100, 80)
                ctx2.stroke();
            } else if (talentTaste.textContent == "Inedibility 1/2") {
                talentTaste.textContent = "Inedibility 2/2"
                ctx2.beginPath();
                ctx2.moveTo(110, 70);
                ctx2.lineTo(120, 80)
                ctx2.stroke();
                ctx2.beginPath();
                ctx2.moveTo(120, 70);
                ctx2.lineTo(110, 80)
                ctx2.stroke();
            }

        }
    });
}
//RANDOM FUNCTIONS//
function shuffle(fullNameList) { //Performs the Fisher–Yates shuffle on fullNameList so the first values can be chosen for fish names.
    var currentIndex = fullNameList.length,
        temporaryValue, randomIndex;
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
    } else if (num > 999999) {
        return num > 999999 ? (num / 1000000).toFixed(0) + 'M' : num
    } else {
        return num
    }
}
var notAgain = 0

function fishAliver() {
    var deadArray = []
    finalFishInformationList.forEach(function (fish) {
        finalFishInformationList[i].getALife()
        deadArray.push(fish.fishIsAlive)
        sumOfDead = deadArray.reduce(function (a, b) {
            return a + b;
        }, 0);

    });

    if (sumOfDead > 1 && notAgain == 0) {
        finalFishInformationList.forEach(function (fish) {
            if (fish.getPlayer() && fish.fishIsAlive == 0) {
                playAgain()
                notAgain = 1
                return notAgain;
            }
        });
    }
    if (sumOfDead == 1) {
        finalFishInformationList.forEach(function (fish) {
            if (fish.getALife() == 1) {
                if (fish.getPlayer()) {
                    var para = document.createElement("p");
                    var node = document.createTextNode(monthName[months] + ", year " + years + " - Only the " + randomonceWhat + " species " + fish.fishFullNames +
                        " is alive in the ocean! They are the first fish to rule the sea alone since the Great Protofish. With no competition, survival seems guaranteed.");
                    document.getElementById("historyTest2").innerHTML = monthName[months] + ", year " + years + " - " + fish.fishFullNames + ": Last species alive"
                    para.appendChild(node);
                    var element = document.getElementById("historyTest");
                    element.appendChild(para);
                    playAgainWin()
                } else {
                    var para = document.createElement("p");
                    var node = document.createTextNode(monthName[months] + ", year " + years + " - Only the " + randomonceWhat + " species " + fish.fishFullNames +
                        " is alive in the ocean! They are the first fish to rule the sea alone since the Great Protofish. With no competition, survival seems guaranteed.");
                    document.getElementById("historyTest2").innerHTML = monthName[months] + ", year " + years + " - " + fish.fishFullNames + ": Last species alive"
                    para.appendChild(node);
                    var element = document.getElementById("historyTest");
                    element.appendChild(para);
                    playAgain()
                }
            }
        });
    }
}

function playAgainWin() {
    document.getElementById("wrapper").style.display = "none";
    document.getElementById("wrapper2").style.display = "none";
    document.getElementById("hideButtons").style.display = "none";
    document.getElementById("smallLogo").style.display = "none";
    document.getElementById("textBoxThing").style.display = "none";
    document.getElementById("playAgain").style.display = "block";
    document.getElementById("gameWon").style.display = "block";
    document.getElementById("hideButtons").style.display = "none";
    document.getElementById("historyScreen").style.display = "none";
    document.getElementById("speciesScreen").style.display = "none";
    document.getElementById("speciesScreenAi").style.display = "none";
    document.getElementById("evolutionScreen").style.display = "none";
    document.getElementById("mapScreen").style.display = "none";
    document.getElementById("combatScreen").style.display = "none";
}

function playAgain() {
    document.getElementById("wrapper").style.display = "none";
    document.getElementById("wrapper2").style.display = "none";
    document.getElementById("hideButtons").style.display = "none";
    document.getElementById("smallLogo").style.display = "none";
    document.getElementById("textBoxThing").style.display = "none";
    document.getElementById("playAgain").style.display = "block";
    document.getElementById("gameLost").style.display = "block";
    document.getElementById("historyScreen").style.display = "none";
    document.getElementById("speciesScreen").style.display = "none";
    document.getElementById("evolutionScreen").style.display = "none";
    document.getElementById("mapScreen").style.display = "none";
    document.getElementById("speciesScreenAi").style.display = "none";
    document.getElementById("combatScreen").style.display = "none";
}

function continueFunction() {
    document.getElementById("wrapper").style.display = "block";
    document.getElementById("wrapper2").style.display = "block";
    document.getElementById("hideButtons").style.display = "block";
    document.getElementById("smallLogo").style.display = "block";
    document.getElementById("textBoxThing").style.display = "block";
    document.getElementById("playAgain").style.display = "none";
    document.getElementById("historyScreen").style.display = "block";
}
//AUDIO FUNCTIONS//
function play() {
    var audio = document.getElementById("audio");
    audio.play();
}


//JQUERY FUNCTIONS//
$(document).ready(function () {
    $(function () {
        setInterval(function () {
            $('h1').effect('bounce', 1000)
        }, 500);
        setInterval(function () {
            $('h1').effect('puff', 1000)
        }, 500);
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 107 && gameSpeed == 500) {
            (gameSpeed = gameSpeed - 250);
            console.log("Gamespeed x2")
        } else if (e.keyCode == 107 && gameSpeed == 250) {
            (gameSpeed = gameSpeed - 125);
            console.log("Gamespeed x3")
        } else if (e.keyCode == 107 && gameSpeed == 125) {
            (gameSpeed = gameSpeed - 62.5);
            console.log("Gamespeed x4")
        } else if (e.keyCode == 109 && gameSpeed == 250) {
            (gameSpeed = gameSpeed + 250);
            console.log("Gamespeed x1")
        } else if (e.keyCode == 109 && gameSpeed == 125) {
            (gameSpeed = gameSpeed + 125);
            console.log("Gamespeed x2")
        } else if (e.keyCode == 109 && gameSpeed == 62.5) {
            (gameSpeed = gameSpeed + 62.5);
            console.log("Gamespeed x3")
        } else if (e.keyCode == 32) {
            if (pause == 1) {
                pause = 0
                console.log("Game Paused")
            } else if (pause == 0) {
                pause = 1
                timeFunction()
                console.log("Game Unpaused")
            }
        } else if (e.keyCode == 13) {
            if (gameSpeed != 1) {
                gameSpeed = 1
            } else {
                gameSpeed = 500
            }
        }
    });
    $('#speed1').click(function () {
        gameSpeed = 500;
    });
    $('#speed2').click(function () {
        gameSpeed = 250;
    });
    $('#speed3').click(function () {
        gameSpeed = 125;
    });
    $('#speed4').click(function () {
        gameSpeed = 62.5;
    });
    $('#pause').click(function () {
        if (pause == 1) {
            pause = 0
            console.log("Game Paused")
        } else if (pause == 0) {
            pause = 1
            timeFunction()
            console.log("Game Unpaused")
        }
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 49) {
            mapScreenFunction();
        } else if (e.keyCode == 50) {
            speciesScreenFunction();
        } else if (e.keyCode == 51) {
            evolutionScreenFunction();
        } else if (e.keyCode == 52) {
            historyScreenFunction();
        }
    });

    $('select').on('change', function () {
        testFunction(this.value)

    });
});

function fishNamesToDropDown() {
    finalFishInformationList.forEach(function (fish) {
        if (fish.getPlayer() == 0) {
            var testar = document.getElementById("fishSelect");
            var option = document.createElement("option");
            option.text = fish.fishFullNames;
            testar.add(option);
        }
    });
}

function testFunction(jesus) {
    finalFishInformationList.forEach(function (fish) {
        if (jesus == fish.getName()) {
            var tempDifference = fish.fishTemperatureTolerance - oceanTemperature.toFixed(0)
            var saltDifference = fish.fishSaltTolerance - oceanSalinity.toFixed(1)
            document.getElementById("speciesNameAi").innerHTML = "Species name: " + fish.fishFullNames
            document.getElementById("speciesPopAi").innerHTML = "Species population size: " + fish.fishTotalAmount.toFixed(0)
            document.getElementById("speciesConsAi").innerHTML = "Conservation status: " + fish.fishConservationStatus
            document.getElementById("adaptionPointsAi").innerHTML = "Adaption points available: " + fish.fishAdaptionPoints
            document.getElementById("speciesTempAi").innerHTML = "Optimal temperature: " + fish.fishTemperatureTolerance + "°C  (Difference: " + tempDifference.toFixed(0) + "°C)"
            document.getElementById("speciesSaltAi").innerHTML = "Optimal salinity: " + fish.fishSaltTolerance + "%  (Difference: " + saltDifference.toFixed(1) + "%)"
            document.getElementById("speciesTasteAi").innerHTML = "Taste: " + taste[fish.fishTaste]
            document.getElementById("speciesValueAi").innerHTML = "Market value: " + fish.fishMarketValue.toFixed(2) + "€/kg"
        }
    });
}