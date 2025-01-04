---
title: 3DS Programming - Using RomFS
description: A guide to using RomFS on the 3DS. (Old)
date: 2025-01-01
tags: ['3ds', 'programming', 'c', 'devkitpro', 'old']
previous: old3ds_helloworld.md
next: old3ds_touchscreen.md
---

# Accessing ROM files with RomFS

::alert{type="warning"}
This guide of mine is old - Like 3 years old at the time of posting. I prefer to keep it up, but I don't think it very highly - It should still work though.
I might make a new one in the future.
I'm doing some alterations at least to make it more readable.
It doesn't teach why things are done very well is my primary issue with it.
::

RomFS allows us to access files stored on the ROM file, cartridge, or application.

It can be used to read things such as graphics assets, audio data, and other data.

## RomFS folder

You may have noticed while building that there is a folder named 'romfs' in your project:

```
- Project
  - build
  - **romfs**
  - source
  - Makefile
  - Project.3dsx
```

(If it is not already present, create it now.)

This is where all the program files are stored. These files are mounted on 'romfs:/' when the app is running.

If you have any sprites, they will appear in the 'gfx' directory inside of 'romfs:/', and are accessed accordingly.

Create a text file inside of 'romfs', name it something like 'sample.txt' (or 'sample' if you have file extensions off):

```
- Project
  - build
  - **romfs**
    - sample.txt
  - source
  - Makefile
  - Project.3dsx
```

This file will appear as 'romfs:/sample.txt' in the program.

## Using RomFS

We will initialize RomFS, check if a file exists, and then deinitialize.

### Initializing

Initializing RomFS is trivial - It only takes one simple function to do it:

```c
// Initialize the console
// ...

// Initialize RomFS
romfsInit();

// Main loop
// ...
```

### Using

To access a file, we do basically the exact same thing we could do on a home computer in C or C++, just with a different drive.

We will check if the file exists, first by trying to open it, and checking if it failed to open. This is what you would normally do in C:

```c
// Check if the file exists
FILE* file = fopen("romfs:/sample.txt", "r");

if (file == NULL) {
    // File does not exist
    puts("File does not exist.");
} else {
    // File exists
    puts("File exists.");
}

// Close the file
fclose(file);

// Main loop
```

You can play with this by adding or removing sample.txt from the 'romfs' folder.

### De-initializing

Like initializing RomFS, it only takes another simple function to de-initialize:

```c
// Main loop
// ...

// De-initialize RomFS
romfsExit();

// Return...
```

And that is all you need to access files on the ROM.

## Wrapping up

Our code should now look like this:

```c
#include <stdio.h>
#include <3ds.h>

int main() {
    // Initialize the console
    gfxInitDefault();
    consoleInit(GFX_BOTTOM, NULL);

    // Initialize RomFS
    romfsInit();

    // Check if the file exists
    FILE* file = fopen("romfs:/sample.txt", "r");

    if (file == NULL) {
        // File does not exist
        puts("File does not exist.");
    } else {
        // File exists
        puts("File exists.");
    }

    // Close the file
    fclose(file);

    // Main loop
    while(aptMainLoop()) {
        // Scan for input
        hidScanInput();
        u32 kDown = hidKeysDown();

        // Close the program if START is pressed
        if (kDown & KEY_START) break;
    }

    // De-initialize RomFS
    romfsExit();

    return 0;
}
```