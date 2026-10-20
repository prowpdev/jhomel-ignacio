export interface BackgroundPreset {
  id: string;
  name: string;
  category: 'Modern & Clean' | 'Tech & 3D' | 'Cyber & Neon' | 'Dark Textures' | 'Minimalist Luxury' | 'Workspace';
  url: string;
  thumbnail: string;
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: 'liquid-mesh-dark',
    name: '3D Liquid Mesh Dark',
    category: 'Tech & 3D',
    url: '/src/assets/images/bg_dark_liquid_mesh_1792466527701.jpg',
    thumbnail: '/src/assets/images/bg_dark_liquid_mesh_1792466527701.jpg',
  },
  {
    id: 'clean-studio-architectural',
    name: 'Clean Architectural Studio',
    category: 'Modern & Clean',
    url: '/src/assets/images/bg_clean_studio_minimal_1792466529964.jpg',
    thumbnail: '/src/assets/images/bg_clean_studio_minimal_1792466529964.jpg',
  },
  {
    id: 'cyber-isometric-grid',
    name: 'Obsidian Cyber Matrix',
    category: 'Cyber & Neon',
    url: '/src/assets/images/bg_tech_cyber_grid_1792466528746.jpg',
    thumbnail: '/src/assets/images/bg_tech_cyber_grid_1792466528746.jpg',
  },
  {
    id: 'aurora-violet-waves',
    name: 'Deep Aurora Flow',
    category: 'Cyber & Neon',
    url: '/src/assets/images/bg_aurora_violet_waves_1792466527634.jpg',
    thumbnail: '/src/assets/images/bg_aurora_violet_waves_1792466527634.jpg',
  },
  {
    id: 'prism-geometric-glass',
    name: 'Prism Geometry Glass',
    category: 'Tech & 3D',
    url: '/src/assets/images/bg_monochrome_geometric_1792466528956.jpg',
    thumbnail: '/src/assets/images/bg_monochrome_geometric_1792466528956.jpg',
  },
  {
    id: 'gradient-mesh-aura',
    name: 'Vibrant Mesh Aura Glow',
    category: 'Modern & Clean',
    url: '/src/assets/images/bg_gradient_mesh_glow_1792466551372.jpg',
    thumbnail: '/src/assets/images/bg_gradient_mesh_glow_1792466551372.jpg',
  },
  {
    id: 'sand-travertine-luxury',
    name: 'Travertine Architectural Stone',
    category: 'Minimalist Luxury',
    url: '/src/assets/images/bg_minimal_sand_luxury_1792466551096.jpg',
    thumbnail: '/src/assets/images/bg_minimal_sand_luxury_1792466551096.jpg',
  },
  {
    id: 'developer-workstation',
    name: 'Developer Tech Station',
    category: 'Workspace',
    url: '/src/assets/images/bg_cyber_neon_glow_1792466552102.jpg',
    thumbnail: '/src/assets/images/bg_cyber_neon_glow_1792466552102.jpg',
  },
  {
    id: 'titanium-sphere-studio',
    name: 'Titanium Minimalist Studio',
    category: 'Modern & Clean',
    url: '/src/assets/images/bg_dark_titanium_studio_1792466569156.jpg',
    thumbnail: '/src/assets/images/bg_dark_titanium_studio_1792466569156.jpg',
  },
  {
    id: 'carbon-texture-weave',
    name: 'Carbon Precision Dark',
    category: 'Dark Textures',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'modern-glass-facade',
    name: 'Modern Glass Architecture',
    category: 'Minimalist Luxury',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'abstract-prism-refraction',
    name: 'Abstract Ray Refraction',
    category: 'Tech & 3D',
    url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80',
  },
];
