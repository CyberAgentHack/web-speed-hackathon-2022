from PIL import Image
import pillow_avif

def convert(name, width):
    imgfile = Image.open(name + r'.jpg').convert('RGB')
    imgfile = imgfile.resize((width, width * imgfile.height // imgfile.width))
    imgfile.save(name + r'.avif','avif')
    print("kan", name)

convert('hero', 1024)
# for i in range(1, 21):
#     num = str(i).zfill(3)
#     convert(num)
