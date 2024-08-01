document.getElementById('copy').onclick = () => {
    let [x, y, z] = eval('[' + document.getElementById('target').value + ']');
    console.log(x, y, z)
    let textbox = document.getElementById('textbox')
    navigator.clipboard.writeText(mangle(x, y, z, textbox.value))
}

// credit https://www.minecraftforum.net/forums/minecraft-java-edition/redstone-discussion-and/commands-command-blocks-and/2980388-1-14-1-17-multiple-commands-in-one-command-block
let start = `summon falling_block ~ ~.5 ~ {Time:1,BlockState: {Name: redstone_block},Passengers:[{id:armor_stand,Health:0,Passengers:[{id:falling_block,Time:1,BlockState:{Name:activator_rail},Passengers:[{id:command_block_minecart,Command:'`
let mid = `'}, {id:command_block_minecart,Command:'`

let end = `'},{id:command_block_minecart,Command:'setblock ~ ~1 ~ command_block{auto:1,Command:"fill ~ ~ ~ ~ ~-3 ~ air"}'}, {id:command_block_minecart,Command:'kill @e[type=command_block_minecart,distance=..1]'}]}]}]}`

function mangle(x, y, z, inp) {
    let l = inp.indexOf('[')

    let array = []

    while (l != -1) {
        let r = inp.indexOf(']', l)
        let [dx, dy, dz, ...config] = inp.substring(l + 1, r).split(',')
        dx = Number(dx)
        dy = Number(dy)
        dz = Number(dz)


        l = inp.indexOf('[', l + 1)
        let command = l == -1 ? inp.substring(r + 1) : inp.substring(r + 1, l)
        command = command.trim().replaceAll(`'`, `\\\\\\'`)

        let supercommand = `setblock ${x + dx} ${y + dy} ${z + dz} command_block{Command:\\'${command}\\'} replace`
        console.log(config, supercommand)

        //command = command.replaceAll(' ', '').replaceAll('\n', '')
        array.push(supercommand)
    }
    if (array.length == 0) {
        return ''
    }
    let fullcommand = start + array.reduce((a, b) => a + mid + b) + end
    //fullcommand = fullcommand.replaceAll(' ', '').replaceAll('\n', '')
    console.log(fullcommand)
    return fullcommand
}
