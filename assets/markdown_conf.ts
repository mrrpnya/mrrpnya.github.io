import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';

export default function configured_markdown(): MarkdownIt {
    const md: MarkdownIt = MarkdownIt({
        breaks: true,
        typographer: true,
        html: true,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre><code class="hljs">' +
                        hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                        '</code></pre>';
                } catch (__) { }
            }
    
            return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    })
    
    
    md.renderer.rules.hr = function (tokens, idx, options, env, self) {
        return '<div class="rounded-full h-0.5 bg-purple-500 my-3"></div>'
    }
    
    md.renderer.rules.softbreak = function (tokens, idx, options, env, self) {
        return '<br>'
    }
    
    md.renderer.rules.hardbreak = function (tokens, idx, options, env, self) {
        return '<br><br>'
    }

    return md;
}