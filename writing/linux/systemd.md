---
title: My systemd notes
layout: bootstrap_main
---

# `systemd`

[`systemd`](https://www.freedesktop.org/wiki/Software/systemd/) is the
preferred init system for a bunch of recent Linux distros. It's
powerful but has a bunch of quirks. I'm documenting them here.

## It'll break `screen`

Soon, systemd [will kill `screen` processes](https://github.com/systemd/systemd/issues/8486). In order to fix this,
you'll have to enable "lingering" processes as root, for every user in
the system. Sigh.

```
# loginctl enable-linger USER
```

## cheatsheet

(Cribbed entirely from [this](https://vic.demuzere.be/articles/using-systemd-user-units/).)
Your daemons (in `systemd`ese, "service units") live in
`~/.config/systemd/user`, with extension `.service`. Here is a minimal daemon:

    [Unit]
    Description=what it does

    [Service]
    ExecStart=what to run

    [Install]
    WantedBy=default.target
	
	[Service]
	RestartSec=10
	Restart=on-failure

For user daemons:

* `$ systemctl --user daemon-reload`: rescans your directory with
  service units and reloads them. Needed if you change the `.service`
  files before reloading the thing.
* `$ systemctl --user {enable,disable} daemon`: enables or disables service autostart on login.
  * What happens with multiple logins?
* `$ systemctl --user {start,stop,restart,status} daemon`: does what it says
