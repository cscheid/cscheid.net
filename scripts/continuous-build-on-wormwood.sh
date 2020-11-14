#!/bin/bash

cd ~/Dropbox/websites/cscheid.net/
while true; do
    echo $PATH >> /tmp/cscheidnet-build-log.txt
    make staging
    sleep 1
done
