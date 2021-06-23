const chalk = require('chalk')
const prompt = require('prompt-sync')({sigint:true});

console.log("")
console.log(chalk.bgBlue("You've gone fishing! Try to maximize the value of your caught fish. You can fish for six hours (till 12:00pm) and can catch at most 10 lbs of fish."))
console.log("")
console.log("=================================================")
console.log("")

// Saved data and information

let fishesCaught = []
let fishing ={
    weight : 0,
    value: 0,
    treasure: 0,
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
    else if(2<= weight && weight <3){
        return "Medium"
    }
    else if(3<= weight && weight <4){
        return "Big"
    }
    else if(weight && weight >= 4){
        return "Huge"
    }
}
function timeStamp(time){
    let hour = 6
    let minutes = 0
    while(time >= 60){
        time -= 60
        hour += 1
    }
    minutes = time
    let formattedHr = ("0" + hour).slice(-2)
    let formattedMin = ("0" + minutes).slice(-2)
    return `${formattedHr}:${formattedMin}am`
}
function selectionValidator(input, a, b){
    if(input === a){
        return "add"
    }
    else if(input === b){
        return "deny"
    }
    else{
        console.log(chalk.redBright("Please select a valid option."))
        i = prompt(">")
        return selectionValidator(i,a,b)
    }
}
let timesUp = ""


while (time< 360){
    time += (Math.ceil(randomNumber(15,90)))
    if(time > 360){
        timesUp = "Your ran out of time before you can catch another fish."
        break
    }
    console.log(`The time is ${chalk.greenBright(timeStamp(time))}. So far you've caught:`)
    console.log(chalk.yellow(` ${fishing.fishes.length} fish(s),`), chalk.cyan(`${fishing.weight.toFixed(2)} lbs,`), chalk.green(`$${fishing.value.toFixed(2)}`))
    console.log("")
    // weight checker
    if(fishing.weight >10){
        break
    }
    // catching fish
    const fishes = ["Bass", "bowfin", "Golden dubloon", "catfish", "Valueless Boot", "walleye", "lake sturgeon", "nothern pike", "salmon", "trout"];
    let weight =(Math.round(randomNumber(0,5)*100)/100)
    let result = `${(fishes[Math.ceil(randomNumber(0,fishes.length-1))])}`
    let fishCaught =`${fishSizeChecker(weight)} ${result}`
    if(result === "Valueless Boot"){
        console.log(`Bummer, You got a ${chalk.magenta(result)} instead of a fish.`)
        console.log("Your action: Please press [c] or [r] to continue fishing.")
        const confirm = prompt(">")
        selectionValidator(confirm , "c","r");
    }
    else if(result === "Golden dubloon"){
        console.log(chalk.whiteBright.bgGray(`LUCKY!!! You got a high-value ${chalk.yellowBright(result)} valued at`, chalk.greenBright("$500"),"."))
        console.log("Your action: [k]eep or [t]hrow away?")
        const confirm = prompt(">")
        const valid = selectionValidator(confirm, "k", "t");
        if(valid == "add"){
            console.log(chalk.bgGray("You chose to keep the dubloon."))
            fishing.value += 500;
            fishing.treasure +=1;
        }
        else if(valid == "deny"){
            console.log(chalk.bgGray("You chose to toss the dubloon."))
        }
    }
    else{// I had the price of the fishes scale off weight instead of randomizing it
    // let price =(Math.round((Math.random()*100)*100)/100)
    let price =(Math.round((weight*11.99)*100)/100)

    console.log(`You caught a '${chalk.yellowBright(fishCaught)}' weighing`, chalk.cyanBright(`${weight} lbs`), `and valued at`, chalk.green(`$${price.toFixed(2)}`))

    console.log("Your action: [c]atch or [r]elease?")
    let input = prompt('>')
    console.log("")
    const totalWeight = fishing.weight + weight

    // Validate max weight
    if(totalWeight > 10){
        console.log("This fish would put you over 10 lbs, so you release it.")
    }
    else{
            // Selection validator
            const valid = selectionValidator(input, "c", "r");
            if(valid == "add"){
                console.log(chalk.bgGray("You chose to catch the fish."))
                addFish(weight,fishCaught,price)
            }
            else if(valid == "deny"){
                console.log(chalk.bgGray("You chose to release the fish."))
            }
        }}
    console.log("")
    console.log("=================================================")
    console.log("")
}
console.log("The time is", chalk.red("12:00pm."), "Times up!")
if(timesUp.length>0){
    console.log(timesUp)
}
console.log("")
console.log(`You caught ${fishing.fishes.length} fish:`)
for(const fish of fishing.fishes){
    console.log(`* ${chalk.yellow(fish.name)},`, chalk.cyan(`${fish.weight} lbs,`), chalk.green(`$${fish.value}`))
}
console.log("")
if(fishing.treasure >0){
    console.log(chalk.yellowBright(`You also found ${fishing.treasure} valuable item(s).`))
    console.log("")
}
console.log(`Total weight:`, chalk.cyanBright(`${fishing.weight.toFixed(2)} lbs`))
console.log(`Total value:`, chalk.greenBright(`$${fishing.value.toFixed(2)}`))
