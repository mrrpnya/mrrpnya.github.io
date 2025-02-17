
import * as pages from "./pages.ts";
import { format } from "date-fns";

/**
 * Interface representing a page's essential information.
 */
export interface Page {
    /** Metadata for the page (e.g., title, date, etc.) */
    metadata: pages.PageInfoMetdata;
    /** The page's identifier, e.g. "en/page.md" */
    id: string;
    /** The URL for the page (relative to content) */
    url: string;
    /** A hash representing the page's content/version */
    hash: string;
}

/**
 * Interface representing a category that groups multiple pages.
 */
export interface PageCategory {
    /** An array of pages that belong to this category */
    posts: Page[];
    /** The title of the category */
    title: string;
    /** A description for the category */
    description: string;
    /** Tags associated with the category */
    tags: string[];
    show: boolean;
}

/**
 * Class representing a collection of pages across multiple languages.
 *
 * The structure of a PageList is as follows:
 * - last_generated: A timestamp for when the list was last updated.
 * - languages: An object mapping language codes (e.g., "en", "es") to objects
 *   containing categories, which in turn map to PageCategory objects.
 */
export class PageList {
    last_generated: string;
    languages: {
        [lang: string]: {
            categories: Record<string, PageCategory>;
        };
    };

    constructor() {
        this.last_generated = format(new Date(), "yyyy-MM-dd HH:mm:ss");
        this.languages = {};
    }

    /**
     * Deserialize a JSON string to a PageList instance.
     * @param json - JSON string representation of a PageList
     * @returns A new PageList instance
     */
    static fromJSON(json: string): PageList {
        return Object.assign(new PageList(), JSON.parse(json));
    }

    /**
     * Custom JSON serialization.
     * This method returns a plain object representation, avoiding recursive calls.
     * @returns A plain object representation of the PageList.
     */
    toJSON(): object {
        return {
            last_generated: this.last_generated,
            languages: this.languages,
        };
    }

    /**
     * Returns the JSON string representation of the PageList.
     * @returns JSON string of the PageList.
     */
    toJSONString(): string {
        return JSON.stringify(this, null, 2);
    }

    /**
     * Retrieve a specific category for a given language.
     * @param lang - The language code (e.g., "en")
     * @param categoryName - The name of the category
     * @returns The PageCategory if it exists; otherwise, undefined.
     */
    getCategory(lang: string, categoryName: string): PageCategory | undefined {
        return this.languages[lang]?.categories[categoryName];
    }

    /**
     * Retrieve all pages for a given language and category.
     * @param lang - The language code (e.g., "en")
     * @param categoryName - The name of the category
     * @returns An array of pages, or an empty array if not found.
     */
    getPagesByCategory(lang: string, categoryName: string): Page[] {
        return this.languages[lang]?.categories[categoryName]?.posts || [];
    }

    /**
     * Compute the canonical ID for a page by removing the language prefix.
     * For example, "en/page.md" becomes "page.md".
     * @param pageId - The full page id including language folder
     * @returns The canonical page id
     */
    static getCanonicalId(pageId: string): string {
        return pageId.replace(/^[^/]+\//, "");
    }

    /**
     * Retrieve a specific page by its canonical ID from a given language and category.
     * @param lang - The language code (e.g., "en")
     * @param categoryName - The category containing the page
     * @param canonicalId - The canonical id of the page (language prefix removed)
     * @returns The Page if found; otherwise, undefined.
     */
    getPage(
        lang: string,
        categoryName: string,
        canonicalId: string,
    ): Page | undefined {
        const pagesArr = this.getPagesByCategory(lang, categoryName);
        return pagesArr.find((page) =>
            PageList.getCanonicalId(page.id) === canonicalId
        );
    }

    /**
     * Identify all languages in which a page (by its canonical ID) is available.
     * @param canonicalId - The canonical id of the page (language prefix removed)
     * @returns An array of language codes where the page exists.
     */
    getAvailableLanguagesForPage(canonicalId: string): string[] {
        const langs: string[] = [];
        for (const lang of Object.keys(this.languages)) {
            const categories = this.languages[lang].categories;
            for (const categoryName of Object.keys(categories)) {
                if (
                    categories[categoryName].posts.some((page) =>
                        PageList.getCanonicalId(page.id) === canonicalId
                    )
                ) {
                    langs.push(lang);
                    break; // Page found in this language; no need to check further categories.
                }
            }
        }
        return langs;
    }

    /**
     * Enumerate unique pages across all languages.
     * Each unique page (by canonical id) is listed along with:
     * - An array of languages in which it is available.
     * - A mapping of each language to its corresponding Page.
     * @returns An array of objects representing unique pages.
     */
    enumerateUniquePages(): Array<
        {
            canonicalId: string;
            langs: string[];
            pages: { [lang: string]: Page };
        }
    > {
        const uniquePages: {
            [canonicalId: string]: {
                langs: Set<string>;
                pages: { [lang: string]: Page };
            };
        } = {};

        for (const lang of Object.keys(this.languages)) {
            const categories = this.languages[lang].categories;
            for (const categoryName of Object.keys(categories)) {
                for (const page of categories[categoryName].posts) {
                    const canonicalId = PageList.getCanonicalId(page.id);
                    if (!uniquePages[canonicalId]) {
                        uniquePages[canonicalId] = {
                            langs: new Set(),
                            pages: {},
                        };
                    }
                    uniquePages[canonicalId].langs.add(lang);
                    uniquePages[canonicalId].pages[lang] = page;
                }
            }
        }

        return Object.entries(uniquePages).map(([canonicalId, data]) => ({
            canonicalId,
            langs: Array.from(data.langs),
            pages: data.pages,
        }));
    }
}

/**
 * Generate a PageCategory from the provided pagesInfo object.
 *
 * @param pagesInfo - An object where keys are paths (e.g., "content/[lang]/...") and values are page data.
 * @returns A PageCategory object containing an array of Page objects.
 */
export function generatePageCategory(pagesInfo: Record<string, any>): PageCategory {
    const pageList: Page[] = [];

    for (const [filePath, page] of Object.entries(pagesInfo)) {
        // Expect the path in the form "content/[lang]/..."
        const langMatch = filePath.match(/^content\/([^/]+)\//);
        const lang = langMatch ? langMatch[1] : "default";

        const pageDict: Page = {
            metadata: page.metadata,
            id: page.local_path, // e.g. "en/page.md"
            url: page.absolute_path.replace("content/", ""), // Remove "content/" prefix
            hash: page.hash,
        };
        pageList.push(pageDict);
    }

    // Format dates consistently.
    pageList.forEach((page) => {
        if (page.metadata.date) {
            page.metadata.date = format(
                new Date(page.metadata.date),
                "yyyy-MM-dd HH:mm:ss",
            );
        }
    });

    return {
        posts: pageList,
        title: "",
        description: "",
        tags: [],
        show: true
    };
}

// ---------------------------------------------------------------------------
// Directory Definitions
// ---------------------------------------------------------------------------

/**
 * An array of directories to scan for pages.
 * Each directory is represented as a PageLocation from the `pages` module.
 *
 * Note: The 'map' property should correspond to the subdirectory name that
 * exists within each language folder. For example, if articles for "Site"
 * are stored in "content/en/site", "content/fr/site", etc., then map: "site".
 */
export const postDirectories: pages.PageLocation[] = [
    {
        title: "Site",
        description: "Articles to test site functionality",
        tags: ["site"],
        map: "site",
        root: "", // Not used in the new structure
        show: false
    },
    {
        title: "Collections",
        description:
            "Articles that are collections of information: Lists, Awesome lists, etc.",
        tags: ["collection"],
        map: "collections",
        root: "",
        show: true
    },
    {
        title: "Guides",
        description: "Guides and tutorials",
        tags: ["guide"],
        map: "guides",
        root: "",
        show: true
    },
];