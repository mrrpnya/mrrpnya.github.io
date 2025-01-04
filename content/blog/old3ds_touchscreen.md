---
title: 3DS Programming - Touchscreen Input
description: A guide to using the touchscreen on the 3DS. (Old)
date: 2025-01-01
tags: ['3ds', 'programming', 'c', 'devkitpro', 'old']
previous: old3ds_romfs.md
---

# Touchscreen Input

> [!warning]
> This guide of mine is old - Like 3 years old at the time of posting. I prefer to keep it up, but I don't think it very highly - It should still work though.
> I might make a new one in the future.
> I'm doing some alterations at least to make it more readable.
> It doesn't teach why things are done very well is my primary issue with it.

Here we will find the position of a touch on the touchscreen.

It is very simple to do this.

## Getting the touch position

To find the touch position, we need to request the touchPosition type from the OS, and read from that.

We must first create a touchPosition like so:

```c
// Check for input
// ...

// Will contain the position of the touch
touchPosition touch;

// Will obtain that information
hidTouchRead(&touch);

// Exit program if START is pressed
// ...
```

Then, we must read from it like so:

The touch position is stored in our touchPosition as 'px' and 'py'.

## Printing the information to the screen

To print the position so we may see it, we should, instead of spamming the console with it, overwrite the X and Y position output by setting the position of the output first.

This would make it much easier to read, although we would need some whitespace after it to prevent anything getting printed without overwriting:

```c
// Print the touch screen coordinates
// Keep the whitespace if you do not want issues
printf("\x1b[1;0H X=%u Y=%u   ", touch.px, touch.py);

// Exit program if START is pressed
// ...
```

The position should default to [0, 0] when no touch is found:

![Failed to load image](/files/old3ds/touchscreen/dkp_touch0.png)

## Wrapping up

Our code should now look like this:
```c
#include <stdio.h>
#include <3ds.h>

int main() {
    // Initialize the console
    gfxInitDefault();
    consoleInit(GFX_BOTTOM, NULL);

    // Will contain the position of the touch
    // This can either be inside or outside the main loop
    touchPosition touch;

    while (aptMainLoop()) {
        // Check for input
        hidScanInput();

        // Will obtain that information
        hidTouchRead(&touch);

        // Print the touch screen coordinates
        // Keep the whitespace if you do not want issues
        printf("\x1b[1;0H X=%u Y=%u   ", touch.px, touch.py);

        // Exit program if START is pressed
        if (hidKeysDown() & KEY_START)
            break;
    }

    return 0;
}
```