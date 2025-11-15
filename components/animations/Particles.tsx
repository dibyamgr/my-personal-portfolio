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

    // Particle System
    const particlesCount = 1500;
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
      size: 0.02,
      color: 0x00ff41,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // === Geometric Shapes ===
    const shapes = [];
    const geometries = [
      // new THREE.TorusGeometry(0.7, 0.2, 16, 100),
      new THREE.OctahedronGeometry(0.8),
      new THREE.TetrahedronGeometry(0.8),
      new THREE.IcosahedronGeometry(0.8, 0),
      // new THREE.SphereGeometry(0.6, 32, 32),
    ];

    for (let i = 0; i < 15; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff41,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );
      const scale = Math.random() * 0.8 + 0.4;
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

      // Animate particles
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0003;
      if (Math.abs(mouseX) > 0) {
        particlesMesh.rotation.y += mouseX * 0.002;
        particlesMesh.rotation.x += mouseY * 0.002;
      }

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.002 * ((index % 3) + 1);
        shape.rotation.y += 0.003 * ((index % 2) + 1);
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;

        if (Math.abs(mouseX) > 0) {
          shape.rotation.x += mouseY * 0.005;
          shape.rotation.y += mouseX * 0.005;
        }
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
