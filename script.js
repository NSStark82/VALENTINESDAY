function rand(min, max){ return Math.random() * (max - min) + min; }

function spawnHeartsBurst(count = 16){
  const hearts = ["💗","💖","💘","💝","💕","💓","💞","💟","✨","🌸"];
  for(let i=0;i<count;i++){
    const el = document.createElement("div");
    el.className = "heart";
    el.textContent = hearts[Math.floor(Math.random()*hearts.length)];
    el.style.setProperty("--dx", `${rand(-220,220)}px`);
    el.style.setProperty("--dy", `${rand(-260,-60)}px`);
    el.style.left = `${rand(15,85)}%`;
    el.style.top  = `${rand(35,75)}%`;
    el.style.fontSize = `${rand(16,28)}px`;
    el.style.animationDuration = `${rand(1.4,2.0)}s`;
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}

function makeNoButtonRun(btn){
  let tries = 0;
  const move = () => {
    tries++;
    const x = rand(8, 80);
    const y = rand(10, 75);
    btn.style.position = "fixed";
    btn.style.left = `${x}%`;
    btn.style.top  = `${y}%`;
    btn.style.transform = `translate(-50%, -50%)`;
    btn.style.transition = "left .12s ease, top .12s ease";
    spawnHeartsBurst(6);

    if(tries >= 5){
      btn.style.opacity = "0.85";
      btn.style.scale = "0.92";
      btn.textContent = "Ya sabia maldosa  🥺";
    }
    if(tries >= 8){
      btn.textContent = " Pues ya que di  😭";
    }
  };

  btn.addEventListener("mouseenter", move);
  btn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    move();
  }, {passive:false});
}

function pad2(n){ return String(n).padStart(2, "0"); }

function updateLiveCounter(){
  const start = new Date("2025-06-22T00:00:00");
  const now = new Date();
  let totalSeconds = Math.floor((now - start) / 1000);
  if(totalSeconds < 0) totalSeconds = 0;

  const days = Math.floor(totalSeconds / (24*3600));
  totalSeconds = totalSeconds % (24*3600);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds = totalSeconds % 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const daysEl = document.getElementById("daysTogether");
  const hoursEl = document.getElementById("hoursTogether");
  const minutesEl = document.getElementById("minutesTogether");
  const secondsEl = document.getElementById("secondsTogether");

  if(daysEl) daysEl.textContent = String(days);
  if(hoursEl) hoursEl.textContent = pad2(hours);
  if(minutesEl) minutesEl.textContent = pad2(minutes);
  if(secondsEl) secondsEl.textContent = pad2(seconds);
}

document.addEventListener("DOMContentLoaded", () => {
  const btnYes = document.getElementById("btnYes");
  const btnNo  = document.getElementById("btnNo");

  if(btnYes){
    btnYes.addEventListener("click", () => {
      spawnHeartsBurst(26);
      setTimeout(() => window.location.href = "yes.html", 550);
    });
  }

  if(btnNo){
    makeNoButtonRun(btnNo);
    btnNo.addEventListener("click", () => {
      spawnHeartsBurst(10);
      setTimeout(() => window.location.href = "yes.html", 450);
    });
  }

  const confettiBtn = document.getElementById("confettiBtn");
  if(confettiBtn){
    confettiBtn.addEventListener("click", () => spawnHeartsBurst(40));
    setTimeout(() => spawnHeartsBurst(18), 350);
  }

  updateLiveCounter();
  setInterval(updateLiveCounter, 1000);
});
