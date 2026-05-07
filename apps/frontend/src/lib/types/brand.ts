export interface Brand {
  id: string;
  userId: string;
  name: string;
  slug: string;
  description: string | null;

  // Brand Identity
  logoUrl: string | null;
  logoThumbnail: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string | null;
  colors: BrandColor[];
  headingFont: string;
  bodyFont: string;
  fontWeights: Record<string, number>;

  // Brand Voice
  brandVoice: string | null;
  brandTagline: string | null;
  brandBio: string | null;

  // AI Metadata
  aiGenerated: boolean;
  generationPrompt: string | null;
  generationModel: string | null;

  // Stats
  brandScore: number;
  productsCount: number;
  mockupsCount: number;

  // Meta
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BrandColor {
  name: string;
  hex: string;
  usage: 'primary' | 'secondary' | 'accent' | 'custom';
}

export interface CreateBrandInput {
  name: string;
  description?: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  colors?: BrandColor[];
  headingFont?: string;
  bodyFont?: string;
  brandVoice?: string;
  brandTagline?: string;
  brandBio?: string;
}

export interface UpdateBrandInput extends Partial<CreateBrandInput> {}

export interface BrandFormData {
  name: string;
  description: string;
  logoFile: File | null;
  logoPreview: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  colors: BrandColor[];
  headingFont: string;
  bodyFont: string;
  brandVoice: string;
  brandTagline: string;
  brandBio: string;
}

export interface BrandScoreBreakdown {
  overall: number;
  colorConsistency: number;
  fontConsistency: number;
  logoUsage: number;
  voiceClarity: number;
}

export interface FontOption {
  family: string;
  category: 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace';
  variants: string[];
}

export interface PaletteSuggestion {
  name: string;
  colors: string[];
  description: string;
}
