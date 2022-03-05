con="webp"

# rm files
for file in ./races/*; do rm $file; done
for file in ./players/*; do rm $file; done

# # gen files
for file in ./org/races/*.jpg; do node convertImage.js $file $con; done
for file in ./org/players/*.jpg; do node convertImage.js $file $con; done

