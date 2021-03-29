# RGBConverter
A project to easily convert RGB32 or RGB888 pixels to RGB16 or 565 RGB. It can be expanded to other formats on future.
This is a quite common conversion on low level game development, when making games for old video games or changing roms.
# RGB888 / RGB32
This pixel format is made of 32 bits, it can represent more colors than the 16 bits format.
The first byte is for red, the second for green and last byte is for blue.
This format is the most common used on web development.
# RGB565 / RGB16
This pixel format is made of 16 bits, it can represent less colors than the 32 bits one.
The first byte is for red, the second for green, it has an extra bit cause the human eye is more sensitive for the green color, and last byte is for blue.
You can find this format on old video game color palettes like the first playstation games.
# Demonstration on GitHub Pages
[RGB Converter](https://taiguz.github.io/RGBConverter/)
