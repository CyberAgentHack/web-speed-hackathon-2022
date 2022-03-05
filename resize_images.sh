#!/bin/bash

function generate () {
  echo "$1" | xargs -I @ sh -c "echo resizing @ into $2px && convert -resize $2 @ @_$3.avif"
}

echo "removing avif"
find images | grep avif | xargs -I @ rm @

TARGETS=$(sh -c "find images | grep jpg")

echo "generating small images"
generate "$TARGETS" 600 small

echo "generating thumb images"
generate "$TARGETS" 200 thumb

echo "generating just size image for hero"
generate "images/hero.jpg" 1024 1024
