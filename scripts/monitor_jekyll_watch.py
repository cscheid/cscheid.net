#!/usr/bin/env python

import sys
import subprocess
import re
import colorful as cf
import os

cf.use_true_colors()

# extend default color palette
cf.update_palette({'hdcorange': '#FF9E1B'})
cf.update_palette({'hdcblue': '#009CDE'})
cf.update_palette({'hdcgreen': '#78BE20'})

done_line = re.compile(r'done in .* seconds.')

# subprocess.call(["bash", "-l", "-c", "rsync -a _site 2020.cscheid.net:web/root"])
os.chdir('/home/cscheid/cscheid_net_builds')

while True:
    s = sys.stdin.readline()
    print(s, end='')
    if done_line.search(s):
        print(cf.hdcorange("Jekyll monitor found an update! rsyncing..."))
        subprocess.call(["bash", "-l", "-c", "rsync -a _site 2020.cscheid.net:web/root"])
        subprocess.call(["bash", "-l", "-c", "rsync -a _staging_site 2020.cscheid.net:web/root"])
        print(cf.hdcgreen("Jekyll monitor update done."))
