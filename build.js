const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Group data by family
const families = {};
data.forEach(qt => {
    if (!families[qt.family]) families[qt.family] = [];
    families[qt.family].push(qt);
});

const baseHead = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LR Question Type Map — Sunlit Botanical Editorial — 5:4 Landscape</title>
<style>
  :root{
    /* Theme 03 — Sunlit Botanical Editorial */
    --denim:#344E73;
    --slate:#425C81;
    --haze:#556E91;
    --gold:#C9A149;
    --ochre:#9F7633;
    --petal:#7F501D;
    --soft-white:#F8F9F9;
    --canvas:#F7F8FA;
    --deep-ink:#0A1625;
    --body-ink:#26313F;
    --line:#DDE3EA;
    --paper:#FFFFFF;

    --page-w:10in;
    --page-h:8in;
    --safe-x:0.68in;
    --safe-y:0.56in;
  }

  *{box-sizing:border-box}
  html,body{margin:0;padding:0}

  body{
    background:#E8EDF2;
    color:var(--body-ink);
    font-family:"Inter", Helvetica, Arial, sans-serif;
  }

  .export-toolbar{
    position:sticky;
    top:0;
    z-index:50;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:16px;
    padding:10px 18px;
    background:var(--deep-ink);
    color:var(--soft-white);
    font-size:13px;
  }

  .export-toolbar strong{
    letter-spacing:.04em;
  }

  .export-toolbar button{
    border:0;
    border-bottom:3px solid var(--gold);
    border-radius:999px;
    padding:9px 15px;
    background:var(--denim);
    color:white;
    font:700 12px/1 "Inter", Helvetica, Arial, sans-serif;
    letter-spacing:.08em;
    text-transform:uppercase;
    cursor:pointer;
  }

  .document{
    width:max-content;
    margin:28px auto 56px;
  }

  .pdf-page{
    position:relative;
    width:var(--page-w);
    height:var(--page-h);
    margin:0 auto 24px;
    overflow:hidden;
    background:var(--paper);
    box-shadow:0 14px 36px rgba(10,22,37,.15);
    break-after:page;
    page-break-after:always;
  }

  /* Optional Theme 03 atmospheric layer. */
  .pdf-page.has-bloom::before{
    content:"";
    position:absolute;
    inset:0;
    pointer-events:none;
    background:
      radial-gradient(circle at 8% 92%,
        rgba(127,80,29,.16) 0%,
        rgba(159,118,51,.13) 14%,
        rgba(201,161,73,.11) 28%,
        rgba(85,110,145,.07) 43%,
        transparent 62%);
  }

  .pdf-page-content{
    position:absolute;
    inset:var(--safe-y) var(--safe-x) 0.68in;
    overflow:hidden;
  }

  .pdf-page-footer{
    position:absolute;
    left:var(--safe-x);
    right:var(--safe-x);
    bottom:0.24in;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:20px;
    padding-top:0.09in;
    border-top:1px solid var(--line);
    color:var(--haze);
    font-size:9pt;
  }

  .eyebrow{
    margin:0 0 10px;
    color:var(--ochre);
    font:700 9pt/1.2 "Outfit","Inter",Helvetica,Arial,sans-serif;
    letter-spacing:.18em;
    text-transform:uppercase;
  }

  h1,h2,h3{
    color:var(--deep-ink);
    font-family:"Fraunces", Georgia, "Times New Roman", serif;
  }

  h1{
    max-width:7.8in;
    margin:0 0 12px;
    font-size:31pt;
    line-height:1.02;
    letter-spacing:-.02em;
  }

  h2{
    margin:0 0 10px;
    font-size:24pt;
    color:var(--denim);
  }

  h3 {
    margin: 0 0 6px;
    font-size: 16pt;
    color: var(--deep-ink);
  }

  h1 em,h2 em,h3 em{
    color:var(--gold);
    font-style:italic;
  }

  .lede{
    max-width:7.6in;
    margin:0;
    color:var(--body-ink);
    font-size:13.5pt;
    line-height:1.55;
  }

  .gold-rule{
    width:2.4in;
    height:3px;
    margin:0.22in 0 0.28in;
    background:linear-gradient(90deg,var(--gold),transparent);
  }

  .label{
    display:block;
    margin-bottom:0.08in;
    color:var(--denim);
    font:700 8pt/1.2 "Outfit","Inter",Helvetica,Arial,sans-serif;
    letter-spacing:.16em;
    text-transform:uppercase;
  }

  @page{
    size:10in 8in;
    margin:0;
  }

  @media print{
    html,body{
      width:10in;
      margin:0 !important;
      padding:0 !important;
      background:#fff !important;
    }

    .export-toolbar{
      display:none !important;
    }

    .document{
      width:auto;
      margin:0;
    }

    .pdf-page{
      width:10in;
      height:8in;
      margin:0;
      box-shadow:none;
      break-after:page;
      page-break-after:always;
      -webkit-print-color-adjust:exact;
      print-color-adjust:exact;
    }

    .pdf-page:last-child{
      break-after:auto;
      page-break-after:auto;
    }
  }
`;

function generateVariant1() {
  let html = baseHead + `
  /* Variant 1 Specifics - Dense Reference Atlas */
  .v1-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.25in;
    height: 100%;
    align-content: start;
  }
  .v1-qt {
    border-top: 2px solid var(--denim);
    padding-top: 0.1in;
    margin-bottom: 0.2in;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .v1-type-title {
    font-size: 18pt;
    margin: 0 0 0.05in;
    color: var(--deep-ink);
  }
  .v1-def {
    font-size: 10pt;
    line-height: 1.4;
    margin-bottom: 0.1in;
    font-style: italic;
    color: var(--slate);
  }
  .v1-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.15in;
  }
  .v1-box {
    background: var(--soft-white);
    padding: 0.1in;
    border-left: 2px solid var(--gold);
  }
  .v1-box.template-lib {
    background: var(--canvas);
    border: 1px solid var(--line);
    border-left: 3px solid var(--ochre);
  }
  .v1-box ul { margin: 0; padding-left: 0.15in; font-size: 8pt; line-height: 1.3;}
  .v1-box li { margin-bottom: 0.05in; }
  .v1-label {
    font: 700 7pt/1 "Outfit", sans-serif;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--ochre);
    margin-bottom: 0.05in;
    display: block;
  }
  </style>
  </head>
  <body>
  <div class="export-toolbar">
    <strong>GT-Decade-Theme · Theme 03 · Sunlit Botanical Editorial</strong>
    <button type="button" onclick="window.print()">Print / Save as PDF</button>
  </div>
  <main class="document">
  `;

  let pageNum = 1;
  for (const [family, qTypes] of Object.entries(families)) {
    // We group 2-4 question types per page in this dense atlas
    for (let i = 0; i < qTypes.length; i += 4) {
      const chunk = qTypes.slice(i, i + 4);
      html += `
        <section class="pdf-page">
          <div class="pdf-page-content">
            <p class="eyebrow">Level 4A — Template Library · Dense Reference</p>
            <h2>Family: <em>${family}</em></h2>
            <div class="gold-rule"></div>
            <div class="v1-grid">
      `;

      chunk.forEach(qt => {
        html += `
          <div class="v1-qt">
            <h3 class="v1-type-title">${qt.type}</h3>
            <p class="v1-def">${qt.definition}</p>
            <div class="v1-cols">
              <div class="v1-box">
                <span class="v1-label">The Method</span>
                <ul>${qt.steps.map(s => `<li>${s}</li>`).join('')}</ul>
                <span class="v1-label" style="margin-top: 0.1in;">Stem</span>
                <ul style="font-style:italic; color:var(--haze);">${qt.stem_examples.map(s => `<li>${s}</li>`).join('')}</ul>
              </div>
              <div class="v1-box template-lib">
                <span class="v1-label">Template Library</span>
                <ul>${qt.templates.map(s => `<li><strong>${s.split(':')[0]}</strong>${s.includes(':') ? ':' + s.split(':')[1] : ''}</li>`).join('')}</ul>
              </div>
            </div>
          </div>
        `;
      });

      html += `
            </div>
          </div>
          <footer class="pdf-page-footer">
            <span>Sunlit Botanical Editorial · Theme 03</span>
            <span>${pageNum++}</span>
          </footer>
        </section>
      `;
    }
  }

  html += `</main></body></html>`;
  fs.writeFileSync('variant-1.html', html);
}

function generateVariant2() {
  let html = baseHead + `
  /* Variant 2 Specifics - Spacious Study Guide */
  .v2-family-header {
    text-align: center;
    padding-top: 1in;
  }
  .v2-qt-container {
    display: flex;
    flex-direction: column;
    gap: 0.2in;
    height: 100%;
  }
  .v2-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid var(--line);
    padding-bottom: 0.1in;
  }
  .v2-content-bands {
    display: flex;
    flex-direction: column;
    gap: 0.15in;
  }
  .v2-band {
    display: flex;
    gap: 0.3in;
    align-items: flex-start;
  }
  .v2-band-title {
    width: 1.5in;
    flex-shrink: 0;
    text-align: right;
    font: 700 9pt/1.2 "Outfit", sans-serif;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--slate);
    padding-top: 0.05in;
  }
  .v2-band-content {
    flex-grow: 1;
    font-size: 11pt;
    line-height: 1.6;
  }
  .v2-template-cards {
    display: flex;
    gap: 0.15in;
    margin-top: 0.1in;
  }
  .v2-card {
    flex: 1;
    background: white;
    border: 1px solid var(--gold);
    border-radius: 8px;
    padding: 0.15in;
    box-shadow: 0 4px 12px rgba(201,161,73,0.1);
    border-top: 4px solid var(--denim);
  }
  .v2-card-title {
    font-family: "Fraunces", serif;
    font-size: 12pt;
    color: var(--deep-ink);
    margin: 0 0 0.05in;
  }
  .v2-card-desc {
    font-size: 9pt;
    color: var(--body-ink);
    margin: 0;
  }
  </style>
  </head>
  <body>
  <div class="export-toolbar">
    <strong>GT-Decade-Theme · Theme 03 · Sunlit Botanical Editorial</strong>
    <button type="button" onclick="window.print()">Print / Save as PDF</button>
  </div>
  <main class="document">
  `;

  let pageNum = 1;
  for (const [family, qTypes] of Object.entries(families)) {
    // One title page per family
    html += `
      <section class="pdf-page has-bloom">
        <div class="pdf-page-content v2-family-header">
          <p class="eyebrow">Level 4A — Template Library</p>
          <h1 style="margin: 0 auto;">${family}</h1>
          <div class="gold-rule" style="margin: 0.3in auto;"></div>
          <p class="lede" style="margin: 0 auto; text-align: center;">Spacious Study Guide Format</p>
        </div>
      </section>
    `;

    // One question type per page
    qTypes.forEach(qt => {
      html += `
        <section class="pdf-page">
          <div class="pdf-page-content v2-qt-container">
            <div class="v2-header">
              <h2 style="margin:0; font-size:28pt; color:var(--deep-ink);">${qt.type}</h2>
              <span class="eyebrow">${qt.family}</span>
            </div>

            <div class="v2-content-bands">
              <div class="v2-band">
                <div class="v2-band-title">The Task</div>
                <div class="v2-band-content">${qt.definition}</div>
              </div>

              <div class="v2-band">
                <div class="v2-band-title">Stem Recognition</div>
                <div class="v2-band-content" style="color:var(--slate); font-style:italic;">
                  ${qt.stem_examples.join('<br>')}
                </div>
              </div>

              <div class="v2-band">
                <div class="v2-band-title">The Method</div>
                <div class="v2-band-content">
                  ${qt.steps.join('<br>')}
                </div>
              </div>

              <div class="v2-band" style="margin-top: 0.2in;">
                <div class="v2-band-title" style="color:var(--ochre);">Template Library</div>
                <div class="v2-band-content">
                  <div class="v2-template-cards">
                    ${qt.templates.map(t => {
                      const parts = t.split(':');
                      const title = parts[0];
                      const desc = parts.slice(1).join(':').trim() || '';
                      return `
                        <div class="v2-card">
                          <h4 class="v2-card-title">${title}</h4>
                          ${desc ? `<p class="v2-card-desc">${desc}</p>` : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class="pdf-page-footer">
            <span>Sunlit Botanical Editorial · Theme 03</span>
            <span>${pageNum++}</span>
          </footer>
        </section>
      `;
    });
  }
  html += `</main></body></html>`;
  fs.writeFileSync('variant-2.html', html);
}

function generateVariant3() {
  let html = baseHead + `
  /* Variant 3 Specifics - Marginalia */
  .v3-layout {
    display: flex;
    height: 100%;
    gap: 0.4in;
  }
  .v3-main-col {
    flex: 2;
    padding-right: 0.4in;
    border-right: 1px solid var(--line);
  }
  .v3-margin-col {
    flex: 1.2;
    background: var(--canvas);
    padding: 0.2in;
    border-radius: 12px;
  }
  .v3-title {
    font-size: 32pt;
    margin-bottom: 0.1in;
    color: var(--deep-ink);
  }
  .v3-def {
    font-size: 14pt;
    line-height: 1.5;
    margin-bottom: 0.3in;
    color: var(--body-ink);
  }
  .v3-section {
    margin-bottom: 0.25in;
  }
  .v3-section-title {
    font-family: "Outfit", sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-size: 9pt;
    color: var(--denim);
    border-bottom: 2px solid var(--gold);
    padding-bottom: 0.05in;
    margin-bottom: 0.1in;
    display: inline-block;
  }
  .v3-steps {
    font-size: 11pt;
    line-height: 1.8;
  }
  .v3-margin-title {
    font-family: "Fraunces", serif;
    font-size: 18pt;
    color: var(--ochre);
    margin-bottom: 0.2in;
  }
  .v3-template-item {
    margin-bottom: 0.2in;
    padding-bottom: 0.15in;
    border-bottom: 1px dashed var(--line);
  }
  .v3-template-item:last-child { border-bottom: none; }
  .v3-template-name {
    font-weight: bold;
    color: var(--denim);
    font-size: 10.5pt;
    display: block;
    margin-bottom: 0.05in;
  }
  .v3-template-desc {
    font-size: 9pt;
    line-height: 1.4;
    color: var(--slate);
    margin: 0;
  }
  </style>
  </head>
  <body>
  <div class="export-toolbar">
    <strong>GT-Decade-Theme · Theme 03 · Sunlit Botanical Editorial</strong>
    <button type="button" onclick="window.print()">Print / Save as PDF</button>
  </div>
  <main class="document">
  `;

  let pageNum = 1;
  // Combine 2 questions per page vertically in this marginalia layout if possible, or just 1.
  // Actually, 1 per page works well for marginalia to give it space.
  for (const [family, qTypes] of Object.entries(families)) {
    qTypes.forEach(qt => {
      html += `
        <section class="pdf-page">
          <div class="pdf-page-content v3-layout">
            <div class="v3-main-col">
              <p class="eyebrow" style="color: var(--haze);">${qt.family}</p>
              <h1 class="v3-title">${qt.type}</h1>
              <p class="v3-def">${qt.definition}</p>

              <div class="v3-section">
                <span class="v3-section-title">The Method</span>
                <div class="v3-steps">
                  ${qt.steps.join('<br><br>')}
                </div>
              </div>

              <div class="v3-section">
                <span class="v3-section-title">Stem Recognition</span>
                <div class="v3-steps" style="font-style: italic; color: var(--slate);">
                  ${qt.stem_examples.join('<br>')}
                </div>
              </div>
            </div>

            <div class="v3-margin-col">
              <div class="v3-margin-title">Template Library</div>
              ${qt.templates.map(t => {
                const parts = t.split(':');
                const title = parts[0];
                const desc = parts.slice(1).join(':').trim() || '';
                return `
                  <div class="v3-template-item">
                    <span class="v3-template-name">${title}</span>
                    ${desc ? `<p class="v3-template-desc">${desc}</p>` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          <footer class="pdf-page-footer">
            <span>Sunlit Botanical Editorial · Theme 03</span>
            <span>${pageNum++}</span>
          </footer>
        </section>
      `;
    });
  }

  html += `</main></body></html>`;
  fs.writeFileSync('variant-3.html', html);
}

generateVariant1();
generateVariant2();
generateVariant3();
console.log('Generated variant-1.html, variant-2.html, variant-3.html');
