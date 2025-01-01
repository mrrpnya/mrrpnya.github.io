---
title: 3DS Programming - Hello World
description: A guide to creating a simple Hello, World program for the 3DS. (Old)
date: 2025-01-01
tags: ['3ds', 'programming', 'c', 'devkitpro', 'old']
next: old3ds_romfs.md
---

# Hello, World!

> [!warning]
> This guide of mine is old - Like 3 years old at the time of posting. I prefer to keep it up, but I don't think it very highly - It should still work though.
> I might make a new one in the future.
> I'm doing some alterations at least to make it more readable.
> It doesn't teach why things are done very well is my primary issue with it.

'Hello, World!' is a very simple program used for checking a program's build system, and showing its basic syntax.
We should do both before going forward. You should have your project set up for this.

And if you are using VSCode, I would recommend you get the include paths set up.

## Begin coding

Start by including 'stdio.h' (or 'cstdio'!) and '3ds.h'.
A quick explanation of '3ds.h'

'3ds.h' is the file containing references to all the VITAL things we can use to program on the system.

It does not include many features, such as (And certainly not limited to) rendering capabilities, aside from running the console)

## Main loop

Start by setting up a main function as usual for C/C++.

To initialize the graphics, we need to run gfxInitDefault().

To initialize the console, we need to run consoleInit([SCREEN HERE], NULL).

Replace '[SCREEN HERE]' with either GFX_TOP or GFX_BOTTOM, depending on what screen you want.

At this point, the code should look something like this:

<!-- Note: I originally used images for these, but... Why did I do that? -->

```c
#include <stdio.h>
#include <3ds.h>

int main() {
    // Initialize the console
    gfxInitDefault();
    consoleInit(GFX_BOTTOM, NULL);

    return 0;
}
```

As the console is now ready, you can now print to the screen. You can use puts(), printf(), std::cout, etc.

If we try and run it now, it should immediately close itself, as there is no main loop.

To create a main loop, we create a while loop with aptMainLoop() as its argument:

```c
// Initialize the console
// ...

/// Main loop
while(aptMainLoop()) {
    // Code here
}
```

This will loop infinitely until the user closes the program.

## Input

Okay, so we now have a main loop... How do we exit back to the Homebrew Launcher?

Simple. We can scan for input, and break if it detects a button, in this case START, being pressed.

We can scan for input with hidScanInput(), and get which keys are down with hidKeysDown() like so:

```c
// Main loop
while(aptMainLoop()) {
    // Scan for input
    hidScanInput();
    u32 kDown = hidKeysDown();
}
```

Every button is mapped to a different bit on the unsigned 32-bit integer.

We can get specific keys via an AND operation between the integer and the desired key:

```c
// Main loop
while(aptMainLoop()) {
    // Scan for input
    hidScanInput();
    u32 kDown = hidKeysDown();

    // Break if START is pressed
    if(kDown & KEY_START) break;
}
```

## Wrapping up

We can add V-Sync with gspWaitForVBlank(), which may help if you want that and don't want to draw anything aside from the console. You can disregard this if you want:

```c
// Main loop
while(aptMainLoop()) {
    // Scan for input
    // ...
    // Break if START is pressed
    // ...

    // Wait for V-Blank
    gspWaitForVBlank();
}

```

And we are done. You can run the program, and get the words 'Hello, World!' printed on the screen:

![Failed to load image](/files/old3ds/helloworld/dkp_progress0.png)
