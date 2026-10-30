const cards = document.querySelectorAll(".card");
const MAX_TILT = 14; // graus

cards.forEach((card) => {
  // Inclinação 3D e brilho seguindo o mouse (ignora toque)
  card.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;   // 0 a 1
    const y = (e.clientY - r.top) / r.height;   // 0 a 1
    card.style.setProperty("--ry", `${(x - 0.5) * 2 * MAX_TILT}deg`);
    card.style.setProperty("--rx", `${(0.5 - y) * 2 * MAX_TILT}deg`);
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });

  // Toque: alterna o efeito ao tocar na carta
  card.addEventListener("pointerup", (e) => {
    if (e.pointerType === "mouse") return;
    const wasActive = card.classList.contains("active");
    cards.forEach((c) => c.classList.remove("active"));
    if (!wasActive) card.classList.add("active");
  });

  // Teclado: Enter ou Espaço também alternam o efeito
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.classList.toggle("active");
    }
  });
});

// Tocar fora das cartas desativa o efeito
document.addEventListener("pointerup", (e) => {
  if (e.pointerType !== "mouse" && !e.target.closest(".card")) {
    cards.forEach((c) => c.classList.remove("active"));
  }
});
