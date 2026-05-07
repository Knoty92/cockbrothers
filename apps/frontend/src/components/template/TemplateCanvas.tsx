import { type Component, For, Show, createSignal, createEffect, onMount } from 'solid-js';
import type { TemplateLayer, TemplateData } from '~/lib/types';

interface TemplateCanvasProps {
  templateData: TemplateData;
  selectedLayerId: string | null;
  zoom: number;
  showGrid?: boolean;
  onLayerSelect: (id: string | null) => void;
  onLayerMove?: (id: string, x: number, y: number) => void;
  onLayerResize?: (id: string, w: number, h: number) => void;
  onCanvasClick?: () => void;
  brandColors?: Record<string, string>;
  brandFonts?: Record<string, string>;
  /** If brand binding is active, show applied colors/fonts */
  applyBrand?: boolean;
}

export const TemplateCanvas: Component<TemplateCanvasProps> = (props) => {
  let containerRef: HTMLDivElement | undefined;

  const [dragging, setDragging] = createSignal<{
    layerId: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  // Canvas dimensions
  const canvasWidth = () => props.templateData.canvasWidth;
  const canvasHeight = () => props.templateData.canvasHeight;

  // Grid rendering
  const gridLines = () => {
    if (!props.showGrid) return { vertical: [], horizontal: [] };
    const gridSize = props.templateData.grid?.size ?? 20;
    const vLines: number[] = [];
    const hLines: number[] = [];
    for (let x = 0; x <= canvasWidth(); x += gridSize) vLines.push(x);
    for (let y = 0; y <= canvasHeight(); y += gridSize) hLines.push(y);
    return { vertical: vLines, horizontal: hLines };
  };

  // Resolve brand binding
  const resolveColor = (layer: TemplateLayer): string | undefined => {
    if (!props.applyBrand || !layer.brandBinding) return undefined;
    if (layer.brandBinding === 'primary_color') return props.brandColors?.primary;
    if (layer.brandBinding === 'secondary_color') return props.brandColors?.secondary;
    if (layer.brandBinding === 'accent_color') return props.brandColors?.accent;
    return layer.color;
  };

  // Layer position style
  const layerStyle = (layer: TemplateLayer) => ({
    position: 'absolute' as const,
    left: `${layer.x}px`,
    top: `${layer.y}px`,
    width: `${layer.width}px`,
    height: `${layer.height}px`,
    opacity: layer.visible ? layer.opacity : 0,
    'z-index': layer.zIndex,
    transform: layer.rotation ? `rotate(${layer.rotation}deg)` : undefined,
    cursor: 'pointer',
    border: props.selectedLayerId === layer.id ? '2px solid #6366f1' : '2px solid transparent',
    'border-radius': '2px',
  });

  // Handle mouse down on layer
  const handleLayerMouseDown = (e: MouseEvent, layerId: string) => {
    e.stopPropagation();
    props.onLayerSelect(layerId);
    const layer = props.templateData.layers.find((l) => l.id === layerId);
    if (!layer || !props.onLayerMove) return;
    setDragging({
      layerId,
      startX: e.clientX,
      startY: e.clientY,
      origX: layer.x,
      origY: layer.y,
    });
  };

  // Mouse move — drag layer
  const handleMouseMove = (e: MouseEvent) => {
    const drag = dragging();
    if (!drag || !props.onLayerMove) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    props.onLayerMove(drag.layerId, drag.origX + dx, drag.origY + dy);
  };

  // Mouse up — stop dragging
  const handleMouseUp = () => {
    setDragging(null);
  };

  // Attach global mouse events during drag
  createEffect(() => {
    if (dragging()) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });

  // Render layer content based on type
  const renderLayerContent = (layer: TemplateLayer) => {
    switch (layer.type) {
      case 'text':
        return (
          <span
            style={{
              'font-family': layer.fontFamily,
              'font-size': `${layer.fontSize}px`,
              'font-weight': layer.fontWeight,
              color: resolveColor(layer) ?? layer.color ?? '#000',
              'text-align': layer.textAlign ?? 'left',
              'word-break': 'break-word',
            }}
          >
            {layer.content || 'Text'}
          </span>
        );

      case 'image':
        return layer.content ? (
          <img
            src={layer.content}
            alt={layer.name}
            class="w-full h-full object-contain"
            draggable={false}
          />
        ) : (
          <div class="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 text-gray-400 text-xs">
            No image
          </div>
        );

      case 'shape':
        return (
          <svg width="100%" height="100%" viewBox={`0 0 ${layer.width} ${layer.height}`}>
            {layer.shapeType === 'circle' ? (
              <circle
                cx={layer.width / 2}
                cy={layer.height / 2}
                r={Math.min(layer.width, layer.height) / 2}
                fill={layer.fillColor ?? '#e5e7eb'}
                stroke={layer.strokeColor ?? 'none'}
                stroke-width={layer.strokeWidth ?? 0}
              />
            ) : (
              <rect
                width="100%"
                height="100%"
                rx={layer.borderRadius ?? 0}
                fill={layer.fillColor ?? '#e5e7eb'}
                stroke={layer.strokeColor ?? 'none'}
                stroke-width={layer.strokeWidth ?? 0}
              />
            )}
          </svg>
        );

      case 'logo':
        return (
          <div class="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );

      case 'brand_color':
        return (
          <div
            style={{ 'background-color': resolveColor(layer) ?? layer.fillColor ?? '#6366f1' }}
            class="w-full h-full"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      class="relative w-full overflow-hidden bg-gray-200 dark:bg-gray-800 rounded-lg"
      style={{ 'min-height': '400px' }}
    >
      {/* Zoom wrapper */}
      <div
        style={{
          transform: `scale(${props.zoom})`,
          'transform-origin': 'top left',
        }}
      >
        {/* Canvas */}
        <div
          ref={containerRef}
          class="relative bg-white dark:bg-gray-900 shadow-lg"
          style={{
            width: `${canvasWidth()}px`,
            height: `${canvasHeight()}px`,
            'background-color': props.templateData.backgroundColor || '#ffffff',
          }}
          onClick={() => props.onCanvasClick?.()}
        >
          {/* Grid overlay */}
          <Show when={props.showGrid}>
            <svg class="absolute inset-0 pointer-events-none" width={canvasWidth()} height={canvasHeight()}>
              {gridLines().vertical.map((x, i) => (
                <line x1={x} y1={0} x2={x} y2={canvasHeight()}
                  stroke="#e5e7eb" stroke-width="0.5" />
              ))}
              {gridLines().horizontal.map((y, i) => (
                <line x1={0} y1={y} x2={canvasWidth()} y2={y}
                  stroke="#e5e7eb" stroke-width="0.5" />
              ))}
            </svg>
          </Show>

          {/* Layers */}
          <For each={[...props.templateData.layers].sort((a, b) => a.zIndex - b.zIndex)}>
            {(layer) => (
              <div
                style={layerStyle(layer)}
                onMouseDown={(e) => handleLayerMouseDown(e, layer.id)}
                class="hover:outline hover:outline-1 hover:outline-indigo-300"
              >
                {renderLayerContent(layer)}
              </div>
            )}
          </For>

          {/* Canvas dimension indicator */}
          <div class="absolute bottom-2 right-2 text-[10px] text-gray-400 dark:text-gray-500 bg-white/80 dark:bg-gray-900/80 px-2 py-0.5 rounded">
            {canvasWidth()} × {canvasHeight()}
          </div>
        </div>
      </div>
    </div>
  );
};
