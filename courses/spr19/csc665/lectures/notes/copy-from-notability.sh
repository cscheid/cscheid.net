#!/bin/bash
cp ~/Dropbox/Documents/Notability/csc665-spring-2019-lecture-notes/*.pdf .

cat > index.md <<EOF
---
layout: bootstrap
title: "In-class notes"
---

# In-class notes

EOF

for i in 2019-*.pdf; do
    name=`basename "$i" .pdf`
    echo "* [${name}](${i})" >> index.md
done
