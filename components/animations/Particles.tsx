"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer with enhanced settings
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Enhanced Particle System with multiple layers
    const createParticleLayer = (count: number, size: number, color: number, spread: number) => {
      const geometry = new THREE.BufferGeometry();
      const posArray = new Float32Array(count * 3);
      const velocityArray = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * spread;
        posArray[i + 1] = (Math.random() - 0.5) * spread;
        posArray[i + 2] = (Math.random() - 0.5) * spread;

        velocityArray[i] = (Math.random() - 0.5) * 0.02;
        velocityArray[i + 1] = (Math.random() - 0.5) * 0.02;
        velocityArray[i + 2] = (Math.random() - 0.5) * 0.02;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

      const material = new THREE.PointsMaterial({
        size: size,
        color: color,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const mesh = new THREE.Points(geometry, material);
      return { mesh, velocities: velocityArray };
    };

    const layer1 = createParticleLayer(2000, 0.03, 0x00e1ff, 15);
    const layer2 = createParticleLayer(1000, 0.05, 0xb968ff, 12);
    const layer3 = createParticleLayer(500, 0.08, 0xff006e, 10);

    scene.add(layer1.mesh);
    scene.add(layer2.mesh);
    scene.add(layer3.mesh);

    // Geometric Shapes with more variety
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.OctahedronGeometry(0.8),
      new THREE.TetrahedronGeometry(0.8),
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.TorusGeometry(0.5, 0.2, 16, 100),
      new THREE.DodecahedronGeometry(0.7),
    ];

    for (let i = 0; i < 20; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x00e1ff : i % 3 === 1 ? 0xb968ff : 0xff006e,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      const scale = Math.random() * 1.2 + 0.3;
      mesh.scale.set(scale, scale, scale);

      scene.add(mesh);
      shapes.push(mesh);
    }

    // Add ambient lights for more depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00e1ff, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xb968ff, 1, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener("mousemove", handleMouseMove);

    // Wave effect for particles
    const createWaveEffect = (time: number, positions: Float32Array) => {
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        positions[i + 1] += Math.sin(time * 0.001 + x * 0.5) * 0.01 + Math.cos(time * 0.001 + z * 0.5) * 0.01;
      }
    };

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Animate particle layers with wave effect
      [layer1, layer2, layer3].forEach((layer, index) => {
        const positions = layer.mesh.geometry.attributes.position.array as Float32Array;

        // Wave effect
        createWaveEffect(elapsedTime * (index + 1), positions);

        // Rotation
        layer.mesh.rotation.y += 0.0003 * (index + 1);
        layer.mesh.rotation.x += 0.0002 * (index + 1);

        // Mouse interaction
        if (Math.abs(mouseX) > 0) {
          layer.mesh.rotation.y += mouseX * 0.001 * (index + 1);
          layer.mesh.rotation.x += mouseY * 0.001 * (index + 1);
        }

        layer.mesh.geometry.attributes.position.needsUpdate = true;
      });

      // Animate shapes with organic movement
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.001 * ((index % 3) + 1);
        shape.rotation.y += 0.002 * ((index % 2) + 1);

        // Floating animation
        shape.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.003;
        shape.position.x += Math.cos(elapsedTime * 0.3 + index) * 0.002;

        // Mouse interaction
        if (Math.abs(mouseX) > 0) {
          shape.rotation.x += mouseY * 0.003;
          shape.rotation.y += mouseX * 0.003;
        }

        // Pulsing opacity
        if (shape.material instanceof THREE.MeshBasicMaterial) {
          shape.material.opacity = 0.15 + Math.sin(elapsedTime + index) * 0.1;
        }
      });

      // Animate lights for dynamic ambiance
      pointLight1.position.x = Math.sin(elapsedTime * 0.5) * 5;
      pointLight1.position.y = Math.cos(elapsedTime * 0.3) * 5;

      pointLight2.position.x = Math.cos(elapsedTime * 0.4) * 5;
      pointLight2.position.y = Math.sin(elapsedTime * 0.6) * 5;

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Theme change support
    const handleThemeChange = () => {
      const theme = document.body.getAttribute("data-theme");
      if (theme === "light") {
        // Lighter, softer colors for light mode
        (layer1.mesh.material as THREE.PointsMaterial).color.set(0xff6b9d);
        (layer2.mesh.material as THREE.PointsMaterial).color.set(0xffa07a);
        (layer3.mesh.material as THREE.PointsMaterial).color.set(0xb19cd9);
      } else {
        // Original vibrant colors for dark mode
        (layer1.mesh.material as THREE.PointsMaterial).color.set(0x00e1ff);
        (layer2.mesh.material as THREE.PointsMaterial).color.set(0xb968ff);
        (layer3.mesh.material as THREE.PointsMaterial).color.set(0xff006e);
      }
    };

    // Listen for theme changes
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      renderer.dispose();
      layer1.mesh.geometry.dispose();
      layer2.mesh.geometry.dispose();
      layer3.mesh.geometry.dispose();
      (layer1.mesh.material as THREE.Material).dispose();
      (layer2.mesh.material as THREE.Material).dispose();
      (layer3.mesh.material as THREE.Material).dispose();
      shapes.forEach((shape) => {
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <canvas ref={canvasRef} id="three-canvas" style={{ display: "block" }} />
  );
}
