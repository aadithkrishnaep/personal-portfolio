/**
 * Interactive 3D MacBook Pro Showcase (Three.js)
 * Renders a Space-Silver/Black MacBook Pro with studio reflections,
 * animated Retina screen texture, backlit keyboard, Apple emblem,
 * smooth continuous floating + auto-rotation, and 360-degree damped drag control.
 */

(function () {
  function initMacBook3D() {
    const canvas = document.getElementById("macbook-canvas");
    const stage = document.getElementById("macbook-stage");
    if (!canvas || !stage || typeof THREE === "undefined") return;

    // -------------------------------------------------------------
    // 1. Renderer, Scene, Camera & Studio Reflection Map
    // -------------------------------------------------------------
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    const scene = new THREE.Scene();

    const width = stage.clientWidth || 480;
    const height = stage.clientHeight || 400;
    renderer.setSize(width, height, false);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(4.5, 2.5, 6.2);

    // Build procedural Studio Equirectangular Environment Map for realistic aluminum reflections
    const envCanvas = document.createElement("canvas");
    envCanvas.width = 512;
    envCanvas.height = 256;
    const ectx = envCanvas.getContext("2d");

    const envGrad = ectx.createLinearGradient(0, 0, 0, 256);
    envGrad.addColorStop(0.0, "#1e3a5f");
    envGrad.addColorStop(0.32, "#bae6fd");
    envGrad.addColorStop(0.48, "#0c2238");
    envGrad.addColorStop(0.7, "#071828");
    envGrad.addColorStop(1.0, "#020b14");
    ectx.fillStyle = envGrad;
    ectx.fillRect(0, 0, 512, 256);

    // Softbox studio highlights
    const drawSoftbox = (cx, cy, rx, ry, color) => {
      ectx.save();
      ectx.translate(cx, cy);
      ectx.scale(1, ry / rx);
      const rg = ectx.createRadialGradient(0, 0, 4, 0, 0, rx);
      rg.addColorStop(0, color);
      rg.addColorStop(1, "rgba(255,255,255,0)");
      ectx.fillStyle = rg;
      ectx.beginPath();
      ectx.arc(0, 0, rx, 0, Math.PI * 2);
      ectx.fill();
      ectx.restore();
    };
    drawSoftbox(140, 62, 110, 44, "rgba(255, 255, 255, 0.92)");
    drawSoftbox(380, 74, 95, 38, "rgba(186, 230, 253, 0.78)");
    drawSoftbox(256, 24, 160, 28, "rgba(240, 253, 250, 0.65)");
    drawSoftbox(420, 170, 80, 32, "rgba(56, 189, 248, 0.35)");

    const envTex = new THREE.CanvasTexture(envCanvas);
    envTex.mapping = THREE.EquirectangularReflectionMapping;
    envTex.encoding = THREE.sRGBEncoding;
    scene.environment = envTex;

    // -------------------------------------------------------------
    // 2. Three-Point Cinematic Lighting
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.7);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x061626, 0.75);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.45);
    keyLight.position.set(4.5, 6.0, 5.0);
    scene.add(keyLight);

    const rimLightCyan = new THREE.DirectionalLight(0x38bdf8, 1.35);
    rimLightCyan.position.set(-5.0, 3.0, -4.5);
    scene.add(rimLightCyan);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.65);
    fillLight.position.set(-3.0, -2.5, 4.0);
    scene.add(fillLight);

    // -------------------------------------------------------------
    // 3. Shared Materials & Geometry Helpers
    // -------------------------------------------------------------
    function createRoundedRectShape(w, h, r) {
      const s = new THREE.Shape();
      const x = -w / 2;
      const y = -h / 2;
      s.moveTo(x + r, y);
      s.lineTo(x + w - r, y);
      s.quadraticCurveTo(x + w, y, x + w, y + r);
      s.lineTo(x + w, y + h - r);
      s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      s.lineTo(x + r, y + h);
      s.quadraticCurveTo(x, y + h, x, y + h - r);
      s.lineTo(x, y + r);
      s.quadraticCurveTo(x, y, x + r, y);
      return s;
    }

    // Apple Space Gray / Midnight Titanium Aluminum
    const aluminumMat = new THREE.MeshStandardMaterial({
      color: 0x8e99a6,
      metalness: 0.88,
      roughness: 0.24,
      envMapIntensity: 1.35,
    });

    const darkAnodizedMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.78,
      roughness: 0.36,
      envMapIntensity: 1.0,
    });

    const keycapMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.22,
      roughness: 0.55,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.08,
    });

    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.7,
      roughness: 0.16,
      envMapIntensity: 1.4,
    });

    const glossyGlassMat = new THREE.MeshStandardMaterial({
      color: 0x050a12,
      metalness: 0.35,
      roughness: 0.08,
      envMapIntensity: 1.5,
    });

    const chromeLogoMat = new THREE.MeshStandardMaterial({
      color: 0xf0fdfa,
      metalness: 0.98,
      roughness: 0.05,
      envMapIntensity: 1.8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.08,
    });

    const portRecessMat = new THREE.MeshStandardMaterial({
      color: 0x05080f,
      metalness: 0.3,
      roughness: 0.7,
    });

    const rubberMat = new THREE.MeshStandardMaterial({
      color: 0x0b0f17,
      metalness: 0.05,
      roughness: 0.9,
    });

    // -------------------------------------------------------------
    // 4. Construct MacBook Pro Assembly
    // -------------------------------------------------------------
    const macbookRoot = new THREE.Group();
    scene.add(macbookRoot);

    // Center vertically & in depth around exact geometric midpoint so rotating 360deg never clips edges
    const macbookPivot = new THREE.Group();
    macbookPivot.position.set(0, -0.96, 0.305);
    macbookRoot.add(macbookPivot);

    // --- A. Unibody Base ---
    const baseW = 3.0;
    const baseD = 2.08;
    const baseGeo = new THREE.ExtrudeGeometry(
      createRoundedRectShape(baseW, baseD, 0.14),
      {
        depth: 0.066,
        bevelEnabled: true,
        bevelThickness: 0.012,
        bevelSize: 0.014,
        bevelSegments: 4,
        curveSegments: 16,
      }
    );
    const baseMesh = new THREE.Mesh(baseGeo, aluminumMat);
    baseMesh.rotation.x = Math.PI / 2;
    baseMesh.position.y = 0.033; // Centered vertically: top ~ +0.045, bottom ~ -0.045
    macbookPivot.add(baseMesh);

    // Thumb notch along front center lip
    const notchMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.46, 0.016, 0.045),
      darkAnodizedMat
    );
    notchMesh.position.set(0, 0.037, baseD / 2 - 0.01);
    macbookPivot.add(notchMesh);

    // 4 Rubber feet on underside
    const footGeo = new THREE.CylinderGeometry(0.085, 0.09, 0.014, 24);
    [
      [-1.18, -0.78],
      [1.18, -0.78],
      [-1.18, 0.78],
      [1.18, 0.78],
    ].forEach(([fx, fz]) => {
      const foot = new THREE.Mesh(footGeo, rubberMat);
      foot.position.set(fx, -0.048, fz);
      macbookPivot.add(foot);
    });

    // Side ports (Thunderbolt / MagSafe / HDMI / SD)
    const portGeo = new THREE.BoxGeometry(0.02, 0.022, 0.078);
    [-0.64, -0.50, -0.36].forEach((pz) => {
      const leftPort = new THREE.Mesh(portGeo, portRecessMat);
      leftPort.position.set(-baseW / 2 - 0.008, 0.004, pz);
      macbookPivot.add(leftPort);
    });
    [-0.58, -0.43, -0.26].forEach((pz) => {
      const rightPort = new THREE.Mesh(portGeo, portRecessMat);
      rightPort.position.set(baseW / 2 + 0.008, 0.004, pz);
      macbookPivot.add(rightPort);
    });

    // Recessed keyboard well
    const kbWellGeo = new THREE.ExtrudeGeometry(
      createRoundedRectShape(2.26, 0.90, 0.04),
      { depth: 0.004, bevelEnabled: false }
    );
    const kbWell = new THREE.Mesh(kbWellGeo, darkAnodizedMat);
    kbWell.rotation.x = Math.PI / 2;
    kbWell.position.set(0, 0.048, -0.22);
    macbookPivot.add(kbWell);

    // Individual 3D Keys Layout
    const kbRows = [
      [1.3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.2],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
      [1.45, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.65],
      [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.95],
      [2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25],
      [1.15, 1.15, 1.15, 1.35, 5.2, 1.35, 1.15, 1, 1, 1],
    ];
    const kbInnerW = 2.18;
    const kbInnerD = 0.84;
    const rowH = kbInnerD / kbRows.length;
    const gap = 0.015;

    kbRows.forEach((row, rIdx) => {
      const totalUnits = row.reduce((a, b) => a + b, 0);
      const totalGap = gap * (row.length - 1);
      const unitW = (kbInnerW - totalGap) / totalUnits;
      let cursorX = -kbInnerW / 2;
      const keyZ = -0.22 - kbInnerD / 2 + rowH * (rIdx + 0.5);

      row.forEach((units, cIdx) => {
        const kw = units * unitW;
        const kh = rIdx === 0 ? rowH * 0.62 : rowH * 0.80;
        const isSpaceOrBottom = rIdx === 5;
        const keyGeo = new THREE.BoxGeometry(
          kw,
          0.012,
          isSpaceOrBottom && cIdx >= 7 ? kh * 0.88 : kh
        );
        const keyMesh = new THREE.Mesh(keyGeo, keycapMat);
        keyMesh.position.set(cursorX + kw / 2, 0.052, keyZ);
        macbookPivot.add(keyMesh);
        cursorX += kw + gap;
      });
    });

    // Subtle Side Speaker Grilles
    const grilleGeo = new THREE.PlaneGeometry(0.18, 0.86);
    const grilleMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.85,
      metalness: 0.2,
    });
    [-1.29, 1.29].forEach((gx) => {
      const grille = new THREE.Mesh(grilleGeo, grilleMat);
      grille.rotation.x = -Math.PI / 2;
      grille.position.set(gx, 0.047, -0.22);
      macbookPivot.add(grille);
    });

    // Force Touch Glass Trackpad
    const trackpadGeo = new THREE.ExtrudeGeometry(
      createRoundedRectShape(1.16, 0.68, 0.045),
      { depth: 0.003, bevelEnabled: false }
    );
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.rotation.x = Math.PI / 2;
    trackpad.position.set(0, 0.048, 0.60);
    macbookPivot.add(trackpad);

    // --- B. Precision Hinge + Display Lid Assembly ---
    const lidPivot = new THREE.Group();
    lidPivot.position.set(0, 0.036, -baseD / 2 + 0.04);
    lidPivot.rotation.x = -0.32; // Open ~108 degrees
    macbookPivot.add(lidPivot);

    // Hinge cylinder
    const hinge = new THREE.Mesh(
      new THREE.CylinderGeometry(0.032, 0.032, 2.22, 24),
      darkAnodizedMat
    );
    hinge.rotation.z = Math.PI / 2;
    lidPivot.add(hinge);

    const lidW = baseW;
    const lidH = 2.04;

    // Outer metallic lid shell
    const lidGeo = new THREE.ExtrudeGeometry(
      createRoundedRectShape(lidW, lidH, 0.14),
      {
        depth: 0.026,
        bevelEnabled: true,
        bevelThickness: 0.009,
        bevelSize: 0.011,
        bevelSegments: 4,
        curveSegments: 16,
      }
    );
    const lidMesh = new THREE.Mesh(lidGeo, aluminumMat);
    lidMesh.position.set(0, lidH / 2 + 0.01, -0.013);
    lidPivot.add(lidMesh);

    // Front Glossy Glass Display Bezel
    const bezelGeo = new THREE.ExtrudeGeometry(
      createRoundedRectShape(lidW - 0.06, lidH - 0.06, 0.11),
      { depth: 0.003, bevelEnabled: false }
    );
    const bezelMesh = new THREE.Mesh(bezelGeo, glossyGlassMat);
    bezelMesh.position.set(0, lidH / 2 + 0.01, 0.022);
    lidPivot.add(bezelMesh);

    // Animated Live Retina Screen CanvasTexture
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 1024;
    screenCanvas.height = 640;
    const sctx = screenCanvas.getContext("2d");

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.encoding = THREE.sRGBEncoding;
    screenTexture.anisotropy = 4;

    function drawRetinaScreen(timeSec) {
      // Iconic Apple "hello" colorful flowing gradient ribbon wallpaper
      const bg = sctx.createLinearGradient(0, 0, 1024, 640);
      bg.addColorStop(0.0, "#1e1b4b");
      bg.addColorStop(0.32, "#0369a1");
      bg.addColorStop(0.68, "#0d9488");
      bg.addColorStop(1.0, "#312e81");
      sctx.fillStyle = bg;
      sctx.fillRect(0, 0, 1024, 640);

      // Silky flowing spectrum ribbons inspired by Apple's iconic "hello" wallpaper
      const shift1 = Math.sin(timeSec * 0.55) * 55;
      const shift2 = Math.cos(timeSec * 0.45) * 45;

      const drawRibbonGlow = (cx, cy, r, c0, c1) => {
        const g = sctx.createRadialGradient(cx, cy, r * 0.08, cx, cy, r);
        g.addColorStop(0, c0);
        g.addColorStop(1, c1);
        sctx.fillStyle = g;
        sctx.fillRect(0, 0, 1024, 640);
      };

      drawRibbonGlow(210 + shift1, 180 + shift2, 360, "rgba(56, 189, 248, 0.72)", "rgba(56, 189, 248, 0)");
      drawRibbonGlow(520 - shift1 * 0.6, 480 - shift2, 340, "rgba(244, 114, 182, 0.55)", "rgba(244, 114, 182, 0)");
      drawRibbonGlow(820 + shift2, 220 - shift1 * 0.5, 340, "rgba(251, 146, 60, 0.50)", "rgba(251, 146, 60, 0)");
      drawRibbonGlow(760 - shift1, 500 + shift2 * 0.6, 320, "rgba(167, 139, 250, 0.55)", "rgba(167, 139, 250, 0)");
      drawRibbonGlow(480, 310, 380, "rgba(34, 211, 238, 0.30)", "rgba(34, 211, 238, 0)");

      // Subtle curved translucent wave sweep
      sctx.save();
      sctx.globalAlpha = 0.24;
      const waveGrad = sctx.createLinearGradient(0, 140, 1024, 520);
      waveGrad.addColorStop(0, "#38bdf8");
      waveGrad.addColorStop(0.5, "#f472b6");
      waveGrad.addColorStop(1, "#fb923c");
      sctx.fillStyle = waveGrad;
      sctx.beginPath();
      sctx.moveTo(0, 340 + shift2 * 0.4);
      sctx.bezierCurveTo(280, 180 - shift1 * 0.5, 620, 510 + shift1 * 0.4, 1024, 280 - shift2 * 0.5);
      sctx.lineTo(1024, 640);
      sctx.lineTo(0, 640);
      sctx.closePath();
      sctx.fill();
      sctx.restore();

      // Iconic flowing cursive "hello" script centered cleanly on the Retina screen
      sctx.save();
      const scale = 1.65;
      const helloWidth = 390 * scale;
      const helloHeight = 126 * scale;
      sctx.translate((1024 - helloWidth) / 2, (640 - helloHeight) / 2 + 6);
      sctx.scale(scale, scale);

      sctx.strokeStyle = "#ffffff";
      sctx.lineWidth = 10.5;
      sctx.lineCap = "round";
      sctx.lineJoin = "round";
      sctx.shadowColor = "rgba(255, 255, 255, 0.65)";
      sctx.shadowBlur = 18;

      sctx.beginPath();
      // 'h'
      sctx.moveTo(18, 92);
      sctx.bezierCurveTo(48, 72, 82, 26, 72, 14);
      sctx.bezierCurveTo(62, 4, 48, 22, 44, 114);
      sctx.bezierCurveTo(44, 92, 68, 66, 86, 68);
      sctx.bezierCurveTo(100, 70, 92, 108, 108, 112);
      // 'e'
      sctx.bezierCurveTo(128, 112, 154, 92, 150, 74);
      sctx.bezierCurveTo(146, 60, 124, 64, 122, 92);
      sctx.bezierCurveTo(120, 114, 148, 118, 172, 96);
      // 'l'
      sctx.bezierCurveTo(194, 72, 216, 26, 206, 14);
      sctx.bezierCurveTo(196, 4, 184, 24, 184, 96);
      sctx.bezierCurveTo(184, 116, 204, 116, 226, 96);
      // 'l'
      sctx.bezierCurveTo(248, 72, 270, 26, 260, 14);
      sctx.bezierCurveTo(250, 4, 238, 24, 238, 96);
      sctx.bezierCurveTo(238, 116, 258, 116, 282, 94);
      // 'o' + graceful curl exit
      sctx.bezierCurveTo(294, 78, 308, 64, 328, 68);
      sctx.bezierCurveTo(306, 64, 292, 82, 296, 100);
      sctx.bezierCurveTo(302, 116, 328, 116, 338, 96);
      sctx.bezierCurveTo(344, 82, 336, 68, 328, 68);
      sctx.bezierCurveTo(338, 78, 356, 86, 378, 74);
      sctx.stroke();
      sctx.restore();

      screenTexture.needsUpdate = true;
    }

    drawRetinaScreen(0);

    const screenGeo = new THREE.PlaneGeometry(lidW - 0.16, lidH - 0.19);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, lidH / 2 - 0.005, 0.0265);
    lidPivot.add(screenMesh);

    // Camera Notch at top center of Retina screen
    const camNotch = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.062, 0.004),
      glossyGlassMat
    );
    camNotch.position.set(0, lidH - 0.10, 0.0275);
    lidPivot.add(camNotch);

    const camLens = new THREE.Mesh(
      new THREE.CircleGeometry(0.011, 16),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    camLens.position.set(0, lidH - 0.10, 0.030);
    lidPivot.add(camLens);

    // Mirror Chrome Apple Emblem on Rear of Lid
    function createAppleLogoGroup() {
      const logoGroup = new THREE.Group();

      // Main apple silhouette curve
      const bodyShape = new THREE.Shape();
      bodyShape.moveTo(0, 0.11);
      bodyShape.bezierCurveTo(0.045, 0.125, 0.105, 0.115, 0.132, 0.078);
      // Right side bite curve
      bodyShape.bezierCurveTo(0.085, 0.055, 0.085, -0.025, 0.142, -0.048);
      bodyShape.bezierCurveTo(0.125, -0.105, 0.082, -0.155, 0.045, -0.155);
      bodyShape.bezierCurveTo(0.022, -0.155, 0.015, -0.142, 0, -0.142);
      bodyShape.bezierCurveTo(-0.015, -0.142, -0.022, -0.155, -0.045, -0.155);
      bodyShape.bezierCurveTo(-0.092, -0.155, -0.148, -0.082, -0.148, 0.008);
      bodyShape.bezierCurveTo(-0.148, 0.095, -0.082, 0.125, -0.035, 0.118);
      bodyShape.bezierCurveTo(-0.015, 0.115, -0.005, 0.11, 0, 0.11);

      const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, {
        depth: 0.004,
        bevelEnabled: false,
        curveSegments: 20,
      });
      const bodyMesh = new THREE.Mesh(bodyGeo, chromeLogoMat);
      logoGroup.add(bodyMesh);

      // Leaf silhouette
      const leafShape = new THREE.Shape();
      leafShape.moveTo(-0.005, 0.125);
      leafShape.bezierCurveTo(0.005, 0.175, 0.048, 0.215, 0.085, 0.215);
      leafShape.bezierCurveTo(0.082, 0.165, 0.045, 0.128, -0.005, 0.125);

      const leafGeo = new THREE.ExtrudeGeometry(leafShape, {
        depth: 0.004,
        bevelEnabled: false,
        curveSegments: 16,
      });
      const leafMesh = new THREE.Mesh(leafGeo, chromeLogoMat);
      logoGroup.add(leafMesh);

      return logoGroup;
    }

    const appleLogo = createAppleLogoGroup();
    appleLogo.rotation.y = Math.PI; // Facing -Z (back of lid)
    appleLogo.scale.set(1.25, 1.25, 1);
    appleLogo.position.set(0, lidH / 2 + 0.04, -0.024);
    lidPivot.add(appleLogo);

    // -------------------------------------------------------------
    // 5. Free 360-Degree Damped Rotation & Smooth Motion
    // -------------------------------------------------------------
    const controls = new THREE.OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.045;
    controls.rotateSpeed = 0.78;
    controls.enableZoom = false; // Allow natural page scrolling over the canvas
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.minPolarAngle = 0.08;
    controls.maxPolarAngle = Math.PI - 0.08;
    controls.target.set(0, 0, 0);

    // Guarantee full bounding sphere (R ~ 2.26 + margin) fits cleanly with no edge clipping at any rotation
    const applyResponsiveFraming = (w, h) => {
      const aspect = w / Math.max(h, 1);
      camera.fov = aspect < 1.1 ? 40 : 36;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      const vHalf = THREE.MathUtils.degToRad(camera.fov * 0.5);
      const hHalf = Math.atan(Math.tan(vHalf) * aspect);
      const minHalf = Math.min(vHalf, hHalf);
      const safeDist = 2.75 / Math.sin(minHalf);

      const dir = camera.position.clone().sub(controls.target);
      if (dir.lengthSq() < 0.0001) dir.set(0.55, 0.31, 0.77);
      dir.normalize().multiplyScalar(safeDist);
      camera.position.copy(controls.target).add(dir);
      controls.minDistance = safeDist;
      controls.maxDistance = safeDist;
      controls.update();
    };
    applyResponsiveFraming(width, height);

    // Pause idle spin only while actively dragging, resume smoothly after release
    let isUserInteracting = false;
    controls.addEventListener("start", () => {
      isUserInteracting = true;
      controls.autoRotate = false;
    });

    let resumeTimeout = null;
    controls.addEventListener("end", () => {
      isUserInteracting = false;
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        if (!isUserInteracting) {
          controls.autoRotate = true;
        }
      }, 1400);
    });

    // Resize handling for crisp responsiveness across desktop & mobile
    const handleResize = (w, h) => {
      if (w > 0 && h > 0) {
        applyResponsiveFraming(w, h);
        renderer.setSize(w, h, false);
      }
    };

    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          handleResize(entry.contentRect.width, entry.contentRect.height);
        }
      });
      resizeObserver.observe(stage);
    } else {
      window.addEventListener("resize", () => {
        handleResize(stage.clientWidth, stage.clientHeight);
      });
    }

    // Visibility-aware animation loop
    let isVisible = true;
    const aboutSection = document.getElementById("slide-about");
    if (aboutSection && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
          });
        },
        { threshold: 0.05 }
      );
      io.observe(aboutSection);
    }

    const clock = new THREE.Clock();
    let lastScreenDraw = 0;

    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible) {
        clock.getDelta();
        return;
      }

      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;

      // Keep rotation speed consistent across 60Hz and 120Hz ProMotion displays
      controls.autoRotateSpeed = 1.6 * (delta * 60);

      // Smooth weightless levitation + subtle harmonic tilt motion
      macbookRoot.position.y = Math.sin(elapsed * 1.35) * 0.065;
      macbookRoot.rotation.z = Math.sin(elapsed * 0.85) * 0.028;

      // Redraw animated Retina display canvas at ~20fps for crisp low-overhead glow
      if (elapsed - lastScreenDraw > 0.05) {
        drawRetinaScreen(elapsed);
        lastScreenDraw = elapsed;
      }

      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMacBook3D);
  } else {
    initMacBook3D();
  }
})();
