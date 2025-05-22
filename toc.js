// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item "><a href="introduction.html"><strong aria-hidden="true">1.</strong> Introduction</a></li><li class="chapter-item "><a href="as3.html"><strong aria-hidden="true">2.</strong> ActionScript</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="as3/packages.html"><strong aria-hidden="true">2.1.</strong> Packages</a></li><li class="chapter-item "><a href="as3/types.html"><strong aria-hidden="true">2.2.</strong> Types</a></li><li class="chapter-item "><a href="as3/type-conversion.html"><strong aria-hidden="true">2.3.</strong> Type conversion</a></li><li class="chapter-item "><a href="as3/type-matching.html"><strong aria-hidden="true">2.4.</strong> Type matching</a></li><li class="chapter-item "><a href="as3/classes.html"><strong aria-hidden="true">2.5.</strong> Classes</a></li><li class="chapter-item "><a href="as3/enums.html"><strong aria-hidden="true">2.6.</strong> Enums</a></li><li class="chapter-item "><a href="as3/interfaces.html"><strong aria-hidden="true">2.7.</strong> Interfaces</a></li><li class="chapter-item "><a href="as3/metadata.html"><strong aria-hidden="true">2.8.</strong> Meta-data</a></li><li class="chapter-item "><a href="as3/generics.html"><strong aria-hidden="true">2.9.</strong> Generics</a></li><li class="chapter-item "><a href="as3/method-overloading.html"><strong aria-hidden="true">2.10.</strong> Method overloading</a></li><li class="chapter-item "><a href="as3/namespaces.html"><strong aria-hidden="true">2.11.</strong> Namespaces</a></li><li class="chapter-item "><a href="as3/events.html"><strong aria-hidden="true">2.12.</strong> Events</a></li><li class="chapter-item "><a href="as3/environment.html"><strong aria-hidden="true">2.13.</strong> Environment variables</a></li><li class="chapter-item "><a href="as3/embed.html"><strong aria-hidden="true">2.14.</strong> Embed</a></li><li class="chapter-item "><a href="as3/conditional-compilation.html"><strong aria-hidden="true">2.15.</strong> Conditional compilation</a></li><li class="chapter-item "><a href="as3/asynchronous-code.html"><strong aria-hidden="true">2.16.</strong> Asynchronous code</a></li><li class="chapter-item "><a href="as3/iterables.html"><strong aria-hidden="true">2.17.</strong> Iterables</a></li><li class="chapter-item "><a href="as3/proxies.html"><strong aria-hidden="true">2.18.</strong> Proxies</a></li><li class="chapter-item "><a href="as3/e4x.html"><strong aria-hidden="true">2.19.</strong> E4X</a></li><li class="chapter-item "><a href="as3/asdoc.html"><strong aria-hidden="true">2.20.</strong> ASDoc</a></li><li class="chapter-item "><a href="as3/clone.html"><strong aria-hidden="true">2.21.</strong> Clone</a></li><li class="chapter-item "><a href="as3/statements.html"><strong aria-hidden="true">2.22.</strong> Statements</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="as3/statements/enum.html"><strong aria-hidden="true">2.22.1.</strong> Enum</a></li><li class="chapter-item "><a href="as3/statements/for-in.html"><strong aria-hidden="true">2.22.2.</strong> For..in</a></li><li class="chapter-item "><a href="as3/statements/import.html"><strong aria-hidden="true">2.22.3.</strong> Import</a></li><li class="chapter-item "><a href="as3/statements/switch.html"><strong aria-hidden="true">2.22.4.</strong> Switch</a></li><li class="chapter-item "><a href="as3/statements/try.html"><strong aria-hidden="true">2.22.5.</strong> Try</a></li></ol></li><li class="chapter-item "><a href="as3/expressions.html"><strong aria-hidden="true">2.23.</strong> Expressions</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="as3/expressions/filter.html"><strong aria-hidden="true">2.23.1.</strong> Filter expression</a></li><li class="chapter-item "><a href="as3/expressions/string.html"><strong aria-hidden="true">2.23.2.</strong> String literal</a></li><li class="chapter-item "><a href="as3/expressions/yield.html"><strong aria-hidden="true">2.23.3.</strong> Yield expression</a></li></ol></li></ol></li><li class="chapter-item "><a href="display-list.html"><strong aria-hidden="true">3.</strong> Display List</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="display-list/pixels.html"><strong aria-hidden="true">3.1.</strong> Pixels and scale factor</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
