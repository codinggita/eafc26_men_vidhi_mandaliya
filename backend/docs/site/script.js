// ----------------------------------------------------
// Core JS Engine for EAFC 26 Player Analytics Documentation
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const themeToggleBtn = document.getElementById("theme-toggle");
  const searchInput = document.getElementById("search-input");
  const baseUrlInput = document.getElementById("base-url-input");
  const dynamicNavGroups = document.getElementById("dynamic-nav-groups");
  const dynamicRouteDetails = document.getElementById("dynamic-route-details");
  
  const statCountAll = document.getElementById("stat-count-all");
  const statCountGet = document.getElementById("stat-count-get");
  const statCountPost = document.getElementById("stat-count-post");
  const statCountOther = document.getElementById("stat-count-other");

  // Init Theme
  initTheme();
  
  // Render Dynamic Navigation and Content
  renderDocs();

  // Bind Download Handles
  document.getElementById("btn-download-openapi").addEventListener("click", () => {
    triggerDownload("openapi.json", "openapi.json");
  });
  document.getElementById("btn-download-postman").addEventListener("click", () => {
    triggerDownload("postman_collection.json", "postman_collection.json");
  });

  // Theme Toggle Binding
  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    document.documentElement.classList.toggle("light", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Search Input Binding
  searchInput.addEventListener("input", (e) => {
    filterRoutes(e.target.value.trim().toLowerCase());
  });

  // Dynamic Content Navigation Scroll Binding
  setupNavigationScroll();

  // ----------------------------------------------------
  // Render Function
  // ----------------------------------------------------
  function renderDocs() {
    if (typeof ROUTES_CATALOG === "undefined") {
      console.error("ROUTES_CATALOG is not defined! Check routes_data.js inclusion.");
      return;
    }

    // Update stats counters
    const getCount = ROUTES_CATALOG.filter(r => r.method === "GET").length;
    const postCount = ROUTES_CATALOG.filter(r => r.method === "POST").length;
    statCountAll.innerText = ROUTES_CATALOG.length;
    statCountGet.innerText = getCount;
    statCountPost.innerText = postCount;
    statCountOther.innerText = ROUTES_CATALOG.length - getCount - postCount;

    // Group routes by category
    const grouped = {};
    ROUTES_CATALOG.forEach((route, index) => {
      route.id = `route-${index}`; // Assign a unique ID
      if (!grouped[route.group]) {
        grouped[route.group] = [];
      }
      grouped[route.group].push(route);
    });

    let navHtml = "";
    let contentHtml = "";

    Object.keys(grouped).forEach((groupName, grpIndex) => {
      const groupRoutes = grouped[groupName];
      const groupSlug = groupName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      // Sidebar Group
      navHtml += `
        <div class="nav-group">
          <div class="nav-group-title">
            <i class="fa-solid fa-folder-open"></i> ${groupName}
          </div>
          <div class="nav-group-items">
      `;

      groupRoutes.forEach((route) => {
        navHtml += `
          <a href="#${route.id}" class="nav-item" data-route-id="${route.id}">
            <span>${route.name}</span>
            <span class="nav-item-method ${route.method.toLowerCase()}">${route.method}</span>
          </a>
        `;
      });

      navHtml += `
          </div>
        </div>
      `;

      // Main Content Group Section
      contentHtml += `
        <section id="group-${groupSlug}" class="group-section">
          <div class="section-header">
            <span class="pre-title">API Group</span>
            <h2>${groupName}</h2>
          </div>
      `;

      groupRoutes.forEach((route) => {
        contentHtml += generateRouteDocHtml(route);
      });

      contentHtml += `</section>`;
    });

    dynamicNavGroups.innerHTML = navHtml;
    dynamicRouteDetails.innerHTML = contentHtml;

    // Bind Event Listeners inside Dynamic Content
    ROUTES_CATALOG.forEach((route) => {
      bindRoutePlaygroundEvents(route);
    });
  }

  // ----------------------------------------------------
  // HTML Generator for a Single Route
  // ----------------------------------------------------
  function generateRouteDocHtml(route) {
    const isGet = route.method === "GET";
    const bodyRequired = !isGet && route.requestBody;

    // Build params rows
    let paramsRows = "";
    if (route.params) {
      route.params.forEach(p => {
        paramsRows += `
          <tr>
            <td><code>:${p.name}</code></td>
            <td>Path Parameter</td>
            <td><span class="badge badge-danger">Required</span></td>
            <td><code>${p.type}</code></td>
            <td>${p.description}</td>
          </tr>
        `;
      });
    }
    if (route.queryParams) {
      route.queryParams.forEach(q => {
        paramsRows += `
          <tr>
            <td><code>${q.name}</code></td>
            <td>Query Parameter</td>
            <td>${q.required ? '<span class="badge badge-danger">Required</span>' : '<span class="badge badge-success">Optional</span>'}</td>
            <td><code>${q.type}</code></td>
            <td>${q.description} ${q.default !== undefined ? `(Default: ${q.default})` : ""}</td>
          </tr>
        `;
      });
    }

    const paramsTable = paramsRows ? `
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Source</th>
              <th>Status</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${paramsRows}
          </tbody>
        </table>
      </div>
    ` : `<p class="text-muted" style="font-size: 13px;">No parameters required for this endpoint.</p>`;

    // Build Try-It-Out Inputs
    let playgroundInputsHtml = "";
    
    // Path parameter inputs
    if (route.params) {
      playgroundInputsHtml += `
        <div class="playground-section">
          <div class="playground-title">Path Parameters</div>
      `;
      route.params.forEach(p => {
        let defaultVal = "";
        if (p.name === "id") defaultVal = "231747";
        if (p.name === "name") defaultVal = "Salah";
        if (p.name === "team") defaultVal = "Real Madrid";
        if (p.name === "league") defaultVal = "Premier League";
        if (p.name === "nation") defaultVal = "France";
        if (p.name === "position") defaultVal = "ST";
        if (p.name === "age") defaultVal = "26";
        if (p.name === "gender") defaultVal = "Men";
        if (p.name === "style") defaultVal = "Rapid";
        if (p.name === "foot") defaultVal = "Left";
        if (p.name === "rank") defaultVal = "1";
        
        playgroundInputsHtml += `
          <div class="playground-field">
            <label for="input-${route.id}-param-${p.name}">${p.name} (${p.description})</label>
            <input type="text" id="input-${route.id}-param-${p.name}" class="playground-input path-param-input" data-param-name="${p.name}" value="${defaultVal}">
          </div>
        `;
      });
      playgroundInputsHtml += `</div>`;
    }

    // Query parameter inputs
    if (route.queryParams) {
      playgroundInputsHtml += `
        <div class="playground-section">
          <div class="playground-title">Query Parameters</div>
      `;
      route.queryParams.forEach(q => {
        let val = q.default !== undefined ? q.default : "";
        if (q.name === "q") val = "salah";
        playgroundInputsHtml += `
          <div class="playground-field">
            <label for="input-${route.id}-query-${q.name}">${q.name} (${q.description})</label>
            <input type="text" id="input-${route.id}-query-${q.name}" class="playground-input query-param-input" data-query-name="${q.name}" value="${val}">
          </div>
        `;
      });
      playgroundInputsHtml += `</div>`;
    }

    // Auth Header inputs
    if (route.auth) {
      playgroundInputsHtml += `
        <div class="playground-section">
          <div class="playground-title">Security Headers</div>
          <div class="playground-field">
            <label for="input-${route.id}-header-auth">Authorization (JWT Bearer Token)</label>
            <input type="text" id="input-${route.id}-header-auth" class="playground-input header-input" data-header-name="Authorization" value="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_token_data">
          </div>
        </div>
      `;
    }

    // Body parameter inputs
    if (bodyRequired) {
      playgroundInputsHtml += `
        <div class="playground-section">
          <div class="playground-title">Request Body (JSON)</div>
          <div class="playground-field">
            <textarea id="input-${route.id}-body" class="playground-input body-input" rows="6" style="width: 100%; font-family: var(--font-mono); resize: vertical;">${JSON.stringify(route.requestBody, null, 2)}</textarea>
          </div>
        </div>
      `;
    }

    // Complete HTML block
    return `
      <section id="${route.id}" class="doc-section route-section" style="margin-bottom: 80px; padding-top: 40px;">
        <div class="route-grid">
          
          <!-- Left: Information Column -->
          <div class="route-info-pane">
            <div class="endpoint-header">
              <span class="verb-badge ${route.method.toLowerCase()}">${route.method}</span>
              <span class="endpoint-path">${route.path}</span>
              ${route.auth ? '<span class="security-badge"><i class="fa-solid fa-lock"></i> Protected</span>' : ""}
            </div>
            
            <h3 style="margin-top: 0;">${route.name}</h3>
            <p>${route.description}</p>

            <h4>Request Parameters</h4>
            ${paramsTable}

            <h4>Response Structure</h4>
            <p style="font-size: 13px;">Returns a standard application JSON response payload matching details below:</p>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Status Code</th>
                    <th>Response Data Format</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span class="badge badge-success">200 / 201 OK</span></td>
                    <td>Success JSON object carrying database matches inside the data key.</td>
                  </tr>
                  <tr>
                    <td><span class="badge badge-danger">4xx / 5xx</span></td>
                    <td>Error JSON object carrying success: false and the detailed error message.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Right: Playground and Snippets -->
          <div class="route-interactive-pane">
            <div class="pane-tabs">
              <button class="tab-btn active" data-tab="playground" data-route-id="${route.id}">Playground</button>
              <button class="tab-btn" data-tab="curl" data-route-id="${route.id}">cURL</button>
              <button class="tab-btn" data-tab="axios" data-route-id="${route.id}">Axios</button>
              <button class="tab-btn" data-tab="fetch" data-route-id="${route.id}">Fetch</button>
              <button class="tab-btn" data-tab="response" id="tab-btn-${route.id}-response" data-route-id="${route.id}" style="display: none;">Response</button>
            </div>

            <div class="tab-content-wrapper">
              
              <!-- Playground Panel -->
              <div class="tab-panel active-panel" id="panel-${route.id}-playground">
                ${playgroundInputsHtml}
                
                <div class="playground-actions">
                  <div class="toggle-switch-container">
                    <label class="toggle-switch">
                      <input type="checkbox" id="toggle-${route.id}-mock" checked>
                      <span class="toggle-slider"></span>
                    </label>
                    <span class="toggle-switch-label">Mock Mode</span>
                  </div>
                  <button class="btn btn-primary btn-send-request" data-route-id="${route.id}">
                    <i class="fa-solid fa-paper-plane"></i> Send Request
                  </button>
                </div>
              </div>

              <!-- cURL Panel -->
              <div class="tab-panel" id="panel-${route.id}-curl">
                <div class="code-block-header">
                  <span>cURL Command Line</span>
                  <button class="btn-copy-code" data-target="code-${route.id}-curl"><i class="fa-regular fa-copy"></i> Copy</button>
                </div>
                <pre><code id="code-${route.id}-curl" class="language-bash"></code></pre>
              </div>

              <!-- Axios Panel -->
              <div class="tab-panel" id="panel-${route.id}-axios">
                <div class="code-block-header">
                  <span>Javascript (Axios)</span>
                  <button class="btn-copy-code" data-target="code-${route.id}-axios"><i class="fa-regular fa-copy"></i> Copy</button>
                </div>
                <pre><code id="code-${route.id}-axios" class="language-js"></code></pre>
              </div>

              <!-- Fetch Panel -->
              <div class="tab-panel" id="panel-${route.id}-fetch">
                <div class="code-block-header">
                  <span>Javascript (Fetch)</span>
                  <button class="btn-copy-code" data-target="code-${route.id}-fetch"><i class="fa-regular fa-copy"></i> Copy</button>
                </div>
                <pre><code id="code-${route.id}-fetch" class="language-js"></code></pre>
              </div>

              <!-- Response Panel -->
              <div class="tab-panel" id="panel-${route.id}-response">
                <div class="code-block-header">
                  <span id="response-status-${route.id}">Response Status</span>
                  <button class="btn-copy-code" data-target="code-${route.id}-response"><i class="fa-regular fa-copy"></i> Copy</button>
                </div>
                <pre><code id="code-${route.id}-response" class="language-json"></code></pre>
              </div>

            </div>
          </div>

        </div>
      </section>
    `;
  }

  // ----------------------------------------------------
  // Bind Playground & Code Update Events
  // ----------------------------------------------------
  function bindRoutePlaygroundEvents(route) {
    const section = document.getElementById(route.id);
    if (!section) return;

    // Tab buttons switching
    const tabBtns = section.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        switchTab(route.id, targetTab);
      });
    });

    // Inputs listeners for code dynamic updates
    const inputs = section.querySelectorAll(".playground-input");
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        updateCodeSnippets(route);
      });
    });

    // Code copy buttons
    const copyBtns = section.querySelectorAll(".btn-copy-code");
    copyBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const codeElement = document.getElementById(targetId);
        if (codeElement) {
          navigator.clipboard.writeText(codeElement.innerText).then(() => {
            const originalHtml = btn.innerHTML;
            btn.innerHTML = `<i class="fa-solid fa-check" style="color: #34d399;"></i> Copied!`;
            setTimeout(() => {
              btn.innerHTML = originalHtml;
            }, 2000);
          });
        }
      });
    });

    // Run request trigger
    const sendBtn = section.querySelector(".btn-send-request");
    sendBtn.addEventListener("click", () => {
      executePlaygroundRequest(route);
    });

    // Generate initial snippets
    updateCodeSnippets(route);
  }

  // ----------------------------------------------------
  // Tab Switcher
  // ----------------------------------------------------
  function switchTab(routeId, tabName) {
    const section = document.getElementById(routeId);
    if (!section) return;

    // Toggle active tab buttons
    const tabBtns = section.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
    });

    // Toggle active panel
    const panels = section.querySelectorAll(".tab-panel");
    panels.forEach(p => {
      p.classList.toggle("active-panel", p.id === `panel-${routeId}-${tabName}`);
    });
  }

  // ----------------------------------------------------
  // Code Snippets Updater
  // ----------------------------------------------------
  function updateCodeSnippets(route) {
    const hostUrl = baseUrlInput.value.trim().replace(/\/$/, "");
    const values = getRouteInputValues(route);
    const fullUrl = buildRequestUrl(hostUrl, route.path, values.params, values.query);

    // Header configurations
    const headers = {};
    if (route.auth) {
      headers["Authorization"] = values.headers["Authorization"] || "Bearer <token>";
    }
    if (route.method !== "GET" && route.requestBody) {
      headers["Content-Type"] = "application/json";
    }

    // 1. Generate cURL
    let curl = `curl -X ${route.method} "${fullUrl}"`;
    Object.keys(headers).forEach(k => {
      curl += ` \\\n  -H "${k}: ${headers[k]}"`;
    });
    if (values.body) {
      curl += ` \\\n  -d '${JSON.stringify(values.body, null, 2)}'`;
    }
    document.getElementById(`code-${route.id}-curl`).innerText = curl;

    // 2. Generate Axios
    let axiosSnippet = "import axios from 'axios';\n\n";
    const axiosConfig = {};
    if (Object.keys(headers).length > 0) {
      axiosConfig.headers = headers;
    }

    if (route.method === "GET") {
      if (axiosConfig.headers) {
        axiosSnippet += `axios.get('${fullUrl}', ${JSON.stringify(axiosConfig, null, 2)})\n`;
      } else {
        axiosSnippet += `axios.get('${fullUrl}')\n`;
      }
    } else {
      const bodyStr = values.body ? JSON.stringify(values.body, null, 2) : "{}";
      if (axiosConfig.headers) {
        axiosSnippet += `axios.${route.method.toLowerCase()}('${fullUrl}', ${bodyStr}, ${JSON.stringify(axiosConfig, null, 2)})\n`;
      } else {
        axiosSnippet += `axios.${route.method.toLowerCase()}('${fullUrl}', ${bodyStr})\n`;
      }
    }
    axiosSnippet += `  .then(response => console.log(response.data))\n  .catch(error => console.error(error));`;
    document.getElementById(`code-${route.id}-axios`).innerText = axiosSnippet;

    // 3. Generate Fetch
    let fetchSnippet = `fetch('${fullUrl}', {\n  method: '${route.method}'`;
    if (Object.keys(headers).length > 0) {
      fetchSnippet += `,\n  headers: ${JSON.stringify(headers, null, 4).replace(/\n/g, "\n  ")}`;
    }
    if (values.body) {
      fetchSnippet += `,\n  body: JSON.stringify(${JSON.stringify(values.body, null, 4).replace(/\n/g, "\n  ")})`;
    }
    fetchSnippet += `\n})\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`;
    document.getElementById(`code-${route.id}-fetch`).innerText = fetchSnippet;
  }

  // ----------------------------------------------------
  // Fetch values from fields
  // ----------------------------------------------------
  function getRouteInputValues(route) {
    const section = document.getElementById(route.id);
    const params = {};
    const query = {};
    const headers = {};
    let body = null;

    if (!section) return { params, query, headers, body };

    // Path params
    section.querySelectorAll(".path-param-input").forEach(input => {
      params[input.getAttribute("data-param-name")] = input.value.trim();
    });

    // Query params
    section.querySelectorAll(".query-param-input").forEach(input => {
      const qVal = input.value.trim();
      if (qVal !== "") {
        query[input.getAttribute("data-query-name")] = qVal;
      }
    });

    // Headers
    section.querySelectorAll(".header-input").forEach(input => {
      headers[input.getAttribute("data-header-name")] = input.value.trim();
    });

    // Body
    const bodyArea = section.querySelector(".body-input");
    if (bodyArea) {
      try {
        body = JSON.parse(bodyArea.value);
      } catch (e) {
        // Fallback if bad JSON is typed
        body = bodyArea.value;
      }
    }

    return { params, query, headers, body };
  }

  // ----------------------------------------------------
  // Request URL Builder
  // ----------------------------------------------------
  function buildRequestUrl(host, routePath, params, query) {
    let resultPath = routePath;
    // Substitute path params
    Object.keys(params).forEach(k => {
      resultPath = resultPath.replace(`:${k}`, encodeURIComponent(params[k]));
    });

    const urlObj = new URL(host + resultPath);
    // Append query params
    Object.keys(query).forEach(k => {
      urlObj.searchParams.append(k, query[k]);
    });

    return urlObj.toString();
  }

  // ----------------------------------------------------
  // Execute Try-It-Out Requests
  // ----------------------------------------------------
  function executePlaygroundRequest(route) {
    const isMock = document.getElementById(`toggle-${route.id}-mock`).checked;
    const responseTabBtn = document.getElementById(`tab-btn-${route.id}-response`);
    const statusText = document.getElementById(`response-status-${route.id}`);
    const codeArea = document.getElementById(`code-${route.id}-response`);

    // Reset view
    responseTabBtn.style.display = "block";
    switchTab(route.id, "response");
    statusText.innerText = "Loading response...";
    codeArea.innerHTML = '<span class="json-string">Sending request, please wait...</span>';

    if (isMock) {
      // Return documented mock response immediately after a brief micro-delay
      setTimeout(() => {
        statusText.innerHTML = `Response Status: <span class="badge badge-success">200 OK (MOCK)</span>`;
        codeArea.innerHTML = highlightJson(route.response);
      }, 400);
      return;
    }

    // Real Execution
    const hostUrl = baseUrlInput.value.trim().replace(/\/$/, "");
    const values = getRouteInputValues(route);
    const finalUrl = buildRequestUrl(hostUrl, route.path, values.params, values.query);

    const fetchConfig = {
      method: route.method,
      headers: {}
    };

    if (route.auth) {
      fetchConfig.headers["Authorization"] = values.headers["Authorization"];
    }
    if (route.method !== "GET" && values.body) {
      fetchConfig.headers["Content-Type"] = "application/json";
      fetchConfig.body = JSON.stringify(values.body);
    }

    fetch(finalUrl, fetchConfig)
      .then(async (res) => {
        const isOk = res.ok;
        const status = res.status;
        const statusTextStr = res.statusText || (isOk ? "OK" : "Error");
        
        statusText.innerHTML = `Response Status: <span class="badge ${isOk ? 'badge-success' : 'badge-danger'}">${status} ${statusTextStr}</span>`;
        
        let jsonRes;
        try {
          jsonRes = await res.json();
        } catch (e) {
          jsonRes = { success: isOk, message: "Response received but not valid JSON", text: await res.text() };
        }

        codeArea.innerHTML = highlightJson(jsonRes);
      })
      .catch((err) => {
        console.error("Fetch request failure: ", err);
        statusText.innerHTML = `Response Status: <span class="badge badge-danger">Connection Failed</span>`;
        
        const fallbackMsg = {
          success: false,
          message: "Failed to connect to the backend server.",
          advice: "Please ensure your Express server is running locally on http://localhost:5000 and CORS is enabled in backend/app.js. Alternatively, toggle 'Mock Mode' above to view the standard documented route response.",
          details: err.message
        };

        codeArea.innerHTML = highlightJson(fallbackMsg);
      });
  }

  // ----------------------------------------------------
  // JSON Key Syntax Highlighter
  // ----------------------------------------------------
  function highlightJson(jsonObj) {
    if (typeof jsonObj !== "string") {
      jsonObj = JSON.stringify(jsonObj, null, 2);
    }
    jsonObj = jsonObj.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return jsonObj.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
      let cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="json-' + cls + '">' + match + '</span>';
    });
  }

  // ----------------------------------------------------
  // Search Filters
  // ----------------------------------------------------
  function filterRoutes(query) {
    const sections = document.querySelectorAll(".route-section");
    const groupSections = document.querySelectorAll(".group-section");
    const navItems = document.querySelectorAll(".nav-item");

    if (query === "") {
      // Reset views
      sections.forEach(s => s.style.display = "block");
      groupSections.forEach(g => g.style.display = "block");
      navItems.forEach(n => n.style.display = "flex");
      return;
    }

    // Hide everything first
    sections.forEach(s => s.style.display = "none");
    groupSections.forEach(g => g.style.display = "none");
    navItems.forEach(n => n.style.display = "none");

    const matches = ROUTES_CATALOG.filter(r => {
      return (
        r.name.toLowerCase().includes(query) ||
        r.path.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.group.toLowerCase().includes(query) ||
        r.method.toLowerCase().includes(query)
      );
    });

    matches.forEach(m => {
      // Show section
      const section = document.getElementById(m.id);
      if (section) section.style.display = "block";

      // Show parent group section
      const groupSlug = m.group.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const parentGroup = document.getElementById(`group-${groupSlug}`);
      if (parentGroup) parentGroup.style.display = "block";

      // Show nav item
      const navItem = document.querySelector(`.nav-item[data-route-id="${m.id}"]`);
      if (navItem) navItem.style.display = "flex";
    });
  }

  // ----------------------------------------------------
  // Setup Navigation Scroll Spy
  // ----------------------------------------------------
  function setupNavigationScroll() {
    const navLinks = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".doc-section");

    // Scroll to section when nav clicked
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          // Switch tab classes if guide
          if (link.closest(".nav-group").querySelector(".nav-group-title").innerText.includes("Getting Started")) {
            sections.forEach(s => s.classList.remove("active-section"));
            targetSection.classList.add("active-section");
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            // It's an API route, ensure its group container is visible
            const parentGroupSection = targetSection.closest(".group-section");
            sections.forEach(s => s.classList.remove("active-section"));
            
            // Activate the route section's group parent and make it visible
            if (parentGroupSection) {
              parentGroupSection.classList.add("active-section");
              targetSection.style.display = "block";
              
              // Scroll to the specific route card
              targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }

          // Toggle active class in nav
          navLinks.forEach(n => n.classList.remove("active"));
          link.classList.add("active");
        }
      });
    });
  }

  // ----------------------------------------------------
  // Init Theme Settings
  // ----------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const useDark = savedTheme ? savedTheme === "dark" : prefersDark;
    
    document.documentElement.classList.toggle("dark", useDark);
    document.documentElement.classList.toggle("light", !useDark);
  }

  // ----------------------------------------------------
  // Trigger File Download
  // ----------------------------------------------------
  function triggerDownload(fileName, url) {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});
