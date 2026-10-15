// ==========================================================================
// RHYTHM by Be Bodywise (Mosaic Wellness) - Master Application Logic
// Built for Fellowship Builder Challenge (Part 1 Research + Part 2 AI App)
// ==========================================================================

// Global State
const state = {
  activeTab: 'today',
  travelMode: false,
  comebackMode: false,
  weatherIndex: 0, // 0: High UV, 1: Humid Monsoon, 2: Dry Winter
  rhythmScore: 88,
  daysTracked: 18,
  
  // Real customer insights embedded for quick reference and clinical routing
  customers: [
    {
      name: "Anusha Garg",
      phone: "+91 9058885170",
      product: "Biotin Hair Gummies (3-6m)",
      struggle: "Ran out mid-month, reorder took 2 weeks, skipped doses.",
      desire: "Reminder before pack ends, easy restart after break.",
      solvedBy: "Refill Radar + Comeback Mode"
    },
    {
      name: "Payasvani Raina",
      phone: "+91 9596938795",
      product: "Hair Care Kit (1-3m)",
      struggle: "3 steps and no clear order. Conflicting advice on pack/site/reels. Dropped mask.",
      desire: "One clear routine card with order & days inside kit.",
      solvedBy: "One Routine Card + QR Scan Sync"
    },
    {
      name: "Sanjivani",
      phone: "+91 9905139996",
      product: "Underarm Roll-on & Body Lotion (1-3m)",
      struggle: "Travels for work, routine stops on trips, unsure if roll-on goes after lotion.",
      desire: "Travel pack, simple on-the-go routine, pairing advice.",
      solvedBy: "1-Tap Travel Mode + Pairing Safety Engine"
    },
    {
      name: "Nimish Sugla",
      phone: "+91 9311052199",
      product: "Body Wash & Sunscreen (3-6m)",
      struggle: "Catalog overwhelm, skips sunscreen unsure of when/how much, dry skin.",
      desire: "Quick way to find what fits, clear daily routine, doctor access.",
      solvedBy: "60s Routine Builder + Weather/UV Nudge"
    },
    {
      name: "Rohit Kumar Yadav",
      phone: "+91 8918666286",
      product: "Hair Growth Serum & Gummies (6m+)",
      struggle: "3-week gap when bottle ran out, sticky scalp, unsure if gummies and serum mix, doctor wait.",
      desire: "Run-out heads-up, quicker route to advisor, application advice.",
      solvedBy: "Refill Radar + Pairing Checker + Advisor in 1-Tap"
    }
  ],

  // Weather scenarios
  weatherScenarios: [
    {
      badge: "UV NUDGE",
      summary: "UV 7 (High) • Mumbai 31°C",
      icon: "☀️",
      tip: "<strong>High UV Index (7):</strong> Peak sunlight detected. Apply 2 finger lengths of sunscreen 15 minutes before stepping out. Nimish skipped this — don't let UV reverse your progress!"
    },
    {
      badge: "HUMIDITY ALERT",
      summary: "88% Humidity • Monsoon / Coastal",
      icon: "🌧️",
      tip: "<strong>High Humidity (88%):</strong> Rohit experienced sticky scalp under serum. On humid days, apply only 0.75ml directly to parted scalp on towel-dried hair. Do not oversaturate!"
    },
    {
      badge: "DRY WEATHER",
      summary: "Low Humidity 24% • Dry Winter",
      icon: "❄️",
      tip: "<strong>Dry Weather Alert:</strong> Skin barrier moisture drops fast. Apply your 10% Niacinamide Lotion within 3 minutes of stepping out of the shower while skin is damp."
    }
  ],

  // Today's steps
  amSteps: [
    {
      id: 'step-am-1',
      title: 'Biotin Hair Gummies',
      dose: '1 gummy post-breakfast',
      anchor: 'Anchor: After morning coffee / tea',
      tag: 'Ingestible Nutrition',
      tagColor: 'badge-purple',
      completed: true,
      depletionKey: 'gummies'
    },
    {
      id: 'step-am-2',
      title: 'SPF 50 Sunscreen Shield',
      dose: '2 finger lengths on hairline & face',
      anchor: 'Anchor: Right after brushing teeth',
      tag: 'UV Protection',
      tagColor: 'badge-amber',
      completed: false,
      depletionKey: 'sunscreen'
    }
  ],

  pmSteps: [
    {
      id: 'step-pm-1',
      title: 'Advanced Hair Growth Serum (Roll-On)',
      dose: '1 ml directly on dry thin spots',
      anchor: 'Anchor: Beside bed right before sleep',
      tag: 'Clinical Active',
      tagColor: 'badge-purple',
      completed: false,
      depletionKey: 'serum'
    }
  ],

  cadenceSteps: [
    {
      id: 'step-cad-1',
      title: 'Exfoliating AHA/BHA Body & Scalp Wash',
      frequency: 'Wednesdays & Sundays (Shower)',
      dose: 'Massage for 2 mins, rinse thoroughly',
      tag: 'Build-up Removal',
      completed: false,
      depletionKey: 'bodywash'
    },
    {
      id: 'step-cad-2',
      title: 'Keratin Deep Moisture Mask',
      frequency: 'Sundays only (Self-Care)',
      dose: 'Leave on mid-lengths for 15 mins',
      tag: 'Cuticle Repair',
      completed: false,
      depletionKey: 'mask'
    }
  ],

  // Refill Radar Inventory
  inventory: [
    {
      id: 'gummies',
      name: 'Biotin Hair Gummies (Strawberry)',
      packSize: '60 Gummies (30-day supply)',
      dosesPerDay: 2,
      remainingDoses: 16,
      daysLeft: 8,
      pctLeft: 26,
      status: 'urgent',
      price: '₹599'
    },
    {
      id: 'serum',
      name: 'Advanced Hair Growth Serum (Roll-On)',
      packSize: '50ml Precision Bottle',
      dosesPerDay: 1,
      remainingDoses: 28,
      daysLeft: 28,
      pctLeft: 62,
      status: 'safe',
      price: '₹899'
    },
    {
      id: 'bodywash',
      name: '1% Salicylic Acid Exfoliating Wash',
      packSize: '200ml Bottle',
      dosesPerDay: 0.3, // ~2x per week
      remainingDoses: 42,
      daysLeft: 35,
      pctLeft: 70,
      status: 'safe',
      price: '₹349'
    },
    {
      id: 'rollon',
      name: '4% Niacinamide Underarm Roll-On',
      packSize: '50ml Roll-On',
      dosesPerDay: 1,
      remainingDoses: 22,
      daysLeft: 22,
      pctLeft: 44,
      status: 'safe',
      price: '₹299'
    },
    {
      id: 'sunscreen',
      name: 'SPF 50 PA++++ Mineral Sunscreen Shield',
      packSize: '50ml Tube',
      dosesPerDay: 1,
      remainingDoses: 19,
      daysLeft: 19,
      pctLeft: 38,
      status: 'safe',
      price: '₹449'
    }
  ],

  // Pairing database
  pairingRules: {
    'serum+gummies': {
      status: 'compatible',
      title: '✅ Synergistic Power Duo (Hair Regrowth)',
      rule: 'Take Biotin Gummies in the AM after food for systemic follicle nutrition. Apply the Hair Growth Serum in the PM directly on a dry scalp.',
      rationale: 'Rohit asked if these clash: They do not! Ingestible vitamins deliver building blocks internally, while topical Redensyl stimulates anagen growth on the scalp directly.'
    },
    'rollon+lotion': {
      status: 'caution',
      title: '⚠️ Layering Order Rule (Underarm Care)',
      rule: 'Always apply the 4% Niacinamide Roll-on FIRST to completely clean, dry underarms. Allow 60 seconds to fully absorb. Then apply Body Lotion, avoiding direct underarm creases.',
      rationale: 'Sanjivani wondered about this sequence. Putting heavy body lotion first creates an occlusive lipid barrier that blocks the active roll-on from penetrating sweat ducts.'
    },
    'bodywash+sunscreen': {
      status: 'compatible',
      title: '✅ Essential Protective Routine (Nimish’s Combo)',
      rule: 'Use the Salicylic Acid Body Wash in the shower to clear sebum and dead skin cells. Always follow with Sunscreen on any sun-exposed areas before leaving home.',
      rationale: 'Salicylic acid chemically exfoliates the outer skin layer, making skin temporarily more sensitive to UV radiation. Sunscreen is non-negotiable to prevent dark spots.'
    },
    'mask+serum': {
      status: 'compatible',
      title: '✅ Dual-Action Hair Repair (Payasvani’s Fix)',
      rule: 'Use the Hair Mask in the shower on shampooed, damp mid-lengths and ends. Rinse thoroughly. Apply the Hair Growth Serum AFTER hair is 100% dry at night, only to the scalp.',
      rationale: 'Mask targets damaged hair shafts and cuticles; serum targets the living scalp follicles. They never interfere when applied in this separate cadence.'
    },
    'bodywash+lotion': {
      status: 'compatible',
      title: '✅ Hydration-Lock Barrier Duo',
      rule: 'Rinse off body wash thoroughly. Apply 10% Niacinamide Body Lotion within 3 minutes of patting dry to trap moisture in the epidermis.',
      rationale: 'Prevents the post-shower tightness and dryness Nimish reported.'
    }
  }
};

// Web Audio API Sound Generator for tactile check-off gratification
function playChime(type = 'success') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'refill') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (e) {
    // Audio context may be restricted before gesture
  }
}

// Toast helper
function showToast(message, icon = '✨') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// Tab Switching
// ==========================================================================
function initTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;
      switchTab(targetId);
    });
  });
}

function switchTab(tabKey) {
  state.activeTab = tabKey;
  document.querySelectorAll('.nav-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tabKey);
  });
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `view-${tabKey}`);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================================================
// TAB 1: Render Today's Steps
// ==========================================================================
function renderTodaySteps() {
  const amContainer = document.getElementById('amStepList');
  const pmContainer = document.getElementById('pmStepList');
  const cadContainer = document.getElementById('cadenceStepList');

  // Filter if Travel Mode is on
  const amList = state.travelMode ? [state.amSteps[0]] : state.amSteps;
  const pmList = state.travelMode ? [state.pmSteps[0]] : state.pmSteps;

  // Render AM
  if (amContainer) {
    amContainer.innerHTML = amList.map(step => `
      <div class="step-item ${step.completed ? 'completed' : ''}" data-id="${step.id}" data-time="am">
        <div class="step-left">
          <div class="custom-checkbox" onclick="toggleStep('${step.id}', 'am')">
            ${step.completed ? '✓' : ''}
          </div>
          <div class="step-details">
            <h4>${step.title}</h4>
            <div class="step-subtext">
              <span><strong>Dose:</strong> ${step.dose}</span>
              <span>${step.anchor}</span>
            </div>
          </div>
        </div>
        <div class="step-right">
          <span class="tag-badge ${step.tagColor}">${step.tag}</span>
        </div>
      </div>
    `).join('');
  }

  // Render PM
  if (pmContainer) {
    pmContainer.innerHTML = pmList.map(step => `
      <div class="step-item ${step.completed ? 'completed' : ''}" data-id="${step.id}" data-time="pm">
        <div class="step-left">
          <div class="custom-checkbox" onclick="toggleStep('${step.id}', 'pm')">
            ${step.completed ? '✓' : ''}
          </div>
          <div class="step-details">
            <h4>${step.title}</h4>
            <div class="step-subtext">
              <span><strong>Dose:</strong> ${step.dose}</span>
              <span>${step.anchor}</span>
            </div>
          </div>
        </div>
        <div class="step-right">
          <span class="tag-badge ${step.tagColor}">${step.tag}</span>
        </div>
      </div>
    `).join('');
  }

  // Render Cadence
  if (cadContainer) {
    if (state.travelMode) {
      cadContainer.innerHTML = `<div style="padding: 12px; font-size: 0.82rem; color: #64748b;">✈️ Cadence steps paused during travel mode to minimize luggage.</div>`;
    } else {
      cadContainer.innerHTML = state.cadenceSteps.map(step => `
        <div class="step-item ${step.completed ? 'completed' : ''}" data-id="${step.id}" data-time="cad">
          <div class="step-left">
            <div class="custom-checkbox" onclick="toggleStep('${step.id}', 'cad')">
              ${step.completed ? '✓' : ''}
            </div>
            <div class="step-details">
              <h4>${step.title}</h4>
              <div class="step-subtext">
                <span><strong>When:</strong> ${step.frequency}</span>
                <span><strong>Instruction:</strong> ${step.dose}</span>
              </div>
            </div>
          </div>
          <div class="step-right">
            <span class="tag-badge badge-amber">${step.tag}</span>
          </div>
        </div>
      `).join('');
    }
  }

  updateRoutineBadges();
}

window.toggleStep = function(id, timeGroup) {
  let list = timeGroup === 'am' ? state.amSteps : (timeGroup === 'pm' ? state.pmSteps : state.cadenceSteps);
  const item = list.find(s => s.id === id);
  if (item) {
    item.completed = !item.completed;
    if (item.completed) {
      playChime('success');
      showToast(`Logged: ${item.title}! Consistency +2%`, '🌱');
      state.rhythmScore = Math.min(100, state.rhythmScore + 2);
    } else {
      state.rhythmScore = Math.max(70, state.rhythmScore - 2);
    }
    renderTodaySteps();
    updateScoreDisplay();
  }
};

function updateRoutineBadges() {
  const amDone = state.amSteps.filter(s => s.completed).length;
  const amTotal = state.amSteps.length;
  const amBadge = document.getElementById('amStatusBadge');
  if (amBadge) amBadge.textContent = `${amDone} of ${amTotal} done`;

  const pmDone = state.pmSteps.filter(s => s.completed).length;
  const pmTotal = state.pmSteps.length;
  const pmBadge = document.getElementById('pmStatusBadge');
  if (pmBadge) pmBadge.textContent = pmDone === pmTotal ? 'All Done ✓' : (pmDone > 0 ? `${pmDone} of ${pmTotal} done` : 'Pending');
}

function updateScoreDisplay() {
  const scoreVal = document.getElementById('todayScoreVal');
  const mainScoreNum = document.getElementById('mainScoreNum');
  const scoreCircle = document.getElementById('scoreCircle');

  if (scoreVal) scoreVal.textContent = `${state.rhythmScore}%`;
  if (mainScoreNum) mainScoreNum.textContent = state.rhythmScore;
  if (scoreCircle) {
    const deg = Math.round((state.rhythmScore / 100) * 360);
    scoreCircle.style.background = `conic-gradient(var(--berry-600) ${deg}deg, var(--slate-200) 0deg)`;
  }
}

// Complete All Steps Action
function initTodayActions() {
  const completeAllBtn = document.getElementById('completeAllTodayBtn');
  if (completeAllBtn) {
    completeAllBtn.addEventListener('click', () => {
      state.amSteps.forEach(s => s.completed = true);
      state.pmSteps.forEach(s => s.completed = true);
      state.cadenceSteps.forEach(s => s.completed = true);
      state.rhythmScore = 96;
      playChime('success');
      renderTodaySteps();
      updateScoreDisplay();
      showToast('All routine steps logged for today! +10 Consistency Points 🎉', '🏆');
    });
  }

  const logSensationBtn = document.getElementById('logSensationBtn');
  if (logSensationBtn) {
    logSensationBtn.addEventListener('click', () => {
      const note = prompt("How does your scalp or skin feel today? (e.g. 'Less shedding', 'Slight stickiness', 'Good hydration')", "Scalp feels clean and shedding is noticeably lower.");
      if (note) {
        showToast("Sensory feedback recorded. Synced to your Doctor Handoff Packet!", "📝");
      }
    });
  }
}

// ==========================================================================
// Mode Toggles: Comeback Mode & Travel Mode
// ==========================================================================
function initModes() {
  const toggleComebackBtn = document.getElementById('toggleComebackBtn');
  const comebackBanner = document.getElementById('comebackBanner');
  const dismissComebackBtn = document.getElementById('dismissComebackBtn');
  const resumeGentleBtn = document.getElementById('resumeGentleBtn');
  const resumeFullBtn = document.getElementById('resumeFullBtn');

  if (toggleComebackBtn) {
    toggleComebackBtn.addEventListener('click', () => {
      state.comebackMode = !state.comebackMode;
      if (comebackBanner) comebackBanner.classList.toggle('hidden', !state.comebackMode);
      if (state.comebackMode) {
        showToast("Comeback Mode activated: Zero streak shaming. Welcome back!", "🌱");
      }
    });
  }

  if (dismissComebackBtn) {
    dismissComebackBtn.addEventListener('click', () => {
      state.comebackMode = false;
      if (comebackBanner) comebackBanner.classList.add('hidden');
    });
  }

  if (resumeGentleBtn) {
    resumeGentleBtn.addEventListener('click', () => {
      state.comebackMode = false;
      if (comebackBanner) comebackBanner.classList.add('hidden');
      showToast("Gentle Restart initiated: Focus solely on Biotin Gummies today. No pressure!", "☕");
    });
  }

  if (resumeFullBtn) {
    resumeFullBtn.addEventListener('click', () => {
      state.comebackMode = false;
      if (comebackBanner) comebackBanner.classList.add('hidden');
      showToast("Full routine resumed! Your cumulative Rhythm score was preserved.", "🚀");
    });
  }

  // Travel Mode
  const toggleTravelBtn = document.getElementById('toggleTravelBtn');
  const travelBanner = document.getElementById('travelBanner');
  const travelStatusText = document.getElementById('travelStatusText');
  const exitTravelBtn = document.getElementById('exitTravelBtn');
  const viewTravelPackBtn = document.getElementById('viewTravelPackBtn');

  function setTravelMode(active) {
    state.travelMode = active;
    if (travelBanner) travelBanner.classList.toggle('hidden', !active);
    if (travelStatusText) travelStatusText.textContent = active ? 'ON' : 'OFF';
    if (toggleTravelBtn) toggleTravelBtn.classList.toggle('highlight-pill', active);
    renderTodaySteps();
    showToast(active ? "Travel Mode ON: Compact 2-step routine activated!" : "Travel Mode OFF: Full home routine restored.", "✈️");
  }

  if (toggleTravelBtn) {
    toggleTravelBtn.addEventListener('click', () => setTravelMode(!state.travelMode));
  }

  if (exitTravelBtn) {
    exitTravelBtn.addEventListener('click', () => setTravelMode(false));
  }

  if (viewTravelPackBtn) {
    viewTravelPackBtn.addEventListener('click', () => {
      alert("✈️ Travel Packing Checklist (TSA Friendly):\n\n1. Biotin Gummies: Count 14 gummies in a mini travel pouch.\n2. Underarm Roll-on: 50ml (Cabin-bag approved).\n3. Sunscreen Shield: 50ml tube.\n\nTip: Leave bulky hair masks and body washes at home!");
    });
  }

  // Weather toggle
  const weatherNudgeBtn = document.getElementById('weatherNudgeBtn');
  const cycleWeatherBtn = document.getElementById('cycleWeatherBtn');
  const weatherSummary = document.getElementById('weatherSummary');
  const weatherBadge = document.getElementById('weatherBadge');
  const weatherTip = document.getElementById('weatherTip');

  function cycleWeather() {
    state.weatherIndex = (state.weatherIndex + 1) % state.weatherScenarios.length;
    const cur = state.weatherScenarios[state.weatherIndex];
    if (weatherSummary) weatherSummary.textContent = cur.summary;
    if (weatherBadge) weatherBadge.textContent = cur.badge;
    if (weatherTip) weatherTip.innerHTML = cur.tip;
    showToast(`Simulated climate updated: ${cur.summary}`, cur.icon);
  }

  if (weatherNudgeBtn) weatherNudgeBtn.addEventListener('click', cycleWeather);
  if (cycleWeatherBtn) cycleWeatherBtn.addEventListener('click', cycleWeather);
}

// ==========================================================================
// TAB 3: 60-Second Routine Builder
// ==========================================================================
function initRoutineBuilder() {
  let selectedConcern = 'hair_fall';
  let selectedTiming = 'morning';
  let selectedEffort = 'balanced';

  // Option selections
  const concernButtons = document.querySelectorAll('#concernOptions .choice-card');
  concernButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      concernButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedConcern = btn.dataset.concern;
    });
  });

  const timingButtons = document.querySelectorAll('#timingOptions .choice-card');
  timingButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      timingButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTiming = btn.dataset.timing;
    });
  });

  const effortButtons = document.querySelectorAll('#effortOptions .choice-card');
  effortButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      effortButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedEffort = btn.dataset.effort;
    });
  });

  // Navigation between steps
  function showWizStep(stepNum) {
    for (let i = 1; i <= 4; i++) {
      const p = document.getElementById(`panelStep${i}`);
      const s = document.getElementById(`wizStep${i}`);
      if (p) p.classList.toggle('active', i === stepNum);
      if (s) s.classList.toggle('active', i <= stepNum);
    }
  }

  const toStep2Btn = document.getElementById('toStep2Btn');
  const backToStep1Btn = document.getElementById('backToStep1Btn');
  const toStep3Btn = document.getElementById('toStep3Btn');
  const backToStep2Btn = document.getElementById('backToStep2Btn');
  const generateRoutineBtn = document.getElementById('generateRoutineBtn');
  const restartWizardBtn = document.getElementById('restartWizardBtn');
  const adoptRoutineBtn = document.getElementById('adoptRoutineBtn');
  const saveAndPairBtn = document.getElementById('saveAndPairBtn');

  if (toStep2Btn) toStep2Btn.addEventListener('click', () => showWizStep(2));
  if (backToStep1Btn) backToStep1Btn.addEventListener('click', () => showWizStep(1));
  if (toStep3Btn) toStep3Btn.addEventListener('click', () => showWizStep(3));
  if (backToStep2Btn) backToStep2Btn.addEventListener('click', () => showWizStep(2));
  if (restartWizardBtn) restartWizardBtn.addEventListener('click', () => showWizStep(1));

  if (generateRoutineBtn) {
    generateRoutineBtn.addEventListener('click', () => {
      generateProtocol(selectedConcern, selectedTiming, selectedEffort);
      showWizStep(4);
    });
  }

  if (adoptRoutineBtn) {
    adoptRoutineBtn.addEventListener('click', () => {
      showToast("Routine successfully adopted into Today's View!", "🎉");
      switchTab('today');
    });
  }

  if (saveAndPairBtn) {
    saveAndPairBtn.addEventListener('click', () => {
      switchTab('pairing');
    });
  }
}

function generateProtocol(concern, timing, effort) {
  const titleEl = document.getElementById('generatedRoutineTitle');
  const descEl = document.getElementById('generatedRoutineDesc');
  const listEl = document.getElementById('recommendedProductsList');

  const routines = {
    hair_fall: {
      title: "Targeted Hair Regrowth & Density Protocol",
      desc: "Directly solves Anusha & Rohit's complaints: pairs internal follicle nutrients with precision external stimulation.",
      products: [
        {
          time: "AM • Morning",
          name: "Biotin Hair Gummies (Strawberry)",
          desc: "Ingestible vitamins (Biotin, Zinc, Vit A, C, E) formulated to support keratin infrastructure.",
          reason: "Anchor to morning breakfast to prevent missed doses."
        },
        {
          time: "PM • Night",
          name: "Advanced Hair Growth Serum (Roll-On)",
          desc: "3% Redensyl + 3% Procapil. Direct application to thinning scalp areas.",
          reason: "Roll-on prevents waste and sticky palms. Apply strictly on parted scalp."
        },
        {
          time: "Weekly Cadence (Sunday)",
          name: "Keratin Repair Hair Mask",
          desc: "Deep conditioning restorative mask to repair strands and minimize breakage during comb-through.",
          reason: "Replaces conflicting instructions with a dedicated once-a-week ritual."
        }
      ]
    },
    underarm: {
      title: "Underarm Brightening & Odor Defense System",
      desc: "Engineered for Sanjivani: clear layering order between roll-on and body lotion, ready for travel.",
      products: [
        {
          time: "AM • Post-Shower",
          name: "4% Niacinamide Underarm Roll-On",
          desc: "Clinical active roll-on that reduces hyperpigmentation and controls 24-hour odor without aluminum.",
          reason: "Must be applied to dry underarms BEFORE any moisturizers."
        },
        {
          time: "Daily Body Hydration",
          name: "10% Niacinamide Body Lotion",
          desc: "Lightweight ceramide barrier lotion for velvety smooth arms and legs.",
          reason: "Apply to full body, steering clear of direct armpit folds."
        }
      ]
    },
    body_acne: {
      title: "Exfoliating Smooth-Skin Body Protocol",
      desc: "Solves Nimish's rough skin texture while protecting the moisture barrier from stripping.",
      products: [
        {
          time: "In-Shower (3x Weekly)",
          name: "1% Salicylic Acid Body Wash",
          desc: "Cleanses deep inside pores to dissolve acne plugs and strawberry skin keratosis.",
          reason: "Lather for 90 seconds to allow active BHA penetration."
        },
        {
          time: "Daily AM Protection",
          name: "Broad-Spectrum SPF 50 Body & Face Shield",
          desc: "Essential UV defense because exfoliating BHAs increase photosensitivity.",
          reason: "Never skip sunscreen after exfoliation (solves Nimish's missed step)."
        }
      ]
    },
    sun_dryness: {
      title: "Deep Barrier Rehydration & Daily Shield",
      desc: "Designed to end Nimish's confusion about when and how much sunscreen to apply.",
      products: [
        {
          time: "Morning (Daily)",
          name: "SPF 50 PA++++ Mineral Sunscreen Shield",
          desc: "Featherlight, non-greasy UV shield. 2 finger lengths provide full certified SPF protection.",
          reason: "Apply at 8:00 AM before stepping outside."
        },
        {
          time: "Post-Bath & PM",
          name: "Ceramide & Hyaluronic Deep Body Lotion",
          desc: "Rebuilds natural skin lipids stripped by hard water or daily friction.",
          reason: "Locks in hydration within 3 minutes of bathing."
        }
      ]
    },
    scalp_dandruff: {
      title: "Scalp Clarifying & Anti-Build-Up Protocol",
      desc: "Eliminates fungal flakes, product buildup, and sticky residues.",
      products: [
        {
          time: "2x Weekly Wash",
          name: "1% Ketoconazole Scalp Solution",
          desc: "Clinically eradicates Dandruff-causing Malassezia yeast.",
          reason: "Leave on scalp lather for 5 minutes before rinsing."
        },
        {
          time: "Nightly PM",
          name: "Lightweight Scalp Tonic",
          desc: "Water-based peptide soothing tonic that calms itching without greasiness.",
          reason: "Non-comedogenic water formula."
        }
      ]
    }
  };

  const selected = routines[concern] || routines.hair_fall;
  if (titleEl) titleEl.textContent = selected.title;
  if (descEl) descEl.textContent = selected.desc;

  if (listEl) {
    listEl.innerHTML = selected.products.map(p => `
      <div class="rec-product-card">
        <div class="rec-timing">${p.time}</div>
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
        <div class="rec-reason"><strong>Why it's here:</strong> ${p.reason}</div>
      </div>
    `).join('');
  }
}

// ==========================================================================
// TAB 4: Refill Radar
// ==========================================================================
function renderRefillRadar() {
  const container = document.getElementById('radarItemsGrid');
  if (!container) return;

  container.innerHTML = state.inventory.map(item => {
    const isUrgent = item.daysLeft <= 10;
    return `
      <div class="radar-card ${isUrgent ? 'urgent' : ''}" id="radar-card-${item.id}">
        <div class="radar-top-row">
          <div>
            <h4 class="radar-prod-name">${item.name}</h4>
            <span class="radar-meta">${item.packSize} • ${item.price}</span>
          </div>
          <span class="radar-badge ${isUrgent ? 'badge-urgent' : 'badge-safe'}">
            ${isUrgent ? '🚨 Reorder Now' : '✓ Good Supply'}
          </span>
        </div>

        <div class="radar-depletion-bar">
          <div class="depletion-track">
            <div class="depletion-fill ${isUrgent ? 'fill-danger' : 'fill-safe'}" style="width: ${item.pctLeft}%"></div>
          </div>
          <div class="depletion-labels">
            <span>${item.remainingDoses} doses left</span>
            <span>${item.pctLeft}% remaining</span>
          </div>
        </div>

        <div class="radar-action-row">
          <div class="days-left-count">
            ⏳ Approx. <strong>${item.daysLeft} days</strong> until empty
          </div>
          <button class="btn ${isUrgent ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="openReorderModal('${item.id}')">
            ${isUrgent ? '1-Tap Refill ⚡' : 'Pre-order Refill'}
          </button>
        </div>
      </div>
    `;
  }).join('');

  const urgentCount = state.inventory.filter(i => i.daysLeft <= 10).length;
  const countEl = document.getElementById('urgentRefillCount');
  const alertCountNav = document.getElementById('refillAlertCount');
  if (countEl) countEl.textContent = `${urgentCount} Item${urgentCount !== 1 ? 's' : ''}`;
  if (alertCountNav) alertCountNav.textContent = urgentCount;
}

window.openReorderModal = function(itemId) {
  const item = state.inventory.find(i => i.id === itemId);
  if (!item) return;
  const modal = document.getElementById('reorderModal');
  const summaryBox = document.getElementById('reorderSummaryBox');
  if (summaryBox) {
    summaryBox.innerHTML = `
      <div style="padding: 12px; background: #fff1f2; border-radius: 8px; margin-bottom: 12px;">
        <h4 style="color: #831843; font-weight: 800;">${item.name}</h4>
        <p style="font-size: 0.82rem; color: #475569;">Pack Size: ${item.packSize} • Price: <strong>${item.price}</strong></p>
        <p style="font-size: 0.78rem; color: #dc2626; margin-top: 4px;">⚠️ Current bottle runs out in ~${item.daysLeft} days.</p>
      </div>
    `;
  }
  if (modal) modal.classList.remove('hidden');

  const confirmBtn = document.getElementById('confirmReorderBtn');
  if (confirmBtn) {
    confirmBtn.onclick = () => {
      playChime('refill');
      item.remainingDoses = 60;
      item.daysLeft = 30;
      item.pctLeft = 100;
      item.status = 'safe';
      if (modal) modal.classList.add('hidden');
      renderRefillRadar();
      showToast(`1-Tap Refill ordered for ${item.name}! Guaranteed zero-gap delivery.`, '📦');
    };
  }
};

function initRefillModals() {
  const closeBtn = document.getElementById('closeReorderModalBtn');
  const modal = document.getElementById('reorderModal');
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  }
}

// ==========================================================================
// TAB 5: Pairing & Layering Safety Checker
// ==========================================================================
function initPairingChecker() {
  const checkBtn = document.getElementById('checkPairingBtn');
  const selectA = document.getElementById('pairProductA');
  const selectB = document.getElementById('pairProductB');
  const verdictCard = document.getElementById('pairingVerdict');

  function evaluatePairing(a, b) {
    if (a === b) {
      return {
        status: 'caution',
        title: '⚠️ Duplicate Selection',
        rule: 'You selected the same product twice. Follow standard daily dosage indicated on your One Routine Card.',
        rationale: 'Double application does not accelerate results and may cause irritation or wastage.'
      };
    }

    const key1 = `${a}+${b}`;
    const key2 = `${b}+${a}`;
    const found = state.pairingRules[key1] || state.pairingRules[key2];

    if (found) return found;

    return {
      status: 'compatible',
      title: '✅ Safe Complementary Pair',
      rule: 'Both products have safe biochemical profiles and can be used in your weekly regimen.',
      rationale: 'Ensure proper interval: allow 15 minutes between topical products, and ingest gummies after food.'
    };
  }

  function displayVerdict(res) {
    if (!verdictCard) return;
    const isCompat = res.status === 'compatible';
    verdictCard.className = `pairing-verdict-card ${isCompat ? 'verdict-compatible' : 'verdict-caution'}`;
    verdictCard.innerHTML = `
      <div class="verdict-head">
        <span class="verdict-icon">${isCompat ? '✅' : '⚠️'}</span>
        <h3>${res.title}</h3>
      </div>
      <p class="verdict-rule"><strong>Clinical Rule:</strong> ${res.rule}</p>
      <p class="verdict-rationale"><strong>Underlying Insight:</strong> ${res.rationale}</p>
    `;
  }

  if (checkBtn && selectA && selectB) {
    checkBtn.addEventListener('click', () => {
      const res = evaluatePairing(selectA.value, selectB.value);
      displayVerdict(res);
      playChime('success');
    });

    // Run initial evaluation
    displayVerdict(evaluatePairing(selectA.value, selectB.value));
  }

  // Preset chips
  const presetChips = document.querySelectorAll('.preset-chip');
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const combo = chip.dataset.combo;
      if (combo === 'serum-gummies') {
        selectA.value = 'serum';
        selectB.value = 'gummies';
      } else if (combo === 'rollon-lotion') {
        selectA.value = 'rollon';
        selectB.value = 'lotion';
      } else if (combo === 'bodywash-sunscreen') {
        selectA.value = 'bodywash';
        selectB.value = 'sunscreen';
      } else if (combo === 'mask-serum') {
        selectA.value = 'mask';
        selectB.value = 'serum';
      }
      const res = evaluatePairing(selectA.value, selectB.value);
      displayVerdict(res);
    });
  });
}

// ==========================================================================
// TAB 7: Advisor in One Tap & Chat Simulation
// ==========================================================================
function initAdvisor() {
  const shareWhatsAppBtn = document.getElementById('shareWhatsAppBtn');
  const simulateDoctorChatBtn = document.getElementById('simulateDoctorChatBtn');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const sendChatBtn = document.getElementById('sendChatBtn');

  if (shareWhatsAppBtn) {
    shareWhatsAppBtn.addEventListener('click', () => {
      const text = encodeURIComponent("Hi Be Bodywise Doctor! Here is my auto-generated Rhythm Clinical Packet:\n- Adherence: 88%\n- Goal: Hair thinning & shedding control\n- Products: Biotin Gummies (AM) + Growth Serum (PM)\n- Notes: Ran out mid-month last month; occasional serum stickiness in humidity.\nLooking forward to your advice!");
      window.open(`https://api.whatsapp.com/send?phone=919058885170&text=${text}`, '_blank');
      showToast("WhatsApp triage packet generated with complete routine context!", "💬");
    });
  }

  if (simulateDoctorChatBtn) {
    simulateDoctorChatBtn.addEventListener('click', () => {
      if (chatInput) chatInput.focus();
    });
  }

  function sendUserMessage() {
    if (!chatInput || !chatMessages) return;
    const text = chatInput.value.trim();
    if (!text) return;

    // Append user message
    const uMsg = document.createElement('div');
    uMsg.className = 'msg user-msg';
    uMsg.textContent = text;
    chatMessages.appendChild(uMsg);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate Doctor response
    setTimeout(() => {
      const dMsg = document.createElement('div');
      dMsg.className = 'msg doc-msg';
      dMsg.textContent = "Great question! Because hair follicles have a 90-day biological regeneration cycle, small daily consistency makes a tremendous difference. Continue your habit anchor right after breakfast!";
      chatMessages.appendChild(dMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      playChime('success');
    }, 1200);
  }

  if (sendChatBtn) sendChatBtn.addEventListener('click', sendUserMessage);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendUserMessage();
    });
  }
}

// ==========================================================================
// Research Drawer & QR Scanner Modals
// ==========================================================================
function initModals() {
  const openResearchBtn = document.getElementById('openResearchBtn');
  const closeResearchBtn = document.getElementById('closeResearchBtn');
  const researchDrawer = document.getElementById('researchDrawer');

  if (openResearchBtn && researchDrawer) {
    openResearchBtn.addEventListener('click', () => researchDrawer.classList.remove('hidden'));
  }
  if (closeResearchBtn && researchDrawer) {
    closeResearchBtn.addEventListener('click', () => researchDrawer.classList.add('hidden'));
  }

  // Bottle QR scan
  const simulateQrBtn = document.getElementById('simulateQrBtn');
  const closeQrModalBtn = document.getElementById('closeQrModalBtn');
  const qrModal = document.getElementById('qrModal');
  const confirmScanSyncBtn = document.getElementById('confirmScanSyncBtn');

  if (simulateQrBtn && qrModal) {
    simulateQrBtn.addEventListener('click', () => qrModal.classList.remove('hidden'));
  }
  if (closeQrModalBtn && qrModal) {
    closeQrModalBtn.addEventListener('click', () => qrModal.classList.add('hidden'));
  }
  if (confirmScanSyncBtn && qrModal) {
    confirmScanSyncBtn.addEventListener('click', () => {
      qrModal.classList.add('hidden');
      playChime('success');
      showToast("Bottle QR verified! Added Advanced Hair Growth Serum to your One Routine Card.", "📱");
      switchTab('card');
    });
  }

  // Print Card
  const printCardBtn = document.getElementById('printCardBtn');
  if (printCardBtn) {
    printCardBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Student perks
  const verifyStudentBtn = document.getElementById('verifyStudentBtn');
  if (verifyStudentBtn) {
    verifyStudentBtn.addEventListener('click', () => {
      const email = prompt("Enter your college email address (.edu / .ac.in / college domain):", "nimish.sugla@university.ac.in");
      if (email) {
        showToast("Student verification complete! 20% discount unlocked on all Refill Radar orders.", "🎓");
      }
    });
  }

  const viewPerkTrackerBtn = document.getElementById('viewPerkTrackerBtn');
  if (viewPerkTrackerBtn) {
    viewPerkTrackerBtn.addEventListener('click', () => {
      alert("🎁 Consistency Punch Card:\n\n[✓] Month 1: Completed\n[✓] Month 2: Completed\n[✓] Month 3: Completed\n[ ] Month 4: In Progress\n[ ] Month 5: Locked\n\nReach Month 5 of consecutive routine consistency to claim your Free Travel Mini Kit!");
    });
  }
}

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  renderTodaySteps();
  initTodayActions();
  initModes();
  initRoutineBuilder();
  renderRefillRadar();
  initRefillModals();
  initPairingChecker();
  initAdvisor();
  initModals();
  updateScoreDisplay();
});
