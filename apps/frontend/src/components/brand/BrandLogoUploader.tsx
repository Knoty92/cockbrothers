import { createSignal, Show } from 'solid-js';

interface BrandLogoUploaderProps {
  logoPreview: string | null;
  onLogoChange: (file: File | null, previewUrl: string | null) => void;
}

export function BrandLogoUploader(props: BrandLogoUploaderProps) {
  const [dragOver, setDragOver] = createSignal(false);
  const [uploading, setUploading] = createSignal(false);

  const handleFile = (file: File | null) => {
    if (!file) {
      props.onLogoChange(null, null);
      return;
    }

    // Validate
    const validTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      return; // Max 5MB
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      props.onLogoChange(file, url);
      setUploading(false);
    };
    reader.onerror = () => {
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0] ?? null;
    handleFile(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleInputChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    handleFile(file);
  };

  const handleRemove = () => {
    props.onLogoChange(null, null);
  };

  return (
    <div class="space-y-3">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Logo
      </label>

      <Show
        when={props.logoPreview}
        fallback={
          // Drop zone – empty state
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            class={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors cursor-pointer ${
              dragOver()
                ? 'border-blue-400 bg-blue-50/50 dark:bg-blue-950/30'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            <svg
              class="h-10 w-10 text-gray-300 dark:text-gray-600 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width={1.5}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>

            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              {dragOver() ? 'Drop your logo here' : 'Drag & drop your logo'}
            </p>
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
              PNG, JPG, WebP, SVG · Max 5MB
            </p>
            <label class="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Browse files
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleInputChange}
                class="hidden"
              />
            </label>

            <Show when={uploading()}>
              <div class="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-xl backdrop-blur-sm">
                <div class="flex items-center gap-2">
                  <div class="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                  <span class="text-sm text-gray-600">Uploading…</span>
                </div>
              </div>
            </Show>
          </div>
        }
      >
        {/* Preview state */}
        <div class="relative rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden bg-gray-50 dark:bg-gray-900">
          {/* Logo preview */}
          <div class="flex items-center justify-center p-8">
            <img
              src={props.logoPreview!}
              alt="Brand logo preview"
              class="max-h-32 max-w-full object-contain"
            />
          </div>

          {/* Actions bar */}
          <div class="flex items-center justify-between border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2">
            <span class="text-xs text-gray-500">Logo uploaded</span>
            <div class="flex items-center gap-2">
              <label class="cursor-pointer rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Replace
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={handleInputChange}
                  class="hidden"
                />
              </label>
              <button
                type="button"
                onClick={handleRemove}
                class="rounded-lg border border-red-200 dark:border-red-800 px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
