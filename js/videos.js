/* ============================================================
   THE COLLABORATIVE — video access gate
   ------------------------------------------------------------
   HOW IT WORKS (and its limits — read this):
   Members pay through Mindbody, then you give them an access
   code. They enter it here to unlock the weekly video library.

   This is a CLIENT-SIDE gate. It keeps the casual visitor out
   and is easy for you to manage, but a determined person could
   read the code from the page source. Real protection comes
   from how the VIDEOS THEMSELVES are hosted:

     • Use Vimeo and set each video's privacy to "Hide from
       Vimeo" + "Domain-level privacy" (only your site can
       embed it). Then the embed URL is useless off-site.
     • Or use an unlisted YouTube link as a lighter option.

   When you outgrow this, swap to a real login (Mindbody API,
   Memberstack, or a Squarespace/Wix Member Area).
   ============================================================ */

/* ---- 1) Set your access code(s). Rotate these whenever you like. ---- */
const ACCESS_CODES = ['COLLAB2025', 'DANCE'];   // <-- edit me

/* ---- 2) Add a video each week. Newest first. ---------------------------
   embed: paste the Vimeo/YouTube *embed* URL (the one in the iframe src).
          Leave it empty ('') to show a styled placeholder card instead. */
const VIDEOS = [
  {
    week:  'Week of Jun 16',
    title: 'Advanced Technique — Across the Floor',
    note:  'Full center + traveling combo. Filmed live in studio.',
    embed: '', // e.g. 'https://player.vimeo.com/video/XXXXXXXXX'
  },
  {
    week:  'Week of Jun 9',
    title: 'Master Class — Contemporary',
    note:  'Guest choreographer feature. Phrase work + improv prompts.',
    embed: '',
  },
  {
    week:  'Week of Jun 2',
    title: 'Specialty — Turns & Control',
    note:  'Spotting drills, prep mechanics, and a turning combo.',
    embed: '',
  },
];

const UNLOCK_KEY = 'tc_videos_unlocked';

function renderLibrary() {
  const grid = document.getElementById('weeksGrid');
  if (!grid) return;
  grid.innerHTML = VIDEOS.map(v => {
    const media = v.embed
      ? `<iframe src="${v.embed}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`
      : `<div class="placeholder">${window.ICONS.film}<span>Video embed</span></div>
         <div class="video-card__play">${window.ICONS.play}</div>`;
    return `
      <article class="video-card reveal">
        <div class="video-card__thumb">${media}</div>
        <div class="video-card__body">
          <span class="video-card__week">${v.week}</span>
          <h3>${v.title}</h3>
          <p>${v.note}</p>
        </div>
      </article>`;
  }).join('');
}

function unlock() {
  document.getElementById('gate').style.display = 'none';
  const lib = document.getElementById('library');
  lib.classList.add('is-open');
  renderLibrary();
  lib.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), 80 * i));
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('gateForm');
  if (!form) return;

  // lock icon + already-unlocked check
  const lockSlot = document.getElementById('gateLock');
  if (lockSlot) lockSlot.innerHTML = window.ICONS.lock;
  const stateSlot = document.getElementById('lockState');
  if (stateSlot) stateSlot.innerHTML = window.ICONS.lock + ' Member access';

  if (sessionStorage.getItem(UNLOCK_KEY) === '1') unlock();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = document.getElementById('accessCode').value.trim().toUpperCase();
    const err = document.getElementById('gateError');
    if (ACCESS_CODES.map(c => c.toUpperCase()).includes(code)) {
      sessionStorage.setItem(UNLOCK_KEY, '1');
      err.textContent = '';
      unlock();
    } else {
      err.textContent = 'That code didn’t work. Check your confirmation email or contact us.';
    }
  });

  const signout = document.getElementById('signOut');
  if (signout) signout.addEventListener('click', () => {
    sessionStorage.removeItem(UNLOCK_KEY);
    location.reload();
  });
});
