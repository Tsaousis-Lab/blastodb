# Markdown

Markdown is a simple markup language. Here you find a basic introduction and the basics around its syntax.

If you only want to quickly check the syntax check out the [markdown cheat-sheet](https://www.markdownguide.org/cheat-sheet/).

## A short Introduction to Markdown for Beginners

You are probably more familiar with text editors like Microsoft Word. These work on a *what you see is what you get* principle. That means, that the content you edit directly resembles its appearance when you export or print it. In Word, if you want to highlight a word and make it *italic*, then you select it, and press the button to format it to italic. If you want to create a headline, you have to select the text, and then format it to the right size, maybe make it bold and underline it.

Markdown, on the other hand, is a markup language and operates on a *what you see is what you mean* principle. If you, for example, want a word to be *italic*, then you write it in asterisks `*this text will be italic*`. To create a headline, you do this with a small command, in this case a `#`:
```markdown
# I am a Headline
And I am a normaly formated text.
```

These small commands then get interpreted and exported. The benefit is, that we can export it with different options, so the same content can be displayed in many different ways. Markdown is used to create documents, notes, books, presentations, documentations (like this one), or websites, like here. Maby famous websites use markdown, wikipedia and reddit for example. Or, in this project, BlastoDB is also written in markdown.

In the following, you find the basic markdown syntax to create simple text files. If you want more information around markdown, check out this the [Getting Started](https://www.markdownguide.org/getting-started/) guide on markdownguide.org. [This website](https://www.markdownguide.org/) is generally a good resource around the usual markdown syntax.


## Simple Markdown Syntax

The markdown syntax consists of a few simple commands. Here I curated the most usefull for BlastoDB. You can find a full list on the [cheat-sheet](https://www.markdownguide.org/cheat-sheet/).

### Heading

You can create headlines with `#`:
```markdown
# This is an H1 Headline
## This is an H2 Headline
### This is an H3 Headline
#### This is an H4 Headline
##### ...
```

### Formatting Text
You can easily format text, for example to be **bold** or *italic*.

Here are the formating options:
- *italic*: `*This text is italic*, this text is not` -> *This text is italic*, this text is not
- **bold**: `**This text is bold**, this text is not` -> **This text is bold**, this text is not
- ~~strike through~~:`~~The world is flat.~~ We know that the world is round` -> ~~The world is flat.~~ We know that the world is round.
- ==highlighted==: `==This text is highlighted==, this is not` -> ==This text is highlighted==, this is not
Note that there must not be a space between the * and the next word, otherwise it will not pe rendered properly.

You can also put text in~subscript~ or in^superscript^:
- subscript: `H~2~O` -> H~2~O
- superscript: `X^2^` -> X^2^

You can also combine the formatting:
- `***italic and bold^with superscript^***`-> ***italic and bold^with superscript^***
- `~~**bold and crossed out**~~`-> ~~**bold and crossed out**~~
- `==*italic~with subscript~ and highlighted*==`-> ==*italic~with subscript~ and highlighted*==
- Or any other combination

### Links

You can create a [link](https://www.blastodb.com), for example to the BlastoDB website, like this:
```markdown
You can find BlastoDB [here](https://www.blastodb.com).
```
You can find BlastoDB [here](https://www.blastodb.com).

If you want to link to another webpage on BlastoDB, you can use this:
```markdown
You can find BlastoDB [here](https://www.blastodb.com).
```
TODO: this

### Lists

#### Unordered Lists
You can create unordered lists with a `-` or a `*`:
```markdown
- first item
- second item
- third item
- ...
```
- first item
- second item
- third item
...

Or you can use a `*`:
```markdown
* first item
* second item
* third item
* ...
```
* first item
* second item
* third item
* ...

#### Ordered Lists
You can create ordered lists with `1. `, `2. `, and so on:
```markdown
1. first item
2. second item
3. third item
4. ...
```
1. first item
2. second item
3. third item
4. ...


#### Task List
You can also create a task list with `- [ ] :
```markdown
- [ ] This is an unchecked item
- [x] This is a checked item
- [ ] ...
```
Users on BlastoDB can not interact with the list. If an item is checked or unchecked can only be read by the text.


### Horizontal Rules

You can create horizontal rules to separate content with `---`:
```markdown
Here is some content.

---
Here is other content that I wand to be separated.
```
Here is some content.

---
Here is other content that I wand to be separated.

Make shure that you leave one line of space between the last paragraph and the horizontal rule. Also, there must be no other characters in the same line as the horizontal rule.


## Example of a Markdown Text

Here is a small example of a markdown text:

```markdown
### Small Markdown Example:

With this *markdown* text I wand to quickly **highlight** some of the features of the language.
You can create **bold** or *italic* text, [links to websites](https://www.blastodb.com) and much more:
1. Numbered Lists
2. Unnumbered Lists (with a "-" instead of the number)
3. Headlines (starting with "#")
4. And even images!

```
### Small Markdown Example:

With this *markdown* text I wand to quickly **highlight** some of the features of the language.
You can create **bold** or *italic* text, [links to websites](https://www.blastodb.com) and much more:
1. Numbered Lists
2. Unnumbered Lists (with a "-" instead of the number)
3. Headlines (starting with "#")
4. And even images
