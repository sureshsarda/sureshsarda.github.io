---
date: 2023-12-28
tags:
  - sdlc
  - programming
title: Safely Rolling Out Features Using Feature Flags
type: Essay
pinned: true
toc: true
---

In this article we will walk through steps to rollout an upgrade as safely as
possoble.

## What you will need

* A feature controller
* A configuration for the feature
* Infrastructure to deploy canary releases (optional; if you like to play with
  fire without wearing gloves)

## Safely Rolling Out Change

1. Create a configuration for the new feature with default value set to disabled.
   Write code for the new feature but behind this new configuration condition
   using the feature controller.
   The code is now present, but disabled.
2. Release the new binary with the new code. At this stage, the code is present
   but behind a flag and currently disabled. A failure at this stage would
   require you to revert to the older binaries
3. Now update the configuration files, add the configuration for the feature
   but still keep it disabled. The feature should still be inactive and any
   failure at this stage would require you to revert to older configuration
   file.
4. Update the configuration to enable the feature for few canary deployments.
   A failed rollout would require terminating the canaries.
5. Update the remaining deployments and activate this feature. The chances of
   failure at this stage are minimal since the feature is already tested with
   canary users.
6. Now alter the code such that the default value for the feature is enabled.
   This should not make any difference since anyway the configuration was enabled
   for this feature. A failed rollout at this stage would require you to move
   back to previous binary.
7. Update the configuration files and remove references of the feature. The code
   is anyway not using this configuration as per step 6.
8. Update all code and remove the conditional behaviour around this feature. A
   failed rolloout would require you to revert to previous version of the binary.
9. Remove the feature flag from the code.

These nine steps might be an overkill for they ensure that code is released
smoothly. These steps may span across weeks or months and parallely for many
features as well.

---

This is my 5th of 100 post in [#100daysToOffload](https://100daystooffload.com/).