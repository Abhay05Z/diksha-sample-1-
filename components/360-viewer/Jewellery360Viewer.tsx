"use client";

import { Maximize2, Minus, Pause, Play, Plus, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { turntables, type SequenceId } from "@/data/viewers";

function mod(value: number, count: number) {
  return ((value % count) + count) % count;
}

export function Jewellery360Viewer({
  sequenceId,
  alt,
  autoStart = false,
}: {
  sequenceId?: SequenceId;
  alt: string;
  autoStart?: boolean;
}) {
  const sequence = sequenceId ? turntables[sequenceId] : undefined;
  const count = sequence?.frames ?? 0;
  const frames = useMemo(
    () => (sequence ? Array.from({ length: count }, (_, index) => sequence.frameSrc(index + 1)) : []),
    [sequence, count],
  );

  const stageRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, x: 0, frame: 0 });
  const [frame, setFrame] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [auto, setAuto] = useState(autoStart);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    if (!frames.length) return;
    let cancelled = false;
    const load = (index: number) =>
      new Promise<boolean>((resolve) => {
        const image = new Image();
        image.onload = () => resolve(true);
        image.onerror = () => resolve(false);
        image.src = frames[index];
      });

    (async () => {
      const first = await load(0);
      if (cancelled) return;
      if (!first) {
        setFailed(true);
        return;
      }
      setReady(true);
      const neighbors = [1, 2, 3, count - 1, count - 2].filter((index) => index > 0 && index < count);
      await Promise.all(neighbors.map(load));
      for (let index = 0; index < count; index += 1) {
        if (cancelled) return;
        if (index === 0 || neighbors.includes(index)) continue;
        await load(index);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [frames, count]);

  useEffect(() => {
    if (!auto || !ready || count < 2) return;
    const timer = window.setInterval(() => setFrame((current) => (current + 1) % count), 80);
    return () => window.clearInterval(timer);
  }, [auto, ready, count]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const blockScroll = (event: TouchEvent) => {
      if (drag.current.active) event.preventDefault();
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      setZoom((current) => Math.min(2.6, Math.max(1, current + (event.deltaY < 0 ? 0.12 : -0.12))));
    };
    stage.addEventListener("touchmove", blockScroll, { passive: false });
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      stage.removeEventListener("touchmove", blockScroll);
      stage.removeEventListener("wheel", onWheel);
    };
  }, []);

  function stopAuto() {
    setAuto(false);
    setHint(false);
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!ready) return;
    stopAuto();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { active: true, x: event.clientX, frame };
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.active || !count) return;
    const delta = event.clientX - drag.current.x;
    const shift = Math.round(delta / 6);
    setFrame(mod(drag.current.frame - shift, count));
  }

  function onPointerUp() {
    drag.current.active = false;
  }

  async function toggleFullscreen() {
    const shell = shellRef.current;
    if (!shell) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await shell.requestFullscreen();
  }

  if (!sequence || failed) {
    return (
      <div className="viewer-shell" data-lenis-prevent>
        <div className="viewer-fallback">
          <div>
            <p className="label">360° viewer</p>
            <h3 className="font-display" style={{ fontSize: "2.2rem", margin: "0.6rem 0" }}>
              Photography can be placed here.
            </h3>
            <p className="muted" style={{ maxWidth: "42ch", marginInline: "auto" }}>
              Add a folder of frames named frame-001.webp onwards. The drag, swipe, zoom and fullscreen controls are already built.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="viewer-shell" ref={shellRef} data-lenis-prevent>
      <div
        className="viewer-stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            stopAuto();
            setFrame((current) => (current + 1) % count);
          }
          if (event.key === "ArrowLeft") {
            stopAuto();
            setFrame((current) => mod(current - 1, count));
          }
        }}
        tabIndex={0}
        role="application"
        aria-label={`${alt}. Drag or swipe horizontally to rotate.`}
      >
        <div className="plinth" />
        <div style={{ transform: `scale(${zoom})`, transition: "transform 0.2s ease" }}>
          {ready ? (
            // Plain img so frame changes stay instant and do not remount through the optimizer.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={frames[frame]} alt={`${alt}, angle ${frame + 1} of ${count}`} draggable={false} />
          ) : (
            <p className="label">Preparing the turntable</p>
          )}
        </div>
        {hint && ready ? (
          <p className="label" style={{ position: "absolute", bottom: "1rem", letterSpacing: "0.18em" }}>
            Drag or swipe to rotate
          </p>
        ) : null}
      </div>
      <div className="viewer-toolbar">
        <div className="group">
          <button className="icon-btn" type="button" aria-label={auto ? "Pause rotation" : "Play rotation"} onClick={() => setAuto((value) => !value)}>
            {auto ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            className="icon-btn"
            type="button"
            aria-label="Reset rotation and zoom"
            onClick={() => {
              stopAuto();
              setFrame(0);
              setZoom(1);
            }}
          >
            <RotateCcw size={16} />
          </button>
          <span className="label">
            {String(frame + 1).padStart(2, "0")} / {count}
          </span>
        </div>
        <div className="group">
          <button className="icon-btn" type="button" aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(1, value - 0.25))}>
            <Minus size={16} />
          </button>
          <button className="icon-btn" type="button" aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(2.6, value + 0.25))}>
            <Plus size={16} />
          </button>
          <button className="icon-btn" type="button" aria-label="Fullscreen" onClick={toggleFullscreen}>
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
