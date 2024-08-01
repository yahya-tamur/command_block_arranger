document.getElementById('copy').onclick = () => {
    let [x, y, z] = eval('[' + document.getElementById('target').value + ']');
    if (isNaN(x) || isNaN(y) || isNaN(z)) {
        alert(`Please enter the target coordinates, like '18, 66, 2'`);
        return;
    }
    console.log(x, y, z)
    let textbox = document.getElementById('textbox')
    let m = mangle(x, y, z, textbox.value)
    if (m.length > 0) {
        navigator.clipboard.writeText(m)
        alert('copied!')
    }
}

// credit https://www.minecraftforum.net/forums/minecraft-java-edition/redstone-discussion-and/commands-command-blocks-and/2980388-1-14-1-17-multiple-commands-in-one-command-block
let start = `summon falling_block ~ ~.5 ~ {Time:1,BlockState: {Name: redstone_block},Passengers:[{id:armor_stand,Health:0,Passengers:[{id:falling_block,Time:1,BlockState:{Name:activator_rail},Passengers:[{id:command_block_minecart,Command:'`
let mid = `'}, {id:command_block_minecart,Command:'`

let end = `'},{id:command_block_minecart,Command:'setblock ~ ~1 ~ command_block{auto:1,Command:"fill ~ ~ ~ ~ ~-3 ~ air"}'}, {id:command_block_minecart,Command:'kill @e[type=command_block_minecart,distance=..1]'}]}]}]}`

let configs = {
    'n': [0, 'north'],
    'north': [0, 'north'],
    'w': [0, 'west'],
    'west': [0, 'west'],
    's': [0, 'south'],
    'south': [0, 'south'],
    'e': [0, 'east'],
    'east': [0, 'east'],
    'u': [0, 'up'],
    'up': [0, 'up'],
    'd': [0, 'down'],
    'down': [0, 'down'],
    'r': [1, 'repeating_'],
    'rep': [1, 'repeating_'],
    'repeating': [1, 'repeating_'],
    'c': [1, 'chain_'],
    'ch': [1, 'chain_'],
    'chain': [1, 'chain_'],
    'aa': [2, 'auto:1,'],
    'auto': [2, 'auto:1,'],
    'always_active': [2, 'auto:1,'],
    'cc': [3, 'true'],
    'conditional': [3, 'true'],
    'uc': [3, 'false'],
    'unconditional': [3, 'false']
}

function mangle(x, y, z, inp) {
    inp = '\n' + inp
    let l = inp.indexOf('\n[')

    let array = []

    while (l != -1) {
        let r = inp.indexOf(']', l)

        //facing, type, always active, conditional
        let config = ['north', '', '', 'false']
        let [dx, dy, dz, ...cfgs] = inp.substring(l + 2, r).split(',')
        dx = Number(dx)
        dy = Number(dy)
        dz = Number(dz)

        if (isNaN(dx) || isNaN(dy) || isNaN(dz)) {
            alert(`Each command should be prefixed by the relative position \
in square brackets, maybe followed by options, like '[0, 0, 0]' or ' \
[0, 0, 0, always_active]`)
            return ''
        }
        for (let cfg of cfgs) {
            cfg = cfg.trim().toLowerCase()
            if (!(cfg in configs)) {
                alert(`Unknown option. Here are a list of known options. Note \
that there are shorter and longer versions of the same \
options. Options aren't case-sensitive.\n` + String(Object.keys(configs)).replaceAll(',', ', '))
                return ''
            }
            let [a, b] = configs[cfg]
            config[a] = b
        }

        console.log('asdasd', dx, dy, dz, config)

        l = inp.indexOf('\n[', l + 1)
        let command = l == -1 ? inp.substring(r + 1) : inp.substring(r + 1, l)
        console.log(command)
        command = command.trim().replaceAll('\\', '\\\\').replaceAll(`'`, `\\\\\\'`)
        console.log(command)

        let supercommand = `setblock ${x + dx} ${y + dy} ${z + dz} \
${config[1]}command_block[conditional=${config[3]},facing=${config[0]}]\
{${config[2]}Command:\\'${command}\\'} replace`
        console.log(config, supercommand)

        //command = command.replaceAll(' ', '').replaceAll('\n', '')
        array.push(supercommand)
    }
    if (array.length == 0) {
        alert(`Please enter at least one command, like "[0, 0, 0] say 'a'"`)
        return ''
    }
    let fullcommand = start + array.reduce((a, b) => a + mid + b) + end
    //fullcommand = fullcommand.replaceAll(' ', '').replaceAll('\n', '')
    console.log(fullcommand)
    return fullcommand
}
