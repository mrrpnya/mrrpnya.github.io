import { type Page, postDirectories, generatePageCategory, PageList } from "./update_pagelist.ts"
import * as pages from "./pages.ts";
import * as fs from "node:fs";
import * as path from "node:path";

// ---------------------------------------------------------------------------
// Build the PageList
// ---------------------------------------------------------------------------

/**
 * In the new structure, pages are stored under "content/[LANG]/[DIRECTORY]".
 * The following code:
 *  1. Reads the "content" directory to determine available language folders.
 *  2. For each language, loops over the defined postDirectories.
 *  3. If the expected subdirectory exists, it retrieves pages and adds them to the PageList.
 */
const contentRoot = "content";
// Read all items in the content root and filter for directories (languages)
const availableLangs = fs.readdirSync(contentRoot).filter((item) =>
    fs.statSync(path.join(contentRoot, item)).isDirectory()
);

export const postList = new PageList();

for (const lang of availableLangs) {
    // Ensure the language exists in our PageList.
    if (!postList.languages[lang]) {
        postList.languages[lang] = { categories: {} };
    }

    // Loop over each defined post category.
    for (const postDirectory of postDirectories) {
        // Construct the expected directory path for this language and category.
        // E.g., "content/en/site" or "content/fr/collections"
        const dirPath = path.join(contentRoot, lang, postDirectory.map);

        // If the directory doesn't exist for this language, skip it.
        if (!fs.existsSync(dirPath)) continue;

        // Retrieve page info for this directory.
        // We override the "root" with our computed directory path.
        const pagesInfo = pages.getPagesInfo("", {
            ...postDirectory,
            root: dirPath,
        });

        // If no pages are found, skip this category for the language.
        if (Object.keys(pagesInfo).length === 0) continue;

        // Initialize the category if it doesn't exist.
        if (!postList.languages[lang].categories[postDirectory.title]) {
            postList.languages[lang].categories[postDirectory.title] =
                generatePageCategory({});
            // Set category metadata.
            postList.languages[lang].categories[postDirectory.title].title =
                postDirectory.title;
            postList.languages[lang].categories[postDirectory.title]
                .description = postDirectory.description;
            postList.languages[lang].categories[postDirectory.title].tags =
                postDirectory.tags;
            postList.languages[lang].categories[postDirectory.title].show = 
                postDirectory.show;
        }

        // Process each page in the retrieved pagesInfo.
        for (const [filePath, page] of Object.entries(pagesInfo)) {
            // Create a Page object.
            const pageDict: Page = {
                metadata: page.metadata,
                id: page.local_path, // e.g. "en/page.md"
                url: page.absolute_path.replace("content/", ""), // Remove "content/" prefix
                hash: page.hash,
            };

            // Add the page to the appropriate language and category.
            postList.languages[lang].categories[postDirectory.title].posts.push(
                pageDict,
            );
        }
    }
}


// ---------------------------------------------------------------------------
// Sort Pages by Date
// ---------------------------------------------------------------------------
/**
 * For each language and category, sort the pages by date (most recent first).
 */
for (const lang of Object.keys(postList.languages)) {
    for (const category of Object.values(postList.languages[lang].categories)) {
        category.posts.sort((a, b) => {
            if (!a.metadata.date) return 1;
            if (!b.metadata.date) return -1;
            return new Date(b.metadata.date).getTime() -
                new Date(a.metadata.date).getTime();
        });
    }
}

// Output the resulting PageList as JSON.
console.log(postList.toJSONString());

// ---------------------------------------------------------------------------
// Save the PageList to File
// ---------------------------------------------------------------------------
fs.writeFileSync("assets/meta/post_list.json", postList.toJSONString());
