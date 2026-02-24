"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  width?: number;
  height?: number;
  showHint?: boolean;
};

type WaveObstacle = {
  type: "wave";
  x: number;
  w: number;
  h: number;
};

type CloudObstacle = {
  type: "cloud";
  x: number;
  y: number;
  w: number;
  h: number;
  boltX: number;
  boltW: number;
  boltH: number;
};

type StarCollectible = {
  type: "star";
  x: number;
  y: number;
  s: number;
};

type Obstacle = WaveObstacle | CloudObstacle | StarCollectible;

export default function MiniDinoGame({
  width = 360,
  height = 92,
  showHint = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTRef = useRef<number>(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mql?.matches) return;

    const W = width;
    const H = height;
    const px = (n: number) => Math.round(n);

    const scale = Math.max(0.42, H / 92);
    const groundY = Math.floor(H * 0.82);
    const dinoW = Math.max(10, px(18 * scale));
    const dinoH = Math.max(12, px(22 * scale));

    // Floatier jump (user requested more hangtime)
    const gravity = 980 * scale;
    const jumpV = 585 * scale;
    const baseSpeed = 220 * Math.max(0.65, scale);
    const speedGain = 4 * Math.max(0.65, scale);

    const waveWMin = Math.max(14, px(26 * scale));
    const waveWMax = Math.max(waveWMin + 4, px(46 * scale));
    const waveHMin = Math.max(7, px(10 * scale));
    const waveHMax = Math.max(waveHMin + 3, px(18 * scale));

    const cloudWMin = Math.max(18, px(28 * scale));
    const cloudWMax = Math.max(cloudWMin + 4, px(40 * scale));
    const cloudHMin = Math.max(6, px(8 * scale));
    const cloudHMax = Math.max(cloudHMin + 2, px(12 * scale));

    const fg = "rgba(236,247,255,0.95)";
    const muted = "rgba(193,214,234,0.78)";
    const border = "rgba(126,203,255,0.22)";
    const bgFill = "rgba(2,7,18,0.95)";
    const grid = "rgba(126,203,255,0.08)";
    const glow = "rgba(126,203,255,0.16)";
    const waveColor = "rgba(126,203,255,0.92)";
    const waveFoam = "rgba(205,242,255,0.95)";
    const waveShadow = "rgba(44,110,154,0.95)";
    const waveOutline = "rgba(16,20,28,0.98)";
    const cloudColor = "rgba(231,239,247,0.86)";
    const cloudShade = "rgba(150,171,193,0.6)";
    const lightningColor = "rgba(255,228,130,0.95)";
    const starColor = "rgba(255,230,120,0.98)";
    const starGlow = "rgba(255,190,70,0.9)";

    const fontPx = Math.max(9, px(12 * Math.max(0.85, scale)));

    let speed = baseSpeed;
    let score = 0;

    const dino = {
      x: Math.floor(W * 0.18),
      y: groundY - dinoH,
      vy: 0,
      onGround: true,
    };

    let obstacles: Obstacle[] = [];

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const fillPx = (x: number, y: number, w: number, h: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(px(x), px(y), Math.max(1, px(w)), Math.max(1, px(h)));
    };

    const aabbHit = (
      ax: number,
      ay: number,
      aw: number,
      ah: number,
      bx: number,
      by: number,
      bw: number,
      bh: number
    ) => ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;

    const spawn = () => {
      const standingTop = groundY - dinoH;

      if (Math.random() < 0.18) {
        const s = Math.max(5, px(7 * scale));
        const minY = Math.max(4, standingTop - Math.max(18, px(28 * scale)));
        const maxY = Math.max(minY, standingTop - Math.max(4, px(6 * scale)));
        obstacles.push({
          type: "star",
          x: W + 10,
          y: px(rand(minY, maxY)),
          s,
        });
        return;
      }

      const canSpawnCloud = H >= 40;
      const spawnCloud = canSpawnCloud && Math.random() < 0.38;

      if (spawnCloud) {
        const w = px(rand(cloudWMin, cloudWMax));
        const h = px(rand(cloudHMin, cloudHMax));
        const boltW = Math.max(3, px(4 * scale));
        const boltH = Math.max(5, px(rand(6 * scale, 11 * scale)));
        const boltX = px(rand(Math.max(1, w * 0.2), Math.max(2, w * 0.75)));
        const safeBottom = standingTop - Math.max(2, px(2 * scale));
        const naturalMaxCloudTop = Math.floor(H * 0.34) - h;
        const safeMaxCloudTop = safeBottom - h - boltH;
        const maxCloudTop = Math.min(naturalMaxCloudTop, safeMaxCloudTop);

        if (maxCloudTop >= 2) {
          const y = px(rand(2, maxCloudTop));

          obstacles.push({
            type: "cloud",
            x: W + 10,
            y,
            w,
            h,
            boltX,
            boltW,
            boltH,
          });
          return;
        }
      }

      obstacles.push({
        type: "wave",
        x: W + 10,
        w: px(rand(waveWMin, waveWMax)),
        h: px(rand(waveHMin, waveHMax)),
      });
    };

    let nextSpawn = rand(0.95, 1.8);
    let spawnTimer = 0;

    const reset = () => {
      speed = baseSpeed;
      score = 0;
      dino.y = groundY - dinoH;
      dino.vy = 0;
      dino.onGround = true;
      obstacles = [];
      nextSpawn = rand(0.95, 1.8);
      spawnTimer = 0;
      lastTRef.current = 0;
    };

    const jump = () => {
      if (!running) {
        reset();
        setRunning(true);
        return;
      }
      if (dino.onGround) {
        dino.vy = -jumpV;
        dino.onGround = false;
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement !== canvas) return;
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };

    const onPointer = () => {
      canvas.focus();
      jump();
    };

    window.addEventListener("keydown", onKey, { passive: false });
    canvas.addEventListener("pointerdown", onPointer);

    const drawDino = () => {
      const x = px(dino.x);
      const y = px(dino.y);
      const frame = Math.floor(score * 8) % 2;
      const runningStep = dino.onGround ? frame : 0;
      const shadow = "rgba(14,23,38,0.95)";
      const skin = "rgba(255,228,190,0.95)";
      const accent = "rgba(126,203,255,0.95)";

      // Keep the sprite human-shaped inside the existing hitbox.
      const bodyX = x + Math.max(2, Math.floor(dinoW * 0.25));
      const bodyW = Math.max(5, Math.floor(dinoW * 0.42));
      const headSize = Math.max(4, Math.floor(dinoW * 0.3));
      const headX = bodyX + Math.max(0, Math.floor((bodyW - headSize) / 2));
      const headY = y;
      const torsoY = headY + headSize + 1;
      const torsoH = Math.max(6, Math.floor(dinoH * 0.34));
      const hipY = torsoY + torsoH - 1;
      const armY = torsoY + 1;
      const footY = y + dinoH - 1;

      // Outer silhouette / shadow
      fillPx(bodyX - 1, torsoY - 1, bodyW + 2, torsoH + 2, shadow);
      fillPx(headX - 1, headY - 1, headSize + 2, headSize + 2, shadow);

      // Head
      fillPx(headX, headY, headSize, headSize, skin);
      fillPx(headX + headSize - 2, headY + 1, 1, 1, "rgba(2,7,18,1)");

      // Torso + shorts
      fillPx(bodyX, torsoY, bodyW, torsoH - 2, fg);
      fillPx(bodyX, torsoY + torsoH - 2, bodyW, 2, accent);

      // Arms (alternate like a runner)
      if (runningStep === 0) {
        fillPx(bodyX - 2, armY + 1, 2, 3, skin); // rear arm
        fillPx(bodyX + bodyW, armY, 2, 4, skin); // front arm
      } else {
        fillPx(bodyX - 2, armY, 2, 4, skin);
        fillPx(bodyX + bodyW, armY + 1, 2, 3, skin);
      }

      // Legs (running alternation, tucked while airborne)
      if (!dino.onGround) {
        fillPx(bodyX + 1, hipY, 2, Math.max(3, footY - hipY), fg);
        fillPx(bodyX + bodyW - 3, hipY + 1, 2, Math.max(2, footY - hipY - 1), fg);
      } else if (runningStep === 0) {
        fillPx(bodyX + 1, hipY, 2, Math.max(2, footY - hipY - 1), fg);
        fillPx(bodyX + 2, footY - 1, 3, 2, fg); // forward foot
        fillPx(bodyX + bodyW - 3, hipY + 1, 2, Math.max(3, footY - hipY), fg);
      } else {
        fillPx(bodyX + 1, hipY + 1, 2, Math.max(3, footY - hipY), fg);
        fillPx(bodyX + bodyW - 3, hipY, 2, Math.max(2, footY - hipY - 1), fg);
        fillPx(bodyX + bodyW - 5, footY - 1, 3, 2, fg); // forward foot (other leg)
      }

      // Tiny speed trail behind runner for readability at header size
      if (dino.onGround) {
        fillPx(x - 3, footY - 1, 2, 1, muted);
        fillPx(x - 5, footY, 2, 1, "rgba(193,214,234,0.45)");
      }
    };

    const drawWave = (ob: WaveObstacle) => {
      const x = px(ob.x);
      const y = px(groundY - ob.h);
      const w = Math.max(10, ob.w);
      const h = Math.max(8, ob.h);
      const baseH = Math.max(3, Math.floor(h * 0.34));
      const baseY = y + h - baseH;

      // Base water body (gives the wave a strong traveling mass)
      fillPx(x, baseY, w, baseH, waveColor);
      fillPx(x, baseY + 1, w, Math.max(1, baseH - 1), waveShadow);
      for (let i = 1; i < w; i += 3) {
        fillPx(x + i, baseY, 1, 1, waveFoam);
      }

      // Left-opening curling crest sprite layered over the base.
      // K = outline, B = body, S = shadow, W = foam highlight.
      const crestSprite = [
        ".....KWWK......",
        "...KKBBBBK.....",
        "..KBBBBBBBK....",
        ".KBBBBBBWBBK...",
        "KBBBBKKWBBBK...",
        "KBBBK..KBBBBK..",
        ".KKK...KBBBBBK.",
        ".......KBBBBSK.",
        "......KKBBBBWK.",
        "....KKBBBBBBKK.",
        "..KKBBBBBBBBK..",
      ];

      const spriteH = crestSprite.length;
      const spriteW = crestSprite[0].length;
      const crestW = Math.max(8, Math.min(w, Math.floor(w * 0.8)));
      const crestH = Math.max(5, h - Math.max(1, Math.floor(baseH * 0.35)));
      const crestX = x;
      const crestY = y;

      for (let dy = 0; dy < crestH; dy += 1) {
        const sy = Math.min(spriteH - 1, Math.floor((dy / crestH) * spriteH));
        const row = crestSprite[sy];

        for (let dx = 0; dx < crestW; dx += 1) {
          const sx = Math.min(spriteW - 1, Math.floor((dx / crestW) * spriteW));
          const ch = row[sx];
          if (ch === ".") continue;

          let color = waveColor;
          if (ch === "K") color = waveOutline;
          else if (ch === "S") color = waveShadow;
          else if (ch === "W") color = waveFoam;

          fillPx(crestX + dx, crestY + dy, 1, 1, color);
        }
      }

      // Extra foam pixels on the curling lip (left-facing opening)
      fillPx(x + Math.max(1, Math.floor(w * 0.16)), y + Math.max(1, Math.floor(h * 0.18)), 1, 1, waveFoam);
      fillPx(x + Math.max(2, Math.floor(w * 0.22)), y + Math.max(1, Math.floor(h * 0.12)), 1, 1, waveFoam);
    };

    const drawCloud = (ob: CloudObstacle) => {
      const x = px(ob.x);
      const y = px(ob.y);
      const unit = Math.max(2, px(3 * scale));

      fillPx(x + unit, y + unit, ob.w - unit * 2, ob.h, cloudColor);
      fillPx(x, y + unit * 2, unit * 3, ob.h - unit, cloudColor);
      fillPx(x + ob.w - unit * 3, y + unit * 2, unit * 3, ob.h - unit, cloudColor);
      fillPx(x + unit * 2, y, unit * 2, unit * 2, cloudColor);
      fillPx(x + unit * 4, y + unit * 0.5, unit * 2, unit * 2, cloudColor);
      fillPx(x + unit, y + ob.h, ob.w - unit, unit, cloudShade);

      const bx = px(ob.x + ob.boltX);
      const by = px(ob.y + ob.h + 1);
      const bw = Math.max(2, px(ob.boltW));
      const bh = Math.max(5, px(ob.boltH));
      fillPx(bx, by, bw, Math.max(2, bh * 0.28), lightningColor);
      fillPx(bx + bw, by + Math.max(1, bh * 0.22), bw, Math.max(2, bh * 0.26), lightningColor);
      fillPx(bx + Math.max(0, bw * 0.3), by + Math.max(2, bh * 0.46), bw, Math.max(2, bh * 0.26), lightningColor);
      fillPx(bx - Math.max(0, bw * 0.7), by + Math.max(4, bh * 0.7), bw + 1, Math.max(2, bh * 0.24), lightningColor);
    };

    const drawStar = (ob: StarCollectible) => {
      const x = px(ob.x);
      const y = px(ob.y);
      const s = Math.max(5, ob.s);
      const c = Math.floor(s / 2);

      fillPx(x + c, y, 1, s, starGlow);
      fillPx(x, y + c, s, 1, starGlow);
      fillPx(x + 1, y + 1, s - 2, s - 2, "rgba(255,190,70,0.18)");

      fillPx(x + c, y + 1, 1, s - 2, starColor);
      fillPx(x + 1, y + c, s - 2, 1, starColor);
      fillPx(x + c - 1, y + c - 1, 3, 3, "rgba(255,250,205,1)");
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, W, H);

      // Retro grid
      ctx.fillStyle = grid;
      for (let gx = 2; gx < W; gx += 8) ctx.fillRect(gx, 2, 1, H - 4);
      for (let gy = 2; gy < H; gy += 8) ctx.fillRect(2, gy, W - 4, 1);

      // Scanlines
      ctx.fillStyle = "rgba(255,255,255,0.035)";
      for (let gy = 0; gy < H; gy += 2) ctx.fillRect(0, gy, W, 1);

      ctx.strokeStyle = border;
      ctx.lineWidth = 1;
      ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
      ctx.strokeStyle = glow;
      ctx.strokeRect(1.5, 1.5, W - 3, H - 3);

      // Pixel horizon
      for (let x = 0; x < W; x += 4) {
        fillPx(x, groundY, 2, 1, muted);
      }

      drawDino();

      for (const ob of obstacles) {
        if (ob.type === "wave") drawWave(ob);
        else if (ob.type === "cloud") drawCloud(ob);
        else drawStar(ob);
      }

      ctx.font = `600 ${fontPx}px "Courier New", ui-monospace, monospace`;
      ctx.textBaseline = "top";
      ctx.textAlign = "right";
      // Text shadow only (no full-width HUD bar) so clouds are never visually covered.
      ctx.fillStyle = "rgba(2,7,18,0.95)";
      if (running) {
        ctx.fillText(`SCORE ${Math.floor(score)}`, W - 9, 7);
      } else {
        const hint = W < 260 ? "CLICK/SPACE" : "CLICK / SPACE";
        ctx.fillText(hint, W - 9, 7);
      }
      if (running) {
        ctx.fillStyle = waveFoam;
        ctx.fillText(`SCORE ${Math.floor(score)}`, W - 10, 6);
      } else {
        ctx.fillStyle = muted;
        const hint = W < 260 ? "CLICK/SPACE" : "CLICK / SPACE";
        ctx.fillText(hint, W - 10, 6);
      }
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
    };

    const tick = (t: number) => {
      if (!running) {
        draw();
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const last = lastTRef.current || t;
      const dt = Math.min(0.033, (t - last) / 1000);
      lastTRef.current = t;

      speed += speedGain * dt;
      score += dt * 10;

      dino.vy += gravity * dt;
      dino.y += dino.vy * dt;

      if (dino.y < 2) {
        dino.y = 2;
        dino.vy = Math.max(0, dino.vy);
      }

      if (dino.y >= groundY - dinoH) {
        dino.y = groundY - dinoH;
        dino.vy = 0;
        dino.onGround = true;
      }

      spawnTimer += dt;
      if (spawnTimer >= nextSpawn) {
        spawnTimer = 0;
        nextSpawn = rand(0.95, 1.85);
        spawn();
      }

      obstacles.forEach((ob) => {
        ob.x -= speed * dt;
      });
      obstacles = obstacles.filter((ob) => ob.x + (ob.type === "star" ? ob.s : ob.w) > -5);

      for (let i = obstacles.length - 1; i >= 0; i -= 1) {
        const ob = obstacles[i];
        let hit = false;

        if (ob.type === "star") {
          if (aabbHit(dino.x, dino.y, dinoW, dinoH, ob.x, ob.y, ob.s, ob.s)) {
            score += 100;
            obstacles.splice(i, 1);
          }
          continue;
        }

        if (ob.type === "wave") {
          hit = aabbHit(dino.x, dino.y, dinoW, dinoH, ob.x, groundY - ob.h, ob.w, ob.h);
        } else {
          const cloudHit = aabbHit(dino.x, dino.y, dinoW, dinoH, ob.x, ob.y, ob.w, ob.h);
          const boltHit = aabbHit(
            dino.x,
            dino.y,
            dinoW,
            dinoH,
            ob.x + ob.boltX - ob.boltW * 0.4,
            ob.y + ob.h,
            ob.boltW * 1.5,
            ob.boltH
          );
          hit = cloudHit || boltHit;
        }

        if (hit) {
          setRunning(false);
          break;
        }
      }

      draw();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onVis = () => {
      if (document.hidden) setRunning(false);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [height, width, running]);

  return (
    <div className="select-none">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        tabIndex={0}
        className="rounded-xl outline-none [image-rendering:pixelated]"
        aria-label="Mini jump game"
        role="img"
      />
      {showHint ? (
        <div className="mt-1 text-[11px] text-white/50">
          {running
            ? "Space / ↑ to jump • click to jump"
            : "Click or Space to play • collision pauses"}
        </div>
      ) : null}
    </div>
  );
}
