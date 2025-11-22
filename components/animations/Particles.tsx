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

    // Renderer - optimized settings
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: false, // Disable for better performance
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Limit pixel ratio

    // Reduced Particle System (from 1500 to 400)
    const particlesCount = 400;
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
      size: 0.025,
      color: 0x00ff41,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Reduced Geometric Shapes (from 15 to 5)
    const shapes = [];
    const geometries = [
      new THREE.OctahedronGeometry(0.6),
      new THREE.TetrahedronGeometry(0.6),
      new THREE.IcosahedronGeometry(0.6, 0),
    ];

    for (let i = 0; i < 5; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff41,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      );
      const scale = Math.random() * 0.6 + 0.3;
      mesh.scale.set(scale, scale, scale);

      scene.add(mesh);
      shapes.push(mesh);
    }

    // Simplified mouse interaction
    let mouseX = 0,
      mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener("mousemove", handleMouseMove);

    // Animation Loop with FPS limiting
    let lastTime = 0;
    const fps = 30; // Limit to 30 FPS for better performance
    const interval = 1000 / fps;

    const animate = (currentTime) => {
      requestAnimationFrame(animate);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < interval) return;
      lastTime = currentTime - (deltaTime % interval);

      // Smooth mouse interaction
      targetRotationY += 0.0003;
      targetRotationX += 0.0002;

      if (Math.abs(mouseX) > 0.01) {
        targetRotationY += mouseX * 0.001;
        targetRotationX += mouseY * 0.001;
      }

      particlesMesh.rotation.y = targetRotationY;
      particlesMesh.rotation.x = targetRotationX;

      // Simplified shape animation
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.001;
        shape.rotation.y += 0.0015;
      });

      renderer.render(scene, camera);
    };
    animate(0);

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
      shapes.forEach((shape) => {
        shape.geometry.dispose();
        shape.material.dispose();
      });
    };
  }, []);

  return (
    <canvas ref={canvasRef} id="three-canvas" style={{ display: "block" }} />
  );
}
