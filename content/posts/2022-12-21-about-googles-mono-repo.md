---
date: 2022-12-21
tags:
  - sdlc
  - notes
  - programming
  - research-paper
title: A brief summary of Google's Monorepo
type: Essay
pinned: true
toc: true
---

I'll first talk about the code repo and how Goole makes it work, followed by the pros and cons and in the end whether it's needed today.

## About

Most of the code in Google is written in a single repository - taking mono repos to the another level. This article is a summary of another paper title [Why Google stores billions of lines of code in a single repository](https://dl.acm.org/doi/10.1145/2854146) published by Rachel Potvin.

Let's start with a few stats about this repo:

1. 1 billion files
2. History of about 35 million commits
3. 18 years of existence
4. 86 TB of data
5. 9 million source files
6. 2 billion lines of code
7. 15 million lines changes in 250k files on a weekly basis in around 2014
8. 16k manual and 24k automated commits on a workday
9. And many more!

These stats are insane! A repository of size 86TB!!

### Piper

The paper goes into the background. There are two primary systems - Piper and CitC. Piper is implemented on top of Spanner and stores the entire code base. The file level access control is maintained through ACLs to guard business critical algorithms and few configuration files. There is also a system that tracks read and writes to files to maintain audit trail.

### CitC

Now obviously you can’t ‘clone’ and repository to your local. Therefore, they have created a new tool called 'CitC' or 'Clients in Cloud' which is basically a Linux FUSE file system that copies a part of the repository for you to work on. This is architected to save space. Only space required is the local copy of modified files. Some variant of overlay file system it seems. This gives a seamless view of the entire Piper repository and your changes overlaid on the top of that. Snapshots are stores in CitC - can be tagged, previous snapshots can be recovered, can be named and sent for review. I see a strong resemblance to commits here.

These CitC, as they are on clouds can be created on the fly. So your context is not lost and you can work across multiple items without switching ‘branches’. These can be shared with other developers as well.

## Truck Based Development

The trunk based development has few advantages - there are no long lived branches. Only release branch perhaps. But not other feature branches or development branches. Features are controlled via flags. This adds some complexity to the code but basically every feature is then behind a feature flag. This let’s quickly rollout or disable features without a binary release. Once the feature flag is retired, the code is deleted.

There are few best practices to make this work.

- To avoid breakage, where thousands of engineers are committing every single day; Google has an automated testing infrastructure to test code dependent code on ever change committed.
- If widespread build breaks then there is system in place to automatically revert the change.
- There is also a pre-submit infrastructure that provides automated testing before change is merged.
- Critique, a code review tool is created on the top of Piper to perform code reviews

## Pros and Cons advocated

The advantages mentioned in this paper are unified versioning, one source of truth, extensive code sharing, large scale refactoring, collaboration across teams, code visibility and implicit team namepsacing.

None of these advantages are unique to this system. This is already present with something like Gitlab.

The cons of the system are huge - there is a significant effort involved to maintain this system when you can get this for free with Gitlab (technically not free, you have to pay them).

## My Thoughts
Git was released around 2005 and before that time the Subversion and Mercurial were not that matured. Google ventured in the mono repo approach and created tools as and when it needed them. Not these tools work fine for them but perhaps are an overkill for any other organization which has Git and Github/Gitlab readily available. Not just an overkill, it's simply not necessary.

I really like the idea of CitC where you can work without switching contexts and share your work with your team mates. But all this investment just to achieve that is not worth it. Newer tools like Codespaces can enable CitC.

Bottom line, Google uses these tools because they are using them from since the start. It's like legacy tools which they can't get rid of easily. 

---

This is my 4th of 100 post in [#100daysToOffload](https://100daystooffload.com/).