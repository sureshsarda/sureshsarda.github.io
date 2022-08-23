---
title: Hugo Snippets
draft: true
---


Read all files is a directory
```
    {{ range readDir "content/notes/" }}
        <div>
            {{ . }}
        </div>
    {{ end }}
```