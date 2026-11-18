"use client";

import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Component, Suspense, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Maximize2, Pause, Play, RotateCcw } from "lucide-react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { demoModel } from "@/data/viewers";

class ModelBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function FittedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    const group = ref.current;
    if (!group) return;
    group.scale.setScalar(1);
    group.position.set(0, 0, 0);
    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const max = Math.max(size.x, size.y, size.z) || 1;
    const scale = 1.7 / max;
    group.scale.setScalar(scale);
    group.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }, [scene]);

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}

function StudioRing() {
  return (
    <group rotation={[0.25, 0.6, 0.08]} position={[0, 0.05, 0]}>
      <mesh rotation={[Math.PI / 2.35, 0, 0]}>
        <torusGeometry args={[0.78, 0.105, 64, 180]} />
        <meshPhysicalMaterial color="#d7b56a" metalness={1} roughness={0.18} clearcoat={0.35} clearcoatRoughness={0.25} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <octahedronGeometry args={[0.24, 0]} />
        <meshPhysicalMaterial color="#f7f4ef" metalness={0.05} roughness={0.04} transmission={0.92} thickness={0.5} ior={2.2} transparent />
      </mesh>
      <mesh position={[0, 0.68, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.12, 6]} />
        <meshPhysicalMaterial color="#e2c78a" metalness={1} roughness={0.22} />
      </mesh>
    </group>
  );
}

function Rig({ zoom, auto, resetKey }: { zoom: number; auto: boolean; resetKey: number }) {
  const { camera } = useThree();
  const controls = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    camera.position.set(0, 0.55, 3.5 / zoom);
    controls.current?.update();
  }, [zoom, camera, resetKey]);

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      autoRotate={auto}
      autoRotateSpeed={0.65}
      minDistance={1.8}
      maxDistance={6}
      minPolarAngle={0.6}
      maxPolarAngle={1.45}
    />
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <spotLight position={[4, 6, 4]} intensity={28} angle={0.45} penumbra={0.8} color="#fff6e8" />
      <spotLight position={[-4, 2, -2]} intensity={12} color="#e7d2a4" />
      <directionalLight position={[0, 2, 5]} intensity={1.4} />
      <ContactShadows position={[0, -0.95, 0]} opacity={0.35} scale={6} blur={2.4} far={2.4} color="#2c2118" />
    </>
  );
}

export function ModelCanvas({ mode }: { mode: "procedural" | "glb" }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [auto, setAuto] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [resetKey, setResetKey] = useState(0);
  const [interacted, setInteracted] = useState(false);

  async function toggleFullscreen() {
    const shell = shellRef.current;
    if (!shell) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await shell.requestFullscreen();
  }

  return (
    <div ref={shellRef} data-lenis-prevent>
      <div
        className="canvas-wrap"
        onPointerDown={() => {
          if (!interacted) {
            setInteracted(true);
            setAuto(false);
          }
        }}
      >
        <ModelBoundary
          fallback={
            <div className="viewer-fallback">
              <p>The demonstration model file could not be opened. The studio ring study is still available beside it.</p>
            </div>
          }
        >
          <Suspense fallback={<div className="viewer-fallback">Loading the 3D study…</div>}>
            <Canvas camera={{ position: [0, 0.55, 3.5], fov: 35 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
              <Lights />
              {mode === "glb" ? <FittedModel url={demoModel.url} /> : <StudioRing />}
              <Rig zoom={zoom} auto={auto} resetKey={resetKey} />
            </Canvas>
          </Suspense>
        </ModelBoundary>
      </div>
      <div className="viewer-toolbar">
        <div className="group">
          <button className="icon-btn" type="button" aria-label={auto ? "Pause rotation" : "Play rotation"} onClick={() => setAuto((value) => !value)}>
            {auto ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            className="icon-btn"
            type="button"
            aria-label="Reset view"
            onClick={() => {
              setAuto(false);
              setZoom(1);
              setResetKey((value) => value + 1);
            }}
          >
            <RotateCcw size={16} />
          </button>
          <span className="label">{mode === "glb" ? "Model file" : "Studio study"}</span>
        </div>
        <div className="group">
          <button className="icon-btn" type="button" aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(0.7, value - 0.15))}>
            −
          </button>
          <button className="icon-btn" type="button" aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(1.8, value + 0.15))}>
            +
          </button>
          <button className="icon-btn" type="button" aria-label="Fullscreen" onClick={toggleFullscreen}>
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

useGLTF.preload(demoModel.url);
