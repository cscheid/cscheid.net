#!/usr/bin/env python

import mistune
from bs4 import BeautifulSoup
import sys
import bs4

##############################################################################
# general bs navigation
        
def is_tag(v, name=None):
    if type(v) != bs4.element.Tag:
        return False
    if (not (name is None)) and v.name != name:
        return False
    return True

def all_children_tags(node, name=None):
    for el in node:
        if is_tag(el, name):
            yield el

##############################################################################
# domain-specific checks

prefix="_staging_site/"

# filter out internal hash links
def error_message(tag):
    try:
        return str(tag[1].text)
    except IndexError as e:
        return ""
    except TypeError as e:
        return ""

def guess_internal_url(link):
    dirs = link.split('/')
    try:
        year = int(dirs[1])
        month = int(dirs[2])
        day = int(dirs[3])
        return "_posts/%s-%s-%s-%s.markdown" % (dirs[1], dirs[2], dirs[3], dirs[4][:-5])
    except IndexError as e:
        pass
    except ValueError as e:
        pass
    return link[len(prefix):-5] + ".md"

##############################################################################

md_html = mistune.markdown(open(sys.argv[1]).read())
links_to_ignore = set(s.strip() for s in open(sys.argv[2]))
bs = BeautifulSoup(md_html, "html.parser").contents

errors = []
for el in all_children_tags(bs, 'ul'):
    for error in all_children_tags(el, 'li'):
        source = guess_internal_url(error.contents[0])
        for error_item in all_children_tags(error.contents[1], 'li'):
            errors.append((source, error_item))

errors = list(e for e in errors if not error_message(e).startswith("linking to internal hash"))

# Report and drop:

print("* External link errors")

external_link_errors = list(e for e in errors if error_message(e).startswith("External link"))

# drop response code 0
remainder_errors = list(e for e in errors if not ("response code 0" in error_message(e)))

remainder_errors = list(e for e in remainder_errors if not error_message(e).startswith("External link"))

for e in external_link_errors:
    link = e[1].contents[1].contents[0]
    if link in links_to_ignore:
        print("ignoring %s" % link, file=sys.stderr)
    else:
        print("** TODO [[file:%s][%s]]" % (e[0], e[0]))
        print("link:", e[1].contents[1].contents[0])
        print("Message:", e[1].text.strip())
        print()
    
