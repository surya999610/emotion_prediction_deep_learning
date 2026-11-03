(() => {
  const ORDER = ["sadness", "joy", "love", "anger", "fear", "surprise"];
  const EMO = {
    sadness:  { emoji: "😢", a: "#8db2ff", b: "#4c6fe0", example: "I keep replaying that goodbye and it still hurts." },
    joy:      { emoji: "😄", a: "#ffd75e", b: "#ff9a1f", example: "I just got the job and I can't stop smiling!" },
    love:     { emoji: "❤️", a: "#ff8fb4", b: "#e0457f", example: "You make every ordinary day feel like home." },
    anger:    { emoji: "😠", a: "#ff8a74", b: "#d63a2b", example: "How dare you lie to my face again?" },
    fear:     { emoji: "😨", a: "#b7a2ff", b: "#6c47d9", example: "I'm terrified of what the results will say." },
    surprise: { emoji: "😲", a: "#5eead4", b: "#12a58c", example: "Wait, you flew in just for my birthday?!" },
  };
  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;
  const text = $("text"), go = $("go"), goLabel = $("go-label"), err = $("err"), stage = $("stage");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const MAX = 2000;

  /* ---------- build chips and bars ---------- */
  ORDER.forEach((name, i) => {
    const chip = document.createElement("button");
    chip.type = "button"; chip.className = "chip"; chip.textContent = EMO[name].example;
    chip.addEventListener("click", () => { text.value = EMO[name].example; syncInput(); analyze(); });
    $("chips").appendChild(chip);

    const li = document.createElement("li");
    li.dataset.name = name; li.style.setProperty("--i", i);
    li.innerHTML = `<span class="name"><span>${EMO[name].emoji}</span>${name}</span><span class="track"><span class="fill"></span></span><span class="pct">0.0%</span>`;
    $("bars").appendChild(li);
  });

  /* ---------- input handling ---------- */
  function syncInput() {
    text.style.height = "auto";
    text.style.height = Math.min(text.scrollHeight, 260) + "px";
    const n = text.value.length;
    $("count").textContent = `${n} / ${MAX}`;
    $("count").className = n > MAX * 0.9 ? "warn" : "";
    go.disabled = !text.value.trim() || go.classList.contains("busy");
  }
  text.addEventListener("input", () => { syncInput(); hideErr(); });
  text.addEventListener("keydown", (e) => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); analyze(); } });
  $("form").addEventListener("submit", (e) => { e.preventDefault(); analyze(); });
  $("clear").addEventListener("click", () => { text.value = ""; syncInput(); hideErr(); resetStage(); text.focus(); });
  addEventListener("pointermove", (e) => {
    root.style.setProperty("--mx", ((e.clientX / innerWidth - 0.5) * 2).toFixed(3));
    root.style.setProperty("--my", ((e.clientY / innerHeight - 0.5) * 2).toFixed(3));
  });

  /* ---------- helpers ---------- */
  function showErr(msg) { err.textContent = msg; err.hidden = false; }
  function hideErr() { err.hidden = true; }
  function setBusy(busy) {
    go.classList.toggle("busy", busy);
    go.disabled = busy || !text.value.trim();
    goLabel.textContent = busy ? "Reading…" : "Analyze text";
    stage.dataset.busy = busy;
    if (busy) $("state").textContent = "Reading your sentence…";
  }
  function theme(name) {
    const t = EMO[name];
    root.style.setProperty("--accent", t ? t.a : "#a79bd8");
    root.style.setProperty("--accent2", t ? t.b : "#7a6cc0");
  }
  function countUp(el, to, suffix = "", ms = 1000) {
    if (reduce) { el.textContent = to.toFixed(1) + suffix; return; }
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / ms, 1);
      el.textContent = (to * (1 - Math.pow(1 - p, 3))).toFixed(1) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  function resetStage() {
    theme(null);
    $("emoji").textContent = "💭";
    $("emotion").textContent = "No reading yet";
    $("state").textContent = "Waiting for text";
    $("conf-line").hidden = true;
    document.querySelectorAll("#bars li").forEach((li) => {
      li.classList.remove("top");
      li.querySelector(".fill").style.transform = "scaleX(0)";
      li.querySelector(".pct").textContent = "0.0%";
    });
  }

  /* ---------- render a result ---------- */
  function render(data) {
    const top = data.predicted_emotion;
    const probs = data.all_probabilites; // key spelled as in the API
    const conf = data.confidence;
    theme(top);
    const emoji = $("emoji");
    emoji.textContent = EMO[top] ? EMO[top].emoji : "💭";
    emoji.classList.remove("pop"); void emoji.offsetWidth; emoji.classList.add("pop");
    stage.classList.remove("ping"); void stage.offsetWidth; stage.classList.add("ping");
    $("emotion").textContent = top;
    $("state").textContent = conf >= 0.8 ? "Strong match" : conf >= 0.55 ? "Likely" : "Mixed signals";
    $("conf-line").hidden = false;
    countUp($("conf"), conf * 100);
    document.querySelectorAll("#bars li").forEach((li) => {
      const p = (probs[li.dataset.name] || 0) * 100;
      li.classList.toggle("top", li.dataset.name === top);
      li.querySelector(".fill").style.transform = `scaleX(${Math.max(p, 0.6) / 100})`;
      countUp(li.querySelector(".pct"), p, "%");
    });
  }

  /* ---------- API ---------- */
  function messageFor(e) {
    if (e.name === "AbortError") return "The server took too long to answer. It may still be starting up, so wait a few seconds and try again.";
    if (e.status === 503) return "The model is still loading on the server. Try again in a few seconds.";
    if (e.status === 422) return "Enter between 1 and 2000 characters of text, then analyze again.";
    if (e.status) return `The server returned an error (${e.status}). Check the server logs and try again.`;
    return "Could not reach the server. Check your connection, or that the app is running, then try again.";
  }
  async function analyze() {
    const value = text.value.trim();
    if (!value || go.classList.contains("busy")) return;
    hideErr(); setBusy(true);
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 60000);
    try {
      const res = await fetch("/predict", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: value }), signal: ctl.signal });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) throw { status: res.status };
      render(data);
    } catch (e) {
      console.error("Prediction failed:", e);
      showErr(messageFor(e));
      $("state").textContent = $("conf-line").hidden ? "Waiting for text" : "Last reading shown";
    } finally {
      clearTimeout(timer); setBusy(false);
    }
  }

  /* ---------- server health ---------- */
  function setHealth(state, msg) { $("health").dataset.state = state; $("health-text").textContent = msg; }
  async function pollHealth(n = 0) {
    try {
      const d = await (await fetch("/health")).json();
      if (d.model_loaded) return setHealth("ok", "Model ready");
      setHealth("wait", "Model is loading…");
    } catch { setHealth("bad", "Server unreachable, retrying…"); }
    if (n < 80) setTimeout(() => pollHealth(n + 1), 3000);
  }

  syncInput();
  pollHealth();
})();
