Superhero
===

A responsive theme with a clean look with bright pops of color. Superhero features full-bleed featured posts and featured images, a fixed header, and subtle CSS3 transitions.

* Full-bleed flex slider
* Featured Image support
* Full-width page template
* Responsive layout
* Custom Background
* Custom Header
* Jetpack.me compatibility for infinite scroll
* Keyboard navigation for image attachment templates.
* CSS3 transition effects
* The GPL license in license.txt. :) Use it to make something cool.

Special Instructions
---------------

To take advantage of the full-bleed featured post slider (requires WordPress.com Featured Content):
1. Create a post with a featured image that's at least 960px wide.
2. Give the post the tag you declared under 'Settings' > 'Reading' > 'Featured Content'.

== Changelog ==

= 1.1.1 - September 17 2013
* Load JS function after a page load completely and not when just document is ready to avoid header overlaping blog content

= 1.1 - May 28 2013 =
* Update license.
* Added forward compat with 3.6.
* Comment style clean-up.
* Adds padding to the comments container instead of margin to prevent a bleeding edge. This was apparent when a blog has custom background image/color.
* Adds a ".displaying-header-text" class to the header h1 to allow the "display text with your image" toggle button to work in the preview.
* Prevents the featured slider's js and css from loading when there is no featured content.
* Applies the CSS 3 transition affects only to links inside the .site container, to prevent the affects from applying to the admin bar.
* Ensures post format archive links only appear for formatted posts.
* Aligned comment links with the associated avatars in the recent comments widget.
* Moved flexslider init to jquery.flexslider-min.js, to be conditionlly included with flexslider.
* Switched custom header to respect admin settings.
* Added Custom Background support. 
* Added RTL support.
* Edited media query to match small-menu.js
* Minor bug fixes.

= 1.0.2 - Mar 04 2013 =
* Added support for Featured Content.
* Removed image size check in slider.
* Extended theme documentation.

= 1.0.1 - Mar 01 2013 =
* Fixed a CSS selector.

= 1.0 - Feb 06 2013 =
* Initial release.