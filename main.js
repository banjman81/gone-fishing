const prompt = require('prompt-sync')({sigint:true});
console.log("You've gone fishing! Try to maximize the value of your caught fish. You can fish for six hours (till 12:00pm) and can catch at most 10 lbs of fish.")
console.log("")
console.log("=================================================")
console.log("")

// Saved data and information

let fishesCaught = []
let fishing ={
    weight : 0,
    value: 0,
    fishes : fishesCaught
}

let time = 0

function randomNumber(min, max){
    return Math.random() * (max - min) + min
}
function addFish(weight, fish, price){
    fishesCaught.push({name : fish,
                weight : weight,
                value : price.toFixed(2)})
                fishing.value += Number(price)
                fishing.weight += Number(weight)
}
function fishSizeChecker(weight){
    if(weight < 1){
        return "Tiny"
    }
    else if(1< weight && weight <2){
        return "Small"
    }
    else if(2< weight && weight <3){
        return "Medium"
    }
    else if(3< weight && weight <4){
        return "Big"
    }
    else if(weight && weight > 4){
        return "Huge"
    }
}

while (time< 360){
    // weight checker
    if(fishing.weight >10){
        break
    }
    // catching fish
    const fishes = ["Bass", "bigmouth buffalo", "bowfin", "burbot", "catfish", "herring", "walleye", "lake sturgeon", "nothern pike", "salmon", "trout", "sunfish"];
    let weight =(Math.round(randomNumber(0,5)*100)/100)
    let fishCaught =`${fishSizeChecker(weight)} ${(fishes[Math.ceil(randomNumber(0,fishes.length-1))])}`
    let price =(Math.round((weight*10)*100)/100)
    time += (Math.ceil(randomNumber(15,90)))
    console.log(`${weight}lbs ${fishCaught} worth $${price.toFixed(2)}`)
    console.log("Your action: [c]atch or [r]elease?")
    let input = prompt('>')
    console.log("")
    const totalWeight = fishing.weight + weight

    // Validate max weight
    if(totalWeight > 10){
        console.log("This fish would put you over 10 lbs, so you release it.")
    }
    else{
            if(input === "c"){
            console.log("You chose to catch the fish.")
            addFish(weight,fishCaught,price)
            }
            else if(input ==="r"){
                console.log("You chose to release the fish.")
            }
            else{
                console.log("Please select a valid option.")
                input = prompt(">")
            }
        }
    console.log("")
}
console.log("The time is 12:00pm. Times up!")
console.log('')
console.log(`You caught ${fishing.fishes.length} fish:`)
for(const fish of fishing.fishes){
    console.log(`* ${fish.name}, ${fish.weight} lbs, $${fish.value}`)
}
console.log(`Total weight: ${fishing.weight} lbs`)
console.log(`Total value: $${fishing.value}`)
