create-zip:
	yarn run webpack --mode production
	zip -r confluence-better-pagetree.zip ./dist

serve:
	yarn run webpack --watch
