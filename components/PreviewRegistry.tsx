
import React from 'react';
import ScannerShowcase from './ScannerShowcase';
import LuxeLogin from '@/src/components/component_01';

/**
 * Registry of custom live previews.
 * To add a new component preview, simply add its ID and the React component here.
 */
export const PREVIEW_REGISTRY: Record<string, React.FC<{ key?: any }>> = {
  'E-commerce': (props) => <LuxeLogin {...props} />,
};

interface DynamicPreviewProps {
  componentId: string;
  fallbackUrl: string;
  renderKey: number;
}

export const DynamicPreview: React.FC<DynamicPreviewProps> = ({ componentId, fallbackUrl, renderKey }) => {
  const CustomPreview = PREVIEW_REGISTRY[componentId];

  if (CustomPreview) {
    return <CustomPreview key={renderKey} />;
  }

  // Universal Fallback for components without custom logic
  return (
    <div key={renderKey} className="w-full aspect-video rounded-[3rem] bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden border border-black/5 dark:border-white/5 group relative">
      <img 
        src={fallbackUrl} 
        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000" 
        alt="Component Preview"
      />
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
    </div>
  );
};
