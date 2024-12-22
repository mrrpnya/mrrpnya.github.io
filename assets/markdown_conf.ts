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

    md.renderer.rules.h6 = function (tokens, idx, options, env, self) {
        return '<h6 class="text-lg font-semibold my-3"><br>' +
            tokens[idx].content + "</h6>";
    };

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
