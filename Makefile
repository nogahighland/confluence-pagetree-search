create-zip:
	yarn run webpack --mode production
	zip -r confluence-better-pagetree.zip ./dist

serve:
	yarn run webpack --watch

serve-for-store:
	STORE=1 yarn run webpack --watch
