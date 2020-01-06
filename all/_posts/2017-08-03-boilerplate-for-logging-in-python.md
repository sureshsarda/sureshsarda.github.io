---
layout: single
title: Boilerplate - Logging in Python
date: 2017-08-03
categories:
- Python
tags:
- logging
excerpt: Basic configuration of logger in Python. 4 lines to get you started
---
This is how all my Python scripts look like when they start:

```python
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

logger.debug('Log message')
```

Nothing much but I prefer logging over print statements. Whenever I want to move this small script to larger project, I don't have to make lot of changes. Logging also offers more control over the messages and what messages to print or skip.
