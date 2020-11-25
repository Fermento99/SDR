const jsdom = require("jsdom")
const {JSDOM} = jsdom
const fs = require("fs")

const filename = "games.html"


let input = ''
for(let i = 2; i < process.argv.length; i++) {
    input += process.argv[i]+ ' '
}

input = input.split(', ')

fs.readFile(filename, (err, data) =>{
    let dom = new JSDOM(data)    
    
    dom.window.document.getElementById("current-game").innerHTML = input[0]
    dom.window.document.getElementById("next-time").innerHTML = input[1]
    dom.window.document.getElementById("next-game").innerHTML = input[2]
    fs.writeFile(filename, dom.window.document.documentElement.outerHTML, e => {
        if(e)
            console.log("error", e)
        else
            console.log(`tytuł aktualnej gry: "${input[0]}"\nczas kolejnej gry: ${input[1]}\ntytuł kolejnej gry: "${input[2]}"`)
    })
})
