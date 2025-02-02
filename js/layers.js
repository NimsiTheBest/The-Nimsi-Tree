addLayer("m", {
    name: "memes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "memes", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('m', 13)) mult = mult.times(upgradeEffect('m', 13))
        if (hasUpgrade('f', 11)) mult = mult.times(5)
        if (hasUpgrade('m', 22)) mult = mult.times(upgradeEffect('m', 22))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for MEMES", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Quality Shitposting",
            description: "Doubles your point gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Self-depcrating Humor",
            description: "Increased point gain based on your memes.",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { 
                return hasUpgrade("m", 11); 
            },
        },
        13: {
            title: "Anti-memes",
            description: "Increased memes gain based on your points.",
            cost: new Decimal(7),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { 
                return hasUpgrade("m", 12); 
            },
        },
        21: {
            title: "Triple Trouble",
            description: "3x point gain.",
            cost: new Decimal(15),
            unlocked() { 
                return hasUpgrade("m", 12); 
            },
        },
        22: {
            title: "Memeception",
            description: "Memes boost memes.",
            effect() {
                return player.m.points.add(1).pow(0.15)
            },
            cost: new Decimal(30),
            unlocked() { 
                return (hasUpgrade("m", 12) && hasUpgrade("m", 21)); 
            },
        },
        53: {
            title: "FNaF memes",
            description: "Increased memes gain based on Fazcoins.",
            cost: new Decimal(15),
            effect() {
                return player.points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() { 
                return hasUpgrade("f", 11); 
            },
        },
    },
})

addLayer("f", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#884B10",                       // The color for this layer, which affects many elements.
    resource: "fazcoins",                   // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    hotkeys: [
        {key: "f", description: "F: Reset for Fazcoins", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    baseResource: "memes",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.m.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10000),           // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.
    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    branches: ["m"],

    upgrades: {
        11: {
            title: "FNaF Memes",
            description: "5x meme gain.",
            cost: new Decimal(1),
        },
    },
})