const pointsKey = "ecohome_points";
const actionsKey = "ecohome_actions";

let points = Number(localStorage.getItem(pointsKey) || 0);
let actions = Number(localStorage.getItem(actionsKey) || 0);

function updateStats(){
  document.getElementById("heroPoints").textContent = points;
  document.getElementById("impactPoints").textContent = points;
  document.getElementById("heroActions").textContent = actions;
}
updateStats();

document.querySelectorAll(".action-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    points += Number(btn.dataset.points || 10);
    actions += 1;
    localStorage.setItem(pointsKey, points);
    localStorage.setItem(actionsKey, actions);
    btn.textContent = "✓ Completed!";
    btn.disabled = true;
    updateStats();
  });
});

document.getElementById("calculate").addEventListener("click",()=>{
  const score = ["waste","energy","water"].reduce((sum,id)=>sum+Number(document.getElementById(id).value),0);
  document.getElementById("score").textContent = score;
  let msg = "A good start! Pick one action above and build the habit.";
  if(score >= 70) msg = "Excellent! Your everyday habits are already strongly sustainability-focused.";
  else if(score >= 45) msg = "Nice progress! A few consistent changes can make your routine even greener.";
  document.getElementById("scoreMessage").textContent = msg;
});

const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const chat = document.getElementById("chat");

function addBubble(text, type){
  const div = document.createElement("div");
  div.className = "bubble " + type;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function ecoReply(text){
  const t = text.toLowerCase();
  if(t.includes("water") || t.includes("leak") || t.includes("rain"))
    return "💧 Start by checking taps and visible leaks. Reuse suitable household water where safe, and explore rainwater harvesting if it fits your home and local rules.";
  if(t.includes("plastic") || t.includes("waste") || t.includes("garbage"))
    return "♻️ Try a two- or three-bin system: separate wet/organic waste, dry recyclables, and other waste according to your local collection system.";
  if(t.includes("electric") || t.includes("energy") || t.includes("light") || t.includes("ac"))
    return "⚡ Switch off unused appliances, use daylight when possible, and choose energy-efficient appliances when replacing old ones.";
  if(t.includes("food") || t.includes("kitchen"))
    return "🥕 Plan portions, store food correctly, and use leftovers creatively. Compost suitable organic waste if you have a safe setup.";
  if(t.includes("plant") || t.includes("garden"))
    return "🌿 Choose plants suited to your climate, water them efficiently, and consider native or low-water varieties.";
  return "🌱 Start small: choose one resource you want to save—water, energy or materials—and make one repeatable change today. Consistency matters more than perfection.";
}

form.addEventListener("submit",e=>{
  e.preventDefault();
  const text = input.value.trim();
  if(!text) return;
  addBubble(text,"user");
  input.value = "";
  setTimeout(()=>addBubble(ecoReply(text),"bot"),350);
});

document.querySelector(".menu").addEventListener("click",()=>{
  const nav = document.querySelector(".nav nav");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  nav.style.position = "absolute";
  nav.style.top = "72px";
  nav.style.right = "5%";
  nav.style.flexDirection = "column";
  nav.style.background = "#fff";
  nav.style.padding = "18px";
  nav.style.borderRadius = "15px";
  nav.style.boxShadow = "0 10px 30px rgba(0,0,0,.1)";
});
