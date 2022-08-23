---
title: Hugo Snippets
---


Read all files is a directory
```
    {{ range readDir "content/notes/" }}
        <div>
            {{ . }}
        </div>
    {{ end }}
```