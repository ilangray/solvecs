# deploy script for Parse. copies files into the parse/public directory
# so they can be uploaded with `parse deploy`
cp -r lib scripts stylesheets index.html parse/public
