import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token.mjs";

export default function configured_markdown(): MarkdownIt {
    const md: MarkdownIt = MarkdownIt({
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
