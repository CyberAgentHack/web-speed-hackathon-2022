# windowsのみ動作


# rm files
for file in ./races/*; do rm $file; done
for file in ./players/*; do rm $file; done

# # gen files
for file in ./org/races/*.jpg; do node convertImage.js $file "jpg"; done
for file in ./org/players/*.jpg; do node convertImage.js $file "jpg"; done
for file in ./races/*; do cwebp -q 100 $file -o ${file%.jpg}.webp; done
for file in ./players/*; do cwebp -q 100 $file -o ${file%.jpg}.webp; done

for file in ./races/*.jpg; do rm $file; done
for file in ./players/*.jpg; do rm $file; done

rm -rf ../public/assets/images/players
rm -rf ../public/assets/images/races
cp ./players -r ../public/assets/images/players
cp ./races -r ../public/assets/images/races