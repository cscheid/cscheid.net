---
title: Some notes to self on running things on recent Linux distros
layout: bootstrap_main
---

# `systemd`

[`systemd`](https://www.freedesktop.org/wiki/Software/systemd/) is the
preferred init system for a bunch of recent Linux distros. It's
powerful but has a bunch of quirks. I'm documenting them here.

## It'll break `screen`

Soon, systemd [will kill `screen` processes](). In order to fix this,
you'll have to enable "lingering" processes as root, for every user in
the system. Sigh.

```
# loginctl enable-linger USER
```

## It lets you run your own daemons

This is the nice part of `systemd`: it has support for you to run your
own daemons (slightly obviating the need for the screen hacks above,
yes. But convenience!). TBF.
