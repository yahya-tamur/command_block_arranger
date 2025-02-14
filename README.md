Hosted on github pages here: [yahya-tamur.github.io/command_block_arranger](https://yahya-tamur.github.io/command_block_arranger)

Configure any number of command blocks, and put all of them in your world by
running a single command!

Another solution would be using functions in a data pack, instead of command
blocks. But then, if you're on a server, you would have to change the data pack
and reset the server every time.

This lets you write many command blocks and paste all of them into your world
with a single command.

Here's how it works:
Input the target coordinates, separated by spaces. Input any number of command
block specifications, such as:
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

I got the falling sand thing from user 'Khoeckman' in
[this post](https://www.minecraftforum.net/forums/minecraft-java-edition/redstone-discussion-and/commands-command-blocks-and/2980388-1-14-1-17-multiple-commands-in-one-command-block).


Notes:
------
* I always like writing programs-inside-programs like these. It might be my
highest number of consecutive backslashes yet, at 8.
* I haven't played Minecraft in a while, so I'm kind of guessing what would be
useful. Feel free to let me know if there are any changes I can make to make
this more user-friendly.
* setblock is set to 'destroy' the previous blocks, since 'replace'ing a
command block doesn't override the command.
* I don't own the armored core image. It's from the wiki.
* A command block specification can only go at the beginning of a line. The
whitespace at the beginning and end of a command is removed, so feel free to
enter the command in the next line.
* There's a 32,500 character limit on command block commands. Since all the
commands you put in go into a single command, a rule of thumb is that if the
total number of characters is close to that, you might want to edit the text
in Notepad and paste it in ten to one hundred lines at a time, depending on the
length.
