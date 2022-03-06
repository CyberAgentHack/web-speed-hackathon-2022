#/bin/sh

echo "=============jpg To webp==============="

app_root_path=`pwd`
assets_path="${app_root_path}/public/assets/images/players/"

cd $assets_path

for file in *.jpg
do
  cwebp -q 50 "$file" -o "${file%.*}.webp"
done

cd $app_root_path

echo "===========Excuted!============"
