Hero video — Alice nella Città
==============================

Posiziona qui i file video per l'hero della landing:

  hero.mp4   → formato universale (H.264, obbligatorio)
  hero.webm  → opzionale, più efficiente su Chrome/Firefox

Se i file non sono presenti, il sito mostra automaticamente
l'immagine statica come fallback (poster).

Linee guida tecniche
--------------------
- Risoluzione consigliata: 1920×1080 (Full HD)
- Durata: 6-15 secondi in loop seamless
- Peso target: 5-10 MB max (comprimi con HandBrake o ffmpeg)
- Codec MP4: H.264, bitrate ~2-3 Mbps
- Audio: rimuovere (il video parte muted obbligatoriamente)
- Aspect ratio: 16:9 (orizzontale)

Esempio compressione con ffmpeg:
  ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow \
         -vf "scale=1920:-2" -an hero.mp4

Dove trovare video stock gratuiti
---------------------------------
- pexels.com/videos (cerca "cinema", "movie theater", "film projector")
- pixabay.com/videos
- mixkit.co/free-stock-video
- coverr.co

Tutti CC0 / commercial use, no attribution required.
