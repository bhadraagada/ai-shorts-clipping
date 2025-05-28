from pytubefix import YouTube
from pytubefix.cli import on_progress

url1 = "https://www.youtube.com/watch?v=E3oG313_kps"
url2 = "https://www.youtube.com/watch?v=sSOxPJD-VNo"

yt = YouTube(url2, on_progress_callback=on_progress)
print(f"Title: {yt.title}")

# Get the highest resolution stream
ys = yt.streams.get_highest_resolution()
print(f"Selected stream: {ys}")

ys.download()