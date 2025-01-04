// TypeScript utilities for rendering Markdown/HTML content

import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import { alert } from "@mdit/plugin-alert";
import { tab } from "@mdit/plugin-tab";
import { tasklist } from "@mdit/plugin-tasklist";
import { mark } from "@mdit/plugin-mark";
import { footnote } from "@mdit/plugin-footnote";
import fm, { type FrontMatterResult } from "front-matter";

export interface MarkdownMetadata {
    title: string;
    description: string;
    date: string;
    tags: string[];
    background: string;
    next?: string;
    previous?: string;
}

export interface MarkdownOutput {
    metadata: MarkdownMetadata;
    contents: string;
}

function isolate_markdown(input: string): MarkdownOutput {
    const front_matter: FrontMatterResult<any> = fm(input);
    const content = front_matter.body;

    const metadata: MarkdownMetadata = {
        title: front_matter.attributes.title || "",
        description: front_matter.attributes.description || "",
        date: front_matter.attributes.date || "",
        tags: front_matter.attributes.tags || [],
        background: front_matter.attributes.background || "",
        next: front_matter.attributes.next || "",
        previous: front_matter.attributes.previous || ""
    };

    return {
        metadata: metadata,
        contents: content
    };
}

function isolate_html(input: string): MarkdownOutput {
    const title = input.match(/<title>([^<]+)<\/title>/);
    const meta = input.match(/<meta name="([^"]+)" content="([^"]+)">/g);
    const metadata: MarkdownMetadata = {
        title: "",
        description: "",
        date: "",
        tags: [],
        background: ""
    };

    if (meta) {

        for (const tag of meta) {
            const match = tag.match(/<meta name="([^"]+)" content="([^"]+)">/);
            if (match) {
                switch (match[1]) {
                    case "title":
                        metadata.title = match[2];
                        break;
                    case "description":
                        metadata.description = match[2];
                        break;
                    case "date":
                        metadata.date = match[2];
                        break;
                    case "tags":
                        metadata.tags = match[2].split(",");
                        break;
                    case "background":
                        metadata.background = match[2];
                        break;
                }
            }
        }
    }

    const front_matter: FrontMatterResult<any> = fm(input);

    if (front_matter.attributes) {
        metadata.title = front_matter.attributes.title || metadata.title;
        metadata.description = front_matter.attributes.description || metadata.description;
        metadata.date = front_matter.attributes.date || metadata.date;
        metadata.tags = front_matter.attributes.tags || metadata.tags;
        metadata.background = front_matter.attributes.background || metadata.background;
        metadata.next = front_matter.attributes.next || "";
        metadata.previous = front_matter.attributes.previous || "";
    }

    return {
        metadata: metadata,
        contents: input
    };
}

export class MarkdownInput {
    type: "markdown" | "html";
    private contents: string;
    private metadata: MarkdownMetadata;

    constructor(type: "markdown" | "html", data: string) {
        this.type = type;
        this.metadata = this.get_metadata();

        switch (this.type) {
            case "markdown":
                const result = isolate_markdown(data);
                this.contents = result.contents;
                this.metadata = result.metadata;
                break;
            case "html":
                const result_html = isolate_html(data);
                this.contents = data;
                this.metadata = result_html.metadata;
                break;
        }
            
    }

    static from_markdown(data: string): MarkdownInput {
        return new MarkdownInput("markdown", data);
    }

    static from_html(data: string): MarkdownInput {
        return new MarkdownInput("html", data);
    }

    static async from_url(url: string): Promise<MarkdownInput> {
        const response = await fetch(url);
        const data = await response.text();

        // Check the content type of the response
        const content_type = response.headers.get("content-type");
        if (content_type) {
            if (content_type.includes("text/markdown")) {
                return MarkdownInput.from_markdown(data);
            } else if (content_type.includes("text/html")) {
                return MarkdownInput.from_html(data);
            }
        }

        if (url.endsWith(".md")) {
            return MarkdownInput.from_markdown(data);
        } else if (url.endsWith(".html")) {
            return MarkdownInput.from_html(data);
        }

        // Fallback to markdown
        return MarkdownInput.from_markdown(data);
    }

    public get_contents(): string {
        return this.contents;
    }

    public get_metadata(): MarkdownMetadata {
        return this.metadata;
    }
}

export class MarkdownContext {
    private md: MarkdownIt;
    
    constructor(md: MarkdownIt | undefined) {
        if (md) {
            this.md = md;
        } else {
            this.md = configured_markdown();
        }
    }

    private render_markdown(input: MarkdownInput): MarkdownOutput {
        console.log("Rendering markdown")

        const content = configured_markdown().render(input.get_contents());
    
        const result: MarkdownOutput = {
            metadata: input.get_metadata(),
            contents: content
        };
        return result;
    }

    private render_html(inputs: MarkdownInput): MarkdownOutput {
        const result: MarkdownOutput = {
            metadata: inputs.get_metadata(),
            contents: inputs.get_contents()
        };
    
        return result;
    }

    render(input: MarkdownInput): MarkdownOutput {
        switch (input.type) {
            case "markdown":
                return this.render_markdown(input);
            case "html":
                return this.render_html(input);
        }
    }
}

function configured_markdown(): MarkdownIt {
    var md: MarkdownIt = MarkdownIt({
        breaks: true,
        typographer: true,
        html: true,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre><code class="hljs">' +
                        hljs.highlight(str, {
                            language: lang,
                            ignoreIllegals: true,
                        }).value +
                        "</code></pre>";
                } catch (__) {}
            }

            return '<pre><code class="hljs">' + md.utils.escapeHtml(str) +
                "</code></pre>";
        },
    });

    md = md
        .use(tasklist)
        .use(mark)
        .use(footnote)
        .use(alert, {
            alertNames: [
                "note", "info", "warning", "danger", "todo", "tip", 
                "important", "success", "caution", "question", "done",
                "quote", "deprecated", "example"
            ],
        }).use(tab, {
            name: "tabs"
        });

    md.renderer.rules.text = function (tokens, idx, options, env, self) {
        // headers 1-3 get an <hr> after them - With a class (md-hr-N) for styling
        if (tokens[idx].type === "heading_open") {
            const level = tokens[idx].tag;
            return `<${level} class="md-hr-${level}">${tokens[idx + 1].content}</${level}>`;
        }
        return self.renderToken(tokens, idx, options);
    }

    md.renderer.rules.softbreak = function (tokens, idx, options, env, self) {
        return "<br>";
    };

    md.renderer.rules.hardbreak = function (tokens, idx, options, env, self) {
        return "<br><br>";
    };

    md.renderer.rules.text = function (tokens, idx, options, env, self) {
        return tokens[idx].content;
    }

    return md;
}

export var globalMarkdown = new MarkdownContext(undefined);

export default {
    MarkdownInput,
    MarkdownContext,
    globalMarkdown
}