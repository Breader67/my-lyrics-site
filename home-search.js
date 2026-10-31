// ---------- YOUR SONGS ----------
// To add a song, copy one line, paste it, and change the 4 values.
// "page" = the song's lyrics page, "cover" = its album cover image.
// CHECK THESE PATHS match your repo, or the links and covers will break.
const songs = [
    { title: "Kasari",    artist: "-Yabesh Thapa", page: "../songs/kasari.html",    cover: "../stuff/kasari-cover.jpg" },
    { title: "Tadha",     artist: "-Yabesh Thapa", page: "../songs/tadha.html",     cover: "../stuff/tadha-cover.jpg" },
    { title: "Muskuraye", artist: "-Yabesh Thapa", page: "../songs/muskuraye.html", cover: "../stuff/muskuraye-cover.jpg" },
    { title: "Kalo Seto", artist: "-Purna Rai",    page: "../songs/kalo-seto.html", cover: "../stuff/kalo-seto-cover.jpg" },
    { title: "Bairan",    artist: "-Banjaare",     page: "../songs/bairan.html",    cover: "../stuff/bairan-cover.jpg" },
    { title: "Barsaat",   artist: "-Banjaare",     page: "../songs/barsaat.html",   cover: "../stuff/barsaat-cover.jpg" },
  ];
  
  // ---------- GRAB THE ELEMENTS WE NEED (by their ids from index.html) ----------
  const track  = document.getElementById("track");
  const search = document.getElementById("search");
  const prev   = document.getElementById("prev");
  const next   = document.getElementById("next");
  const empty  = document.getElementById("empty");
  
  // ---------- DRAW THE CARDS ----------
  function render(text) {
    const q = text.trim().toLowerCase();
  
    const list = songs
      .filter(s => s.title.toLowerCase().startsWith(q))   // keep songs that START with what was typed ("" keeps all)
      .sort((a, b) => a.title.localeCompare(b.title));    // A to Z
  
    // turn each song into one card of HTML and put them all in the track
    track.innerHTML = list.map(s => `
      <a class="card" href="${s.page}" target="_blank" rel="noopener">
        <img src="${s.cover}" alt="" onerror="this.remove()">
        <div class="info"><h3>${s.title}</h3><p>${s.artist}</p></div>
      </a>`).join("");
  
    empty.hidden = list.length > 0;   // show the "no songs" message only when nothing matched
    track.scrollLeft = 0;
    updateArrows();
  }
  
  // ---------- ARROWS ----------
  function updateArrows() {
    prev.classList.toggle("hidden", track.scrollLeft < 10);                                        // left arrow only after you've gone right
    next.classList.toggle("hidden", track.scrollLeft + track.clientWidth >= track.scrollWidth - 10); // right arrow hides at the end
  }
  
  next.addEventListener("click", () => track.scrollBy({ left: 340, behavior: "smooth" }));
  prev.addEventListener("click", () => track.scrollBy({ left: -340, behavior: "smooth" }));
  track.addEventListener("scroll", updateArrows);
  
  // ---------- SEARCH ----------
  search.addEventListener("input", () => render(search.value));

  let animating = false;   // stops two animations from running at once

function slide(distance) {
  if (animating) return;
  animating = true;

  const start = track.scrollLeft;
  const duration = 700;                 // milliseconds. Bigger = slower
  const startTime = performance.now();

  function step(now) {
    const t = Math.min((now - startTime) / duration, 1);   // goes from 0 to 1
    const ease = 1 - Math.pow(1 - t, 3);                   // starts fast, slows down at the end
    track.scrollLeft = start + distance * ease;
    if (t < 1) {
      requestAnimationFrame(step);      // run again on the next frame
    } else {
      animating = false;
    }
  }
  requestAnimationFrame(step);
}

next.addEventListener("click", () => slide(340));
prev.addEventListener("click", () => slide(-340));

  render("");   // draw everything when the page first loads