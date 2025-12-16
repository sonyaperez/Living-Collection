//Animation for scrolling text. 

// Select paragraphs to animate scrolling text (skip the first two).
const paragraphs = [...document.querySelectorAll('p')];
const animatedParagraphs = paragraphs.slice(2);

// Wrap words in spans.
animatedParagraphs.forEach(p => {
    const words = p.textContent.split(' ');
    let html = '';

    words.forEach((word, i) => {
        html += `<span class="word">${word}</span>`;
        if (i < words.length - 1) html += ' ';
    });

    p.innerHTML = html;
});

//Animation applies to each word on the page.
const animatedWords = document.querySelectorAll('.word');

//Scroll reveal.
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target); //The text will only be revealed once when if first comes into view.
            }
        });
    },
    {
        threshold: 0.1, // Starts revealing when 10% of the word is visible.
    }
);

//Animation observes/applies to each word.
animatedWords.forEach(word => observer.observe(word));



//Canva background set up for changing colors.
const canvas = document.querySelector("canvas"); //Background
const ctx = canvas.getContext("2d");

document.addEventListener("DOMContentLoaded", () => {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
});

//Animating canvas background with shades of magenta/purple.
function animateBackground() {
  // 260 and 300 is in the purple color range
  const t = performance.now() * 0.003; //Medium speed of change.
  const hue = 300 + Math.sin(t) * 15;  
  const color = `hsl(${hue}, 70%, 90%)`; //Magenta/purple range.

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height); //Fill entire canvas.

  requestAnimationFrame(animateBackground); //Looping animation of colors.
}

animateBackground();