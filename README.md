Hosted on github pages here: [](yahya-tamur.github.io/command_block_arranger)

Configure *any* number of command blocks using text!

Here's the problem: It's really annoying to edit a long command inside a
command block. You can edit it in Notepad, but if you have multiple command
blocks, it's still annoying to change all of them.

One solution is using functions in a data pack, instead of command blocks.
But then, if it's a server, you would have to change the data pack and reset
the server every time.

This lets you write many command blocks and paste all of them into your world
with a single command.

Here's how it works:
Input a target coordinate. Input any number of command block specifications,
such as:
```
[0, 0, 0, south] say 'aaaa'
[0, 0, 1, south, always_active, chain] say 'bbbb'
```
The numbers are relative coordinates from the target. You can also enter
shortened or capitalized specifications, such as `[0, 0, 1, S, aa, c]`. Enter
an invalid specification to see all the different options.


Click 'copy' to copy a very long command. Get a command block in
Minecraft. Paste the command, and activate the block. It will do some falling
sand hack to run a separate 'setblock' command for each specified command, 
then destroy itself.


to do:
-----

[#] make with just coordinates

 -- feature complete --

[#] full configuration
[#] favicon
[#] worked with a pretty complicated command! (there might still be problems)
[ ] try with a pretty complicated set of command blocks


[ ] url - sharing like topaz
[ ] better readme

[ ] format json?
[ ] collapse json? input json + ask people to format it themselves?
[ ] just turn off text wrap lmao? or just increase width?

notes:
------
* I always like writing programs-inside-programs like these. It might be my
highest number of consecutive backslashes yet, at 8.
* I haven't played Minecraft in a while, so I'm kind of guessing what would be
useful. Feel free to let me know if there's any changes I can make to make this
more user-friendly.
* setblock is set to 'destroy' the previous blocks, since 'replace' doesn't
override the command. If you're worried about the entities created by this,
setblock 'replace' the places the command blocks are going to go to with air
first. This is more useful, since I found that most often, I'll make a small
change to the commands and run the whole command again, replacing command
blocks, which requires the 'destroy'.
* Since minecraft commands can get pretty long, I've turned off the text
wrapping in the textbox. You can paste this into to terminal to turn it back on:
`document.getElementById('textbox').style['text-wrap'] = 'wrap'`
* I don't own the armored core image. It's from the wiki.
* A command block specifications should go at the beginning of a line. The
whitespace at the beginning and end of a command is removed, so feel free to
enter the command in the next line.
