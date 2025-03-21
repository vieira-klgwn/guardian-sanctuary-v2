// src/components/Globe/GlobeVisualization.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControl } from '@/components/Globe/OrbitControl.js'
import { ThreatData, GuardianData, generateThreats, generateGuardians } from '@/utils/threatData';
import ThreatCard from '../UI/ThreatCard';
import { ArrowUpRight } from 'lucide-react';
import GlobeStats from './GlobeStats';
import GlobeControls from './GlobeControls';

interface GlobeVisualizationProps {
  className?: string;
}

const GlobeVisualization: React.FC<GlobeVisualizationProps> = ({ className = "" }) => {
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const [selectedThreat, setSelectedThreat] = React.useState<ThreatData | null>(null);
  const [threats, setThreats] = React.useState<ThreatData[]>([]);
  const [guardians, setGuardians] = React.useState<GuardianData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControl | null>(null);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const globeRef = useRef<THREE.Mesh | null>(null);
  const beaconsRef = useRef<THREE.Sprite[]>([]);

  useEffect(() => {
    console.log('useEffect triggered (initial setup)');
    const container = globeContainerRef.current;
    if (!container) {
      console.error('Container ref is null');
      setLoading(false);
      return;
    }
    console.log('Container found:', container);

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    console.log('Renderer appended to DOM');

    // Globe
    const globeRadius = 20;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 32, 32);
    const globeMaterial = new THREE.MeshBasicMaterial({ color: 0x1a2a44, wireframe: false });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeRef.current = globe;
    scene.add(globe);
    console.log('Globe added to scene');

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(0, 0, 1).normalize();
    scene.add(directionalLight);

    // Controls
    const controls = new OrbitControl(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;

    // Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/earth.jpg', (texture) => {
      console.log('Texture loaded successfully');
      globeMaterial.map = texture;
      globeMaterial.needsUpdate = true;
    }, undefined, (error) => {
      console.error('Texture loading failed:', error);
      globeMaterial.color.set(0x1a2a44);
    });

    // Fetch and add data with beacons
    const fetchAndAddData = async () => {
      setLoading(true);
      try {
        const threatData = generateThreats(30);
        const guardianData = generateGuardians(20);
        console.log('Generated data:', { threats: threatData.length, guardians: guardianData.length });

        // Validate data
        const validThreats = threatData.filter(t => t.latitude !== undefined && t.longitude !== undefined);
        const validGuardians = guardianData.filter(g => g.latitude !== undefined && g.longitude !== undefined);

        setThreats(validThreats);
        setGuardians(validGuardians);
        console.log('Set state:', { threatsLength: validThreats.length, guardiansLength: validGuardians.length });

        // Clear existing beacons
        beaconsRef.current.forEach(beacon => scene.remove(beacon));
        beaconsRef.current = [];

        // Add threat beacons as children of the globe
        validThreats.forEach((item, index) => {
          const phi = (90 - item.latitude) * (Math.PI / 180);
          const theta = (item.longitude + 180) * (Math.PI / 180);
          const x = -Math.sin(phi) * Math.cos(theta) * globeRadius;
          const y = Math.cos(phi) * globeRadius;
          const z = Math.sin(phi) * Math.sin(theta) * globeRadius;

          const spriteMaterial = new THREE.SpriteMaterial({
            color: new THREE.Color('#EF4444'), // Red for threats
            transparent: true,
            opacity: 0.8,
          });
          const sprite = new THREE.Sprite(spriteMaterial);
          sprite.position.set(x, y, z);
          sprite.scale.set(0.5, 0.5, 1);
          sprite.userData = { type: 'threat', data: item };
          globe.add(sprite); // Parent the sprite to the globe
          beaconsRef.current.push(sprite);
          console.log(`Added threat beacon ${index + 1} at (${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`, item);
        });

        // Add guardian beacons as children of the globe
        validGuardians.forEach((item, index) => {
          const phi = (90 - item.latitude) * (Math.PI / 180);
          const theta = (item.longitude + 180) * (Math.PI / 180);
          const x = -Math.sin(phi) * Math.cos(theta) * globeRadius;
          const y = Math.cos(phi) * globeRadius;
          const z = Math.sin(phi) * Math.sin(theta) * globeRadius;

          const spriteMaterial = new THREE.SpriteMaterial({
            color: new THREE.Color('#64FFDA'), // Cyan for guardians
            transparent: true,
            opacity: 0.5,
          });
          const sprite = new THREE.Sprite(spriteMaterial);
          sprite.position.set(x, y, z);
          sprite.scale.set(0.4, 0.4, 1);
          sprite.userData = { type: 'guardian' };
          globe.add(sprite); // Parent the sprite to the globe
          beaconsRef.current.push(sprite);
          console.log(`Added guardian beacon ${index + 1} at (${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`, item);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        console.log('Loading set to false');
      }
    };
    fetchAndAddData();

    // Click handling
    const onMouseClick = (event: MouseEvent) => {
      event.preventDefault();
      if (!cameraRef.current || !sceneRef.current) return;

      // Adjust mouse coordinates for raycasting
      const rect = container.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, cameraRef.current);
      const intersects = raycaster.current.intersectObjects(globe.children, true); // Check globe's children

      for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object instanceof THREE.Sprite) {
          const userData = intersects[i].object.userData;
          if (userData.type === 'threat') {
            setSelectedThreat(userData.data as ThreatData);
            console.log('Threat selected:', userData.data);
            break;
          }
        }
      }
    };

    container.addEventListener('click', onMouseClick);

    // Handle resize
    const onWindowResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = container.clientWidth / container.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Animation loop with rotation
    const animate = () => {
      requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();
      if (globeRef.current) globeRef.current.rotation.y += 0.001; // Globe rotates, beacons follow
      if (rendererRef.current && cameraRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Cleanup
    return () => {
      container.removeEventListener('click', onMouseClick);
      window.removeEventListener('resize', onWindowResize);
      if (rendererRef.current) rendererRef.current.dispose();
      if (container.contains(rendererRef.current?.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      beaconsRef.current.forEach(beacon => globeRef.current?.remove(beacon));
      console.log('Cleanup executed');
    };
  }, []);

  console.log('Rendering GlobeVisualization', { loading, threatsLength: threats.length, guardiansLength: guardians.length, selectedThreat });

  return (
    <div className={`relative w-full max-w-6xl mx-auto ${className}`}>
      <div ref={globeContainerRef} className="h-[70vh] overflow-hidden rounded-xl glassmorphism border border-guardian-cyan/20">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-guardian-cyan/20 border-t-guardian-cyan animate-spin"></div>
          </div>
        ) : threats.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-guardian-light">
            No data available
          </div>
        ) : (
          <>
            <GlobeStats threats={threats} guardians={guardians} />
            <GlobeControls />
            {selectedThreat && (
              <div className="absolute right-4 bottom-12 max-w-sm w-full">
                <ThreatCard threat={selectedThreat} setSelectedThreat={setSelectedThreat} />
                <button className="mt-2 w-full text-xs flex items-center justify-center gap-1 p-2 rounded-md bg-guardian-cyan/10 text-guardian-cyan hover:bg-guardian-cyan/20 transition-colors">
                  <span>Provide a solution to this threat!</span>
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