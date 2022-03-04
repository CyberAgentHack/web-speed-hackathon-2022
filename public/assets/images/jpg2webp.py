from PIL import Image

# for i in range(1, 21):
#     num = str(i).zfill(3)
#     imgfile = Image.open(num + r'.jpg').convert('RGB')
#     imgfile.save(num + r'.webp','webp')
#     print("kan", num)
num = 'hero'
imgfile = Image.open(num + r'.jpg').convert('RGB')
imgfile.save(num + r'.webp','webp')
print("kan", num)
