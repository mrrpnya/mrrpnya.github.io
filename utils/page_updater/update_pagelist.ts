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

export interface PageList {
    last_generated: string;
    posts: Page[];
}

// Function to generate the page list
function generatePageList(pagesInfo: Record<string, any>): PageList {
    const pageList: Page[] = [];

    for (const [path, page] of Object.entries(pagesInfo)) {
        const pageDict: Page = {
            metadata: page.metadata,
            id: page.local_path,
            url: page.absolute_path.replace("assets", ""),
            hash: page.hash
        };
        pageList.push(pageDict);
    }

    pageList.forEach(page => {
        if (page.metadata.date) {
            page.metadata.date = format(new Date(page.metadata.date), 'yyyy-MM-dd HH:mm:ss');
        }
    });

    const pageListDict: PageList = {
        last_generated: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        posts: pageList
    };

    return pageListDict;
}

// Get the page list and print it
const postList = generatePageList(pages.getPagesInfo("", "assets/blog"));
console.log(JSON.stringify(postList, null, 2));

// Output to assets/blog_list.json (overwriting)
fs.writeFileSync("assets/meta/blog_list.json", JSON.stringify(postList, null, 2));
