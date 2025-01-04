import * as fs from 'node:fs';
import * as pages from './pages.ts';
import { format } from 'date-fns';

// Type for metadata and page info
export interface Page {
    metadata: pages.PageInfoMetdata;
    id: string;
    url: string;
    hash: string;
}

export interface PageCategory {
    posts: Page[];
    title: string;
    description: string;
    tags: string[];
}
export interface PageList {
    last_generated: string;
    categories: Record<string, PageCategory>;
}

// Function to generate the page list
function generatePageCategory(pagesInfo: Record<string, any>): PageCategory {
    const pageList: Page[] = [];

    for (const [path, page] of Object.entries(pagesInfo)) {
        const pageDict: Page = {
            metadata: page.metadata,
            id: page.local_path,
            url: page.absolute_path.replace("content", ""),
            hash: page.hash
        };
        pageList.push(pageDict);
    }

    pageList.forEach(page => {
        if (page.metadata.date) {
            page.metadata.date = format(new Date(page.metadata.date), 'yyyy-MM-dd HH:mm:ss');
        }
    });

    const pageListDict: PageCategory = {
        posts: pageList,
        title: "",
        description: "",
        tags: []
    };

    return pageListDict;
}

const postDirectories: pages.PageLocation[] = [
    {
        title: "Site",
        description: "Articles to test site functionality",
        tags: ["site"],
        map: "site",
        root: "content/site"
    },
    {
        title: "Collections",
        description: "Articles that are collections of information: Lists, Awesome lists, etc.",
        tags: ["collection"],
        map: "collections",
        root: "content/collections"
    },
    {
        title: "Guides",
        description: "Guides and tutorials",
        tags: ["guide"],
        map: "guides",
        root: "content/guides"
    }
]

var postList: PageList = {
    last_generated: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    categories: {}
}

for (const postDirectory of postDirectories) {
    const pagesInfo = pages.getPagesInfo("", postDirectory);
    postList.categories[postDirectory.title] = generatePageCategory(pagesInfo);
    postList.categories[postDirectory.title].title = postDirectory.title;
    postList.categories[postDirectory.title].description = postDirectory.description;
    postList.categories[postDirectory.title].tags = postDirectory.tags;
}

// Sort the posts by date
for (const category of Object.values(postList.categories)) {
    category.posts.sort((a, b) => {
        if (!a.metadata.date) {
            return 1;
        }
        if (!b.metadata.date) {
            return -1;
        }
        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });
}

console.log(JSON.stringify(postList, null, 2));

// Output to assets/blog_list.json (overwriting)
fs.writeFileSync("assets/meta/post_list.json", JSON.stringify(postList, null, 2));