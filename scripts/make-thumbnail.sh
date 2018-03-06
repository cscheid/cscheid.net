#!/bin/bash

paper=$1

tmp="/tmp/out.png"
out=$2
if [ ! -e "$out" ]; then
    echo "Will create thumbnail    - $out"
    convert -density 576 ${paper}\[0\] -background white -flatten -resize 400x518 $tmp
    convert $tmp \
    	    \( -clone 0 -background gray -shadow 80x3+0+0 \) \
    	    -reverse -background none -layers merge +repage $out # -crop 412x200+0+0
else
    echo "thumbnail already exists - $out"
fi

