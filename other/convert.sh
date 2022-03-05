ext="jpg"
con="webp"

# rm files
for file in ./races/*-*_*.$ext; do rm $file; done
for file in ./players/*-*_*.$ext; do rm $file; done

# gen files
for file in ./races/*.$ext; do node convertImage.js $file $con; done
for file in ./players/*.$ext; do node convertImage.js $file $con; done

