#!/bin/sh

for var in {1..20}
do
  name="00${var}"
  ffmpeg -y -i ./public/assets/images/players/${name: -3}.jpg -vf scale=200:-1 ./public/assets/images/players/${name: -3}_sq.webp
done
# echo "Hello, World!"
