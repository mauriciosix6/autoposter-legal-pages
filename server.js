const express = require("express");
const path = require("path");

console.log("SERVER AUTOPOSTER GG COM /desktop, /terms, /privacy E VERIFICACAO TIKTOK CARREGADO");

const app = express();

const APP_NAME = "Autoposter GG";
const LAST_UPDATED = "10/05/2026";
const TIKTOK_SITE_VERIFICATION_TEXT = "tiktok-developers-site-verification=tgHjEBEFHt1nSfmUEbVnprMiY7yCSX9L";

function sendTikTokVerification(req, res) {
  res
    .status(200)
    .type("text/plain; charset=utf-8")
    .send(TIKTOK_SITE_VERIFICATION_TEXT);
}

function normalizeOrigin(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const withProtocol = raw.startsWith("http://") || raw.startsWith("https://")
    ? raw
    : `https://${raw}`;
  return withProtocol.replace(/\/$/, "");
}

function getSiteOrigin(req) {
  // No hardcoded domain: Railway custom domain, Railway public domain, or request host.
  return normalizeOrigin(
    process.env.PUBLIC_BASE_URL ||
    process.env.OFFICIAL_SITE_ORIGIN ||
    process.env.RAILWAY_PUBLIC_DOMAIN ||
    (req ? `${req.protocol}://${req.get("host")}` : "")
  );
}

function getOfficialSiteUrl(req) {
  return `${getSiteOrigin(req)}/desktop`;
}

function getWebRedirectUri(req) {
  return `${getSiteOrigin(req)}/tiktok/callback`;
}

// Verificação TikTok - texto puro, sem HTML.
// Use a URL exata que o TikTok solicitar. A principal para Terms é:
// https://SEU-DOMINIO/terms/tiktok-developers-site-verification.txt
app.get("/tiktok-developers-site-verification.txt", sendTikTokVerification);
app.get("/tiktok-developers-site-verification", sendTikTokVerification);

app.get("/terms/tiktok-developers-site-verification.txt", sendTikTokVerification);
app.get("/terms/tiktok-developers-site-verification", sendTikTokVerification);

app.get("/privacy/tiktok-developers-site-verification.txt", sendTikTokVerification);
app.get("/privacy/tiktok-developers-site-verification", sendTikTokVerification);

app.get("/desktop/tiktok-developers-site-verification.txt", sendTikTokVerification);
app.get("/desktop/tiktok-developers-site-verification", sendTikTokVerification);

// Arquivos de verificação TikTok
app.use("/terms", express.static(path.join(__dirname, "public", "terms")));
app.use("/privacy", express.static(path.join(__dirname, "public", "privacy")));
app.use("/desktop", express.static(path.join(__dirname, "public", "desktop")));

app.get("/terms/:fileName", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "terms", req.params.fileName));
});

app.get("/privacy/:fileName", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "privacy", req.params.fileName));
});

app.get("/desktop/:fileName", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "desktop", req.params.fileName));
});

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function desktopPage(req) {
  const officialSiteUrl = getOfficialSiteUrl(req);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${APP_NAME} - Desktop Application</title>
  <style>
    * { box-sizing: border-box; }

    html { scroll-behavior: smooth; }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: Inter, Arial, Helvetica, sans-serif;
      background:
        radial-gradient(circle at 20% 8%, rgba(88, 73, 255, 0.18), transparent 34%),
        radial-gradient(circle at 78% 18%, rgba(0, 229, 155, 0.09), transparent 30%),
        linear-gradient(180deg, #11172f 0%, #050916 100%);
      color: #ffffff;
    }

    .page {
      width: min(1120px, calc(100% - 48px));
      margin: 0 auto;
      padding: 36px 0 122px;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 54px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 800;
      font-size: 18px;
    }

    .logo {
      width: 42px;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      font-weight: 900;
      background: linear-gradient(135deg, #6d5cff, #00e59b);
      box-shadow: 0 18px 40px rgba(0, 229, 155, 0.18);
    }

    .for { color: #b9c8ee; font-size: 14px; }

    .hero {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 64px;
      align-items: center;
    }

    .pill {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      padding: 7px 12px;
      border: 1px solid rgba(185, 200, 238, 0.25);
      border-radius: 999px;
      color: #dce6ff;
      font-size: 12px;
      margin-bottom: 22px;
      background: rgba(255, 255, 255, 0.03);
    }

    .pill b { color: #ffffff; }

    h1 {
      margin: 0;
      font-size: clamp(42px, 6vw, 64px);
      line-height: 1.08;
      letter-spacing: -2.2px;
      max-width: 680px;
    }

    .lead {
      margin: 20px 0 26px;
      max-width: 650px;
      color: #bdd0f7;
      font-size: 18px;
      line-height: 1.55;
    }

    .actions { display: flex; gap: 12px; align-items: center; margin-bottom: 18px; }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 48px;
      padding: 0 24px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      color: #ffffff;
      text-decoration: none;
      font-weight: 800;
      font-size: 14px;
    }

    .primary {
      background: linear-gradient(135deg, #654cff, #4a63ff);
      border: none;
      box-shadow: 0 18px 50px rgba(90, 76, 255, 0.32);
    }

    .secondary { background: rgba(255, 255, 255, 0.04); color: #b9c8ee; }

    .note { color: #b9c8ee; font-size: 14px; line-height: 1.55; }
    .note b { color: #ffffff; }

    .connect-card {
      border: 1px solid rgba(185, 200, 238, 0.16);
      background: rgba(5, 9, 22, 0.72);
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
    }

    .connect-card h2 { margin: 0 0 16px; font-size: 18px; }

    .scope-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 20px;
      color: #c4d5ff;
      font-size: 14px;
      margin: 8px 0;
    }

    .scope-row span:last-child { color: #ffffff; font-family: Consolas, monospace; }

    .connect-card p {
      margin: 16px 0 0;
      color: #ffffff;
      font-size: 14px;
      line-height: 1.5;
      font-weight: 700;
    }

    .public-pill {
      margin-top: 16px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: 1px solid rgba(185, 200, 238, 0.28);
      border-radius: 999px;
      padding: 7px 12px;
      font-size: 13px;
      color: #ffffff;
    }

    .dot { width: 7px; height: 7px; border-radius: 50%; background: #00ff78; }

    .cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 60px; }

    .card {
      min-height: 220px;
      padding: 22px 18px;
      border-radius: 16px;
      border: 1px solid rgba(185, 200, 238, 0.14);
      background: rgba(7, 12, 28, 0.72);
    }

    .card h3 { margin: 0 0 16px; font-size: 16px; }

    .card p {
      margin: 0;
      color: #d8e5ff;
      font-size: 14px;
      line-height: 1.55;
      font-weight: 600;
    }

    .section {
      margin-top: 56px;
      padding: 24px;
      border-radius: 18px;
      border: 1px solid rgba(185, 200, 238, 0.14);
      background: rgba(7, 12, 28, 0.55);
    }

    .section h2 { margin: 0 0 14px; font-size: 22px; }

    .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 18px; }

    .step {
      border: 1px solid rgba(185, 200, 238, 0.14);
      border-radius: 14px;
      padding: 14px;
      color: #d8e5ff;
      font-size: 14px;
      line-height: 1.45;
      background: rgba(255, 255, 255, 0.03);
    }

    .step b { color: #ffffff; }

    code {
      color: #ffffff;
      background: rgba(255,255,255,0.07);
      padding: 2px 6px;
      border-radius: 6px;
    }

    footer {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 14px 20px;
      border-top: 1px solid rgba(96, 125, 255, 0.28);
      background: rgba(3, 6, 16, 0.95);
      text-align: center;
      color: #b9c8ee;
      font-size: 13px;
      backdrop-filter: blur(12px);
    }

    footer a { color: #d8e5ff; text-decoration: none; margin: 0 8px; }
    footer a:hover { text-decoration: underline; }

    @media (max-width: 900px) {
      .hero { grid-template-columns: 1fr; gap: 28px; }
      .cards { grid-template-columns: 1fr 1fr; }
      .steps { grid-template-columns: 1fr; }
      header { align-items: flex-start; gap: 16px; flex-direction: column; }
    }

    @media (max-width: 560px) {
      .page { width: min(100% - 28px, 1120px); }
      .cards { grid-template-columns: 1fr; }
      .actions { flex-direction: column; align-items: stretch; }
    }
  </style>
</head>
<body>
  <main class="page">
    <header>
      <div class="brand">
        <div class="logo">GG</div>
        <div>${APP_NAME}</div>
      </div>
      <div class="for">For creators, agencies &amp; brands</div>
    </header>

    <section class="hero">
      <div>
        <div class="pill">NEW <b>Desktop app for short-form video publishing</b></div>
        <h1>Plan and publish short-form videos from one desktop app</h1>
        <p class="lead">
          ${APP_NAME} is a desktop application that helps creators, social media managers,
          and agencies manage videos, captions, queues, and publishing flows for connected
          social media accounts.
        </p>
        <div class="actions">
          <a class="btn primary" href="#how-it-works">See how it works</a>
          <a class="btn secondary" href="/privacy">Privacy Policy</a>
        </div>
        <p class="note">
          <b>Anyone with an authorized TikTok account</b> can connect TikTok through Login Kit
          and use the app with their own profile.
        </p>
      </div>

      <aside class="connect-card">
        <h2>What ${APP_NAME} connects to TikTok for</h2>
        <div class="scope-row"><div>Secure TikTok login</div><span>Login Kit</span></div>
        <div class="scope-row"><div>Identify authorized account</div><span>user.info.basic</span></div>
        <div class="scope-row"><div>Show profile videos</div><span>video.list</span></div>
        <div class="scope-row"><div>Upload prepared video</div><span>video.upload</span></div>
        <div class="scope-row"><div>Direct post flow</div><span>video.publish</span></div>
        <p>
          The desktop app shows a complete simplified review flow: Login Kit,
          local callback, token storage, video.list, upload status, and publish status
          so reviewers can see how each permission is used.
        </p>
        <div class="public-pill"><span class="dot"></span> Simplified test environment for TikTok review</div>
      </aside>
    </section>

    <section class="cards">
      <div class="card">
        <h3>Designed for creators</h3>
        <p>${APP_NAME} is built for creators, agencies, and brands that need a desktop workspace to organize short-form videos, captions, queues, and posting status.</p>
      </div>
      <div class="card">
        <h3>Secure TikTok sign-in</h3>
        <p>Users authenticate with TikTok Login Kit. The app receives authorization through a local desktop callback and stores the token locally for the selected profile.</p>
      </div>
      <div class="card">
        <h3>Upload &amp; publish demo</h3>
        <p>After login, the app demonstrates video.list, then guides the user through a prepared video upload and direct publishing flow using TikTok Content Posting API.</p>
      </div>
      <div class="card">
        <h3>Transparent permissions</h3>
        <p>${APP_NAME} requests only the TikTok scopes needed for the demo: user.info.basic, video.list, video.upload, and video.publish.</p>
      </div>
    </section>

    <section class="section" id="how-it-works">
      <h2>How the TikTok integration works</h2>
      <p class="note">
        This page supports a simplified desktop test environment for TikTok review.
        The same app name, <b>${APP_NAME}</b>, appears in the desktop app, website,
        Privacy Policy, and Terms of Service. The official desktop page URL is <code>${officialSiteUrl}</code>.
      </p>
      <div class="steps">
        <div class="step"><b>1. Open desktop app</b><br />The user opens ${APP_NAME} and selects a local profile.</div>
        <div class="step"><b>2. Connect TikTok</b><br />The app opens TikTok Login Kit authorization in the browser.</div>
        <div class="step"><b>3. Local callback</b><br />TikTok redirects to <code>http://127.0.0.1:8787/tiktok/callback</code> while the desktop app is running.</div>
        <div class="step"><b>4. Token storage</b><br />The token is saved locally inside the selected ${APP_NAME} profile folder.</div>
        <div class="step"><b>5. video.list</b><br />The app loads public videos from the authorized TikTok profile and displays cover and metrics.</div>
        <div class="step"><b>6. Upload &amp; publish</b><br />The app starts video.upload and video.publish for the prepared video and caption.</div>
      </div>
    </section>

    <section class="section">
      <h2>Desktop redirect URI</h2>
      <p class="note">
        ${APP_NAME} is a desktop application. During TikTok Login, the app temporarily starts
        a local callback server at <code>http://127.0.0.1:8787/tiktok/callback</code>.
        This callback only works while the desktop app is open and the user starts Login Kit.
      </p>
    </section>
  </main>

  <footer>
    ${APP_NAME} is an independent desktop tool that uses TikTok's official developer platform.
    <br />
    <a href="/terms">Terms of Service</a> |
    <a href="/privacy">Privacy Policy</a> |
    <a href="/desktop">Desktop Application</a>
  </footer>
</body>
</html>`;
}

function legalPage(title, subtitle, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: Inter, Arial, Helvetica, sans-serif;
      background:
        radial-gradient(circle at 20% 8%, rgba(88, 73, 255, 0.18), transparent 34%),
        radial-gradient(circle at 78% 18%, rgba(0, 229, 155, 0.09), transparent 30%),
        linear-gradient(180deg, #11172f 0%, #050916 100%);
      color: #ffffff;
      padding: 36px 18px 110px;
      line-height: 1.65;
    }
    main { width: min(920px, 100%); margin: 0 auto; }
    .brand { display: flex; align-items: center; gap: 12px; font-weight: 800; margin-bottom: 36px; }
    .logo { width: 42px; height: 42px; border-radius: 14px; display: grid; place-items: center; font-weight: 900; background: linear-gradient(135deg, #6d5cff, #00e59b); }
    .panel { border: 1px solid rgba(185, 200, 238, 0.16); background: rgba(5, 9, 22, 0.72); border-radius: 20px; padding: 34px; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25); }
    h1 { margin: 0 0 8px; font-size: clamp(32px, 5vw, 46px); letter-spacing: -1.4px; }
    h2 { margin: 30px 0 10px; font-size: 20px; color: #ffffff; }
    p, li { color: #d8e5ff; font-size: 15px; }
    .muted { color: #b9c8ee; }
    a { color: #d8e5ff; text-decoration: none; font-weight: 700; }
    a:hover { text-decoration: underline; }
    .nav { margin-top: 30px; padding-top: 18px; border-top: 1px solid rgba(185, 200, 238, 0.14); }
    .nav a { margin-right: 16px; }
    code { color: #ffffff; background: rgba(255,255,255,0.07); padding: 2px 6px; border-radius: 6px; }
    footer { position: fixed; left: 0; right: 0; bottom: 0; padding: 14px 20px; border-top: 1px solid rgba(96, 125, 255, 0.28); background: rgba(3, 6, 16, 0.95); text-align: center; color: #b9c8ee; font-size: 13px; }
    footer a { margin: 0 8px; }
  </style>
</head>
<body>
  <main>
    <div class="brand"><div class="logo">GG</div><div>${APP_NAME}</div></div>
    <section class="panel">
      <h1>${escapeHtml(title)}</h1>
      <p class="muted">${escapeHtml(subtitle)}</p>
      ${content}
      <div class="nav">
        <a href="/desktop">Desktop Application</a>
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
    </section>
  </main>
  <footer>
    ${APP_NAME} is an independent desktop tool that uses TikTok's official developer platform.
    <br />
    <a href="/terms">Terms of Service</a> |
    <a href="/privacy">Privacy Policy</a> |
    <a href="/desktop">Desktop Application</a>
  </footer>
</body>
</html>`;
}


function webCallbackPage(req) {
  const code = typeof req.query.code === "string" && req.query.code.trim() ? req.query.code.trim() : "received-after-authorization";
  const state = typeof req.query.state === "string" && req.query.state.trim() ? req.query.state.trim() : "not provided";
  const error = typeof req.query.error === "string" && req.query.error.trim() ? req.query.error.trim() : "";
  const errorDescription = typeof req.query.error_description === "string" && req.query.error_description.trim() ? req.query.error_description.trim() : "";

  const statusTitle = error ? "TikTok Authorization Error" : "TikTok Web Redirect Received";
  const statusText = error
    ? "TikTok returned an authorization error to the registered Web Redirect URI."
    : "TikTok redirected back to the registered Web Redirect URI successfully.";

  return legalPage(
    `${APP_NAME} - TikTok Web Redirect URI`,
    `Official HTTPS callback endpoint for TikTok Login Kit review`,
    `
      <p><b>${APP_NAME}</b> provides this HTTPS callback endpoint as the registered <b>Web Redirect URI</b> for TikTok Login Kit review.</p>
      <p>This route confirms that the application owns a public web callback URL that matches the official website and app name.</p>

      <h2>${escapeHtml(statusTitle)}</h2>
      <p>${escapeHtml(statusText)}</p>

      <h2>Callback details</h2>
      <p><b>Registered Web Redirect URI:</b> <code>${escapeHtml(getWebRedirectUri(req))}</code></p>
      <p><b>Authorization code:</b> <code>${escapeHtml(code ? "received" : "not received")}</code></p>
      <p><b>State:</b> <code>${escapeHtml(state)}</code></p>
      ${error ? `<p><b>Error:</b> <code>${escapeHtml(error)}</code></p>` : ""}
      ${errorDescription ? `<p><b>Error description:</b> ${escapeHtml(errorDescription)}</p>` : ""}

      <h2>Desktop application behavior</h2>
      <p><b>${APP_NAME}</b> is a desktop application. In the production desktop flow, the user starts TikTok Login Kit inside the desktop app, and the app receives the OAuth response through its local desktop callback while the app is running.</p>
      <p>The desktop callback used by the app is <code>http://127.0.0.1:8787/tiktok/callback</code>. This local address is not a public website; it only works on the user's own computer during the Login Kit flow.</p>

      <h2>TikTok scopes demonstrated</h2>
      <ul>
        <li><code>user.info.basic</code> — identifies the authorized TikTok account.</li>
        <li><code>video.list</code> — loads public videos from the authorized TikTok profile.</li>
        <li><code>video.upload</code> — starts the upload flow for a user-selected video.</li>
        <li><code>video.publish</code> — completes the Direct Post publishing flow.</li>
      </ul>

      <h2>Official pages</h2>
      <p><a href="/desktop">${APP_NAME} - Desktop Application</a></p>
      <p><a href="/privacy">Privacy Policy for ${APP_NAME}</a></p>
      <p><a href="/terms">Terms of Service for ${APP_NAME}</a></p>
    `
  );
}

app.get("/tiktok/callback", (req, res) => {
  res.type("html").send(webCallbackPage(req));
});

app.get("/", (req, res) => {
  res.redirect("/desktop");
});

app.get("/desktop", (req, res) => {
  res.type("html").send(desktopPage(req));
});

app.get("/terms", (req, res) => {
  res.type("html").send(legalPage(
    `Terms of Service for ${APP_NAME}`,
    `Last updated: ${LAST_UPDATED}`,
    `
      <p>These Terms of Service apply to the use of <b>${APP_NAME}</b>. The page title intentionally displays the application name exactly as <b>${APP_NAME}</b> for TikTok review.</p>
      <p><b>${APP_NAME}</b> is a desktop application for organizing, scheduling, and publishing videos selected by the user to connected social media accounts, including TikTok.</p>

      <h2>1. About the service</h2>
      <p>${APP_NAME} helps users manage local video folders, captions, posting queues, and publishing status for connected social platforms.</p>

      <h2>2. Permitted use</h2>
      <p>Users must only connect and publish to accounts they own or accounts they are authorized to manage.</p>

      <h2>3. User responsibility</h2>
      <p>The user is responsible for all videos, captions, hashtags, titles, descriptions, account selections, and publishing decisions made through the application.</p>

      <h2>4. TikTok integration</h2>
      <p>When a user connects TikTok, ${APP_NAME} may request official authorization through TikTok Login Kit and TikTok Content Posting API. The app uses granted permissions such as <code>user.info.basic</code>, <code>video.list</code>, <code>video.upload</code>, and <code>video.publish</code> only to perform actions authorized by the user.</p>

      <h2>5. Desktop callback</h2>
      <p>${APP_NAME} is a desktop app. During TikTok Login, the app temporarily starts a local callback at <code>http://127.0.0.1:8787/tiktok/callback</code>. This callback only works while the desktop application is open and the user starts the Login Kit flow.</p>

      <h2>6. User control</h2>
      <p>The user controls which profile is selected, which TikTok account is connected, which local video is prepared, which caption is used, and when the content is posted.</p>

      <h2>7. Limitations</h2>
      <p>${APP_NAME} does not guarantee views, followers, likes, monetization, reach, engagement, or commercial results.</p>

      <h2>8. Suspension or termination</h2>
      <p>Access to the service may be suspended in case of misuse, violation of these terms, or violation of connected platform rules.</p>

      <h2>9. Changes</h2>
      <p>We may update these Terms of Service periodically. Continued use of the service after changes means acceptance of the updated terms.</p>

      <h2>10. Contact</h2>
      <p>For questions about these terms, contact the administrator of ${APP_NAME}.</p>
    `
  ));
});

app.get("/privacy", (req, res) => {
  res.type("html").send(legalPage(
    `Privacy Policy for ${APP_NAME}`,
    `Last updated: ${LAST_UPDATED}`,
    `
      <p>This Privacy Policy explains how <b>${APP_NAME}</b> handles user data. The page title intentionally displays the application name exactly as <b>${APP_NAME}</b> for TikTok review.</p>
      <p><b>${APP_NAME}</b> collects and uses only the information needed for authentication, local video organization, scheduling, and publishing to platforms connected by the user.</p>

      <h2>1. Information collected</h2>
      <p>The application may store information required for operation, including local profile names, posting status, scheduling settings, local file paths, and authorization tokens for connected platforms.</p>

      <h2>2. How information is used</h2>
      <p>Information is used to authenticate users, organize posting workflows, upload selected videos, display operational status, and perform actions requested by the user.</p>

      <h2>3. TikTok data</h2>
      <p>When a user connects TikTok, ${APP_NAME} uses official authorization tokens only to perform actions authorized by the user, such as identifying the connected account with <code>user.info.basic</code>, loading public profile videos with <code>video.list</code>, uploading prepared videos with <code>video.upload</code>, and initiating Direct Post with <code>video.publish</code>.</p>

      <h2>4. User content</h2>
      <p>Videos, captions, titles, hashtags, and media files remain the responsibility of the user. ${APP_NAME} only organizes, processes, or sends those files according to the user's commands and scheduling settings.</p>

      <h2>5. Local storage</h2>
      <p>Some information may be stored locally on the user's computer, including sessions, tokens, configuration files, status history, and preferences. This data is used to keep accounts connected and to perform actions requested by the user.</p>

      <h2>6. Data sharing</h2>
      <p>We do not sell personal data. Data may be sent to connected platforms, such as TikTok or Instagram, only when necessary to perform actions requested by the user.</p>

      <h2>7. Security</h2>
      <p>Reasonable safeguards are used to protect information handled by the application, but no system is completely immune to failures, unauthorized access, or service interruptions.</p>

      <h2>8. Revoking access</h2>
      <p>Users may remove local tokens, disconnect accounts, or revoke permissions directly in the settings of connected platforms, including TikTok account settings.</p>

      <h2>9. Updates</h2>
      <p>This Privacy Policy may be updated periodically. The latest version will remain available on this page.</p>

      <h2>10. Contact</h2>
      <p>For privacy questions, contact the administrator of ${APP_NAME}.</p>
    `
  ));
});

app.use((req, res) => {
  console.log("ROTA NAO ENCONTRADA:", req.method, req.url);
  res.status(404).send("Rota nao encontrada: " + req.url);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`${APP_NAME} legal pages running on port ${port}`);
});
