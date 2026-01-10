
export interface UIComponent {
  id: string;
  name: string;
  installs: string;
  isPaid: boolean;
  category: string;
  previewUrl: string;
  videoUrl?: string;
  fullDescription?: string;
  codeSnippet?: string;
  techStack?: string[];
  Dependencies?:string[];
}

export interface Template {
  id: string;
  name: string;
  useCase: string;
  description?: string;
  isPaid: boolean;
  previewUrl: string; // fallback
  previewImages: string[]; // 3 images for the new layout
  videoUrl?: string;
  techStack?: string[];
}
