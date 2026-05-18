# Markdown Cheat Sheet

Here you find a list of the syntax and commands used for BlastoDB. This includes basic markdown syntax as well as the custom elements added.

If you need a more detailed guide, look [here](TODO:link).

## Basic Markdown Syntax

Here is a short cheet-sheet for the markdown syntax that works with the parser of BlastoDB. It is based on the one cheat-sheet found on [markdownguide.org](https://www.markdownguide.org/cheat-sheet/)

| Element | Syntax |
|---|---|
| Heading  | \# H1 <br> \## H2. <br> \### ...   |
| Bold  | \*\*bold text**  |
| Italic  | \*italic text*   |
| Highlight  | \==highlighted text==   |
| Strikethrough  | \~~The world is flat~~   |
| Subscript  | H\~2\~O    |
| Superscript  | X\^2\^    |
| Blockquote  | >  |
| Ordered List  |  1. Item one. <br> 2. Itme two. <br> 3. ...  |
| Unordered List  | - Item one. <br> - Itme two. <br> - ...  |
| Task List  | - [ ] unchecked item<br> -[x] checked item.<br> -[ ] ... |
| Code  | \`code\`  |
| Code Block  | \```name_of_programming_language <br> code <br>\```  |
| Horizontal Role  | ---  |
| Link  | \[title](https://www.example.com)  |
| Image  | \!\[text shown if imace can't be displayed](image.jpg)  |
| Table  | \| Heading \| Heading\| <br> \|---\|---\| <br> \|Row 1\|Row 1\| <br> \|Row 2\|...\|  |
| Footnote  | Text with a footnote[^1]. <br><br> [^1]: This is the Footnote   |
| Heading ID  | ### My Great Heading {#custom-id}  |
| Emoji | That is so funny! \:joy:   |


## Custom Elements

Here you find a list of all the custom elements added to layout content on the website, as well as make it interactive.
Read the articles about each element for more information.

| Element | Syntax | Description |
|---|---|---|
| Tag  | [tag:*tag_name*]   | Visual element to display tags.   |
| Button  | [btn:displayed_text* -> *page.html*]   | Needs a *name* (displayed text) and link to another *page.html*.   |
| Card  | [start:card]<br> Content in the Card. <br>[end:card]   | Displays the *content* inside of it in a colored box.   |
| Hero  | [start:hero]<br> Content in the Hero. <br> [end:hero]   | A box spanning the range of the page.<br> Displays the content inside, like the *Card*.   |
| Cols  | [start:cols]<br>Content<br>[end:cols]   | Arranges the content inside in columns.<br>Automatically resizes for mobile view.|
| Grid  | [start:grid]<br>Content<br>[end:grid]   | Arranges the content inside in a grid.<br>Automatically resizes for mobile view.|
| Collector  | [collector -> lab-protocols; tags:true; date:true; <br>search:true; arrange:cols; display_items:all]   | Complex component. Reads all files inside of a folder<br> and dynamically displays them.<br>[Read this for more information.](todo:link)  |
