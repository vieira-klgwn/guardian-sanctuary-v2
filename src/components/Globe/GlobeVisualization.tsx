import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {OrbitControl} from '@/components/Globe/OrbitControl.js'
import { ThreatData, GuardianData, generateThreats, generateGuardians } from '@/utils/threatData';
import ThreatCard from '../UI/ThreatCard';
import { ArrowUpRight } from 'lucide-react';
import GlobeStats from './GlobeStats';
import GlobeControls from './GlobeControls';
import ThreatBeacons from './ThreatBeacons';
import GuardianBeacons from './GuardianBeacons';


interface GlobeVisualizationProps {
  className?: string;
}

const GlobeVisualization: React.FC<GlobeVisualizationProps> = ({ className = "" }) => {
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const [selectedThreat, setSelectedThreat] = React.useState<ThreatData | null>(null);
  const [threats, setThreats] = React.useState<ThreatData[]>([]);
  const [guardians, setGuardians] = React.useState<GuardianData[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const container = globeContainerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Globe
    const globeRadius = 20;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 32, 32);
    const globeMaterial = new THREE.MeshBasicMaterial({ color: 0x1a2a44, wireframe: false });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    // Controls
    const controls = new OrbitControl(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;

    // Camera position
    camera.position.z = 40;

    // Load Earth texture (optional, add later)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/earth.jpg', (texture) => {
      globeMaterial.map = texture;
      globeMaterial.needsUpdate = true;
    });

    // Mock data
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const threatData = generateThreats(30);
      const guardianData = generateGuardians(20);
      setThreats(threatData);
      setGuardians(guardianData);
      setLoading(false);
      const randomIndex = Math.floor(Math.random() * threatData.length);
      setSelectedThreat(threatData[randomIndex]);
    };
    fetchData();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full max-w-6xl mx-auto ${className}`}>
      <div ref={globeContainerRef} className="h-[70vh] overflow-hidden rounded-xl glassmorphism border border-guardian-cyan/20">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-guardian-cyan/20 border-t-guardian-cyan animate-spin"></div>
          </div>
        ) : (
          <>
            <ThreatBeacons threats={threats} onThreatSelect={setSelectedThreat} />
            <GuardianBeacons guardians={guardians} />
            <GlobeStats threats={threats} guardians={guardians} />
            <GlobeControls />
            {selectedThreat && (
              <div className="absolute right-4 bottom-12 max-w-sm w-full">
                <ThreatCard threat={selectedThreat} />
                <button className="mt-2 w-full text-xs flex items-center justify-center gap-1 p-2 rounded-md bg-guardian-cyan/10 text-guardian-cyan hover:bg-guardian-cyan/20 transition-colors">
                  <span>View All Threats</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GlobeVisualization;