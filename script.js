const root = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");
const iconSun = document.getElementById("icon-sun");
const iconMoon = document.getElementById("icon-moon");


function applyTheme(isDark) {
    root.classList.toggle("dark", isDark);
    iconSun.style.display = isDark ? "none" : "block";
    iconMoon.style.display = isDark ? "block" : "none";
}


const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);


toggleBtn.addEventListener("click", () => {
    const isDark = !root.classList.contains("dark");
    applyTheme(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
});


const songs = [
    { title: 'Big City', artist: 'Kero Kero Bonito', id: '3Na2DNw2gxHnP13eaFO6Ms' },
    { title: 'tu corazón', artist: 'ataquemos', id: '68DlsIR47CkIOV4IV5xOUl' },
    { title: 'Mi Deseo', artist: 'Paco Amoroso', id: '3nWoohHkz34xvQqCAiRftV' },
    { title: 'kms in a forest while it rains...beautifully', artist: 'I.m_Kami', id: '4XsYrkqb8lXlowUWgSLJjF' },
    { title: 'Glitter', artist: 'Tyler, The Creator', id: '0qtK3XwbuG153dmwB8iepL' },
];

const songEmbed = document.getElementById("song-embed");


function renderSong(pick) {
    if (!songEmbed) return;
    const theme = root.classList.contains("dark") ? "0" : "1";
    songEmbed.innerHTML = `
        <div class="song-card">
        <iframe
            title="${pick.title} by ${pick.artist}"
            src="https://open.spotify.com/embed/track/${pick.id}?utm_source=generator&theme=${theme}"
            width="100%"
            height="360"
            frameborder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
        </iframe>
        </div>
    `;
}


const chosenSong = songs[Math.floor(Math.random() * songs.length)];
renderSong(chosenSong);


toggleBtn.addEventListener("click", () => renderSong(chosenSong));


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2});


document.querySelectorAll(".panel").forEach(panel => observer.observe(panel));