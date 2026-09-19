const hasMousePrimary = window.matchMedia('(pointer: fine)').matches;

const edgeHighlights = document.querySelectorAll('.edge-highlight');
const maxDistance = 200;

let mouseX = 0;
let mouseY = 0;

function updateMousePosition(clientX, clientY) {
    mouseX = clientX;
    mouseY = clientY;

    updateEdges(clientX, clientY);
}

window.addEventListener('mousemove', (event) => {
    updateMousePosition(event.clientX, event.clientY);
});

window.addEventListener('scroll', () => {
    updateMousePosition(mouseX, mouseY);
});

function updateEdges(clientX, clientY) {
    edgeHighlights.forEach(card => {
        const rect = card.getBoundingClientRect();

        // Calculate cursor positions relative to the card
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Calculate distance to element for the proximity fade
        const closestX = Math.max(0, Math.min(x, rect.width));
        const closestY = Math.max(0, Math.min(y, rect.height));
        const distance = Math.sqrt(Math.pow(x - closestX, 2) + Math.pow(y - closestY, 2));

        let opacity = 1 - (distance / maxDistance);
        opacity = Math.max(0, Math.min(opacity, 1));

        // Pass variables directly to the single element
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        card.style.setProperty('--opacity', opacity.toFixed(2));
        card.style.setProperty('--is-hovered', (distance <= 0) ? "1" : "0");

        if (!hasMousePrimary) {
            if (isCentered(card)) {
                card.style.setProperty('--is-hovered', "1");
            } else {
                card.style.setProperty('--is-hovered', "0");
            }
        }
    });
}

function isCentered(element) {
    const rect = element.getBoundingClientRect();
    const screenMiddle = window.innerHeight / 2;
    return rect.top <= screenMiddle && rect.bottom >= screenMiddle;
}