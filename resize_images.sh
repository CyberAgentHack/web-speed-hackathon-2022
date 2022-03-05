echo "removing avif"
find images | grep avif | xargs -I @ rm @
echo "generating small images"
find images | grep jpg | xargs -I @ sh -c 'convert -resize 800x800 @ @_small.avif && echo @'
echo "generating thumb images"
find images | grep jpg | xargs -I @ sh -c 'convert -resize 800x800 @ @_small.avif && echo @'