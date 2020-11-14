all: staging

clean:
	rm -f htmlproofer-output.txt

check: clean
	-htmlproofer _staging_site --checks-to-ignore ImageCheck,ScriptCheck 2>htmlproofer-output.txt
	./scripts/process-htmlproofer-output.py htmlproofer-output.txt ./scripts/cscheid-net-links-to-ignore.txt >report.org
	emacsclient report.org

watch: clean
	bash -c 'jekyll build --incremental --watch --destination=~/cscheid_net_builds/_staging_site 2>&1 | grep -v deprecated'

serve: clean
	jekyll serve --incremental --watch --destination=~/cscheid_net_builds/_staging_site

staging-full: clean
	jekyll build --destination=~/cscheid_net_builds/_staging_site

staging: clean
	jekyll build --incremental --destination=~/cscheid_net_builds/_staging_site

production: clean
	JEKYLL_ENV=production jekyll build --incremental --destination=~/cscheid_net_builds/_site

production-full: clean
	JEKYLL_ENV=production jekyll build --destination=~/cscheid_net_builds/_site

full: production-full staging-full

sync-staging: staging-full
	rsync -a /Users/cscheid/cscheid_net_builds/_staging_site 2020.cscheid.net:web/root

sync-production: production-full
	rsync -a /Users/cscheid/cscheid_net_builds/_site 2020.cscheid.net:web/root

sync-full: sync-staging sync-production
