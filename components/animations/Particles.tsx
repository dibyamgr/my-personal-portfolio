"use client"; // Required if using app directory

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle System - Reduced
    const particlesCount = 300; // Reduced from 1500
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015, // Slightly smaller
      color: 0x00ff41,
      transparent: true,
      opacity: 0.4, // More subtle
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // === 3D Geometric Lines - Enhanced ===
    const shapes = [];
    const geometries = [
      new THREE.OctahedronGeometry(1.0),
      new THREE.TetrahedronGeometry(1.0),
      new THREE.IcosahedronGeometry(1.0, 0),
      new THREE.BoxGeometry(1.2, 1.2, 1.2),
    ];

    for (let i = 0; i < 8; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff41,
        wireframe: true,
        transparent: true,
        opacity: 0.6, // More visible
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      );
      const scale = Math.random() * 1.0 + 0.5;
      mesh.scale.set(scale, scale, scale);

      scene.add(mesh);
      shapes.push(mesh);
    }

    // === Mouse Interaction ===
    let mouseX = 0,
      mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener("mousemove", handleMouseMove);

    // === Animation Loop ===
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate particles - subtle movement
      particlesMesh.rotation.y += 0.0003;
      particlesMesh.rotation.x += 0.0002;

      // Animate shapes - Enhanced mouse tracking
      shapes.forEach((shape, index) => {
        // Base rotation
        shape.rotation.x += 0.004 * ((index % 3) + 1);
        shape.rotation.y += 0.005 * ((index % 2) + 1);
        shape.rotation.z += 0.003;

        // Floating effect
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.003;

        // Enhanced mouse tracking - shapes follow mouse more responsively
        const targetRotX = mouseY * 0.8;
        const targetRotY = mouseX * 0.8;

        shape.rotation.x += (targetRotX - shape.rotation.x) * 0.05;
        shape.rotation.y += (targetRotY - shape.rotation.y) * 0.05;

        // Move shapes based on mouse position
        const targetPosX = mouseX * 1.5;
        const targetPosY = -mouseY * 1.5;

        shape.position.x += (targetPosX - shape.position.x) * 0.02;
        shape.position.y += (targetPosY - shape.position.y) * 0.02;
      });

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

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      shapes.forEach((shape) => shape.geometry.dispose());
    };
  }, []);

  return (
    <canvas ref={canvasRef} id="three-canvas" style={{ display: "block" }} />
  );
}
