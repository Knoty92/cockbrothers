import { createSignal, Show } from 'solid-js';

interface BrandVoiceEditorProps {
  brandVoice: string;
  brandTagline: string;
  brandBio: string;
  onVoiceChange: (voice: string) => void;
  onTaglineChange: (tagline: string) => void;
  onBioChange: (bio: string) => void;
}

const VOICE_PRESETS = [
  { label: 'Professional', value: 'Professional and authoritative, conveying expertise and trustworthiness.' },
  { label: 'Playful', value: 'Fun, energetic, and approachable. Uses humor and casual language.' },
  { label: 'Minimalist', value: 'Clean, simple, and direct. No fluff, just value.' },
  { label: 'Luxury', value: 'Sophisticated and exclusive. Premium language, aspirational tone.' },
  { label: 'Friendly', value: 'Warm, conversational, and relatable. Speaks like a friend.' },
  { label: 'Bold', value: 'Confident and provocative. Makes strong statements, stands out.' },
  { label: 'Educational', value: 'Informative and helpful. Explains concepts clearly.' },
  { label: 'Edgy', value: 'Rebellious and unconventional. Challenges the status quo.' },
];

export function BrandVoiceEditor(props: BrandVoiceEditorProps) {
  const [taglineChars, setTaglineChars] = createSignal(props.brandTagline.length);
  const [bioChars, setBioChars] = createSignal(props.brandBio.length);

  const handleTaglineChange = (val: string) => {
    props.onTaglineChange(val);
    setTaglineChars(val.length);
  };

  const handleBioChange = (val: string) => {
    props.onBioChange(val);
    setBioChars(val.length);
  };

  return (
    <div class="space-y-6">
      <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
        Brand Voice
      </h3>

      {/* Tagline */}
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Tagline
          <span class="ml-1 text-xs font-normal text-gray-400">(optional)</span>
        </label>
        <div class="relative">
          <input
            type="text"
            value={props.brandTagline}
            onInput={(e) => handleTaglineChange(e.currentTarget.value)}
            placeholder="e.g. Just Do It"
            maxLength={100}
            class="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
          />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {taglineChars()}/100
          </span>
        </div>
      </div>

      {/* Brand Voice */}
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Brand Voice Description
          <span class="ml-1 text-xs font-normal text-gray-400">(optional)</span>
        </label>

        {/* Voice presets */}
        <div class="flex flex-wrap gap-1.5 mb-3">
          <For each={VOICE_PRESETS}>
            {(preset) => (
              <button
                type="button"
                onClick={() => props.onVoiceChange(preset.value)}
                class={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  props.brandVoice === preset.value
                    ? 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                {preset.label}
              </button>
            )}
          </For>
        </div>

        <textarea
          value={props.brandVoice}
          onInput={(e) => props.onVoiceChange(e.currentTarget.value)}
          placeholder="Describe your brand's voice and personality…"
          rows={3}
          class="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors resize-none"
        />
      </div>

      {/* Brand Bio */}
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Brand Bio
          <span class="ml-1 text-xs font-normal text-gray-400">(optional)</span>
        </label>
        <div class="relative">
          <textarea
            value={props.brandBio}
            onInput={(e) => handleBioChange(e.currentTarget.value)}
            placeholder="Short description of your brand for product descriptions, social media, etc…"
            rows={3}
            maxLength={500}
            class="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors resize-none"
          />
          <span class="absolute right-3 bottom-3 text-xs text-gray-400">
            {bioChars()}/500
          </span>
        </div>
      </div>

      {/* Preview card */}
      <Show when={props.brandTagline || props.brandBio}>
        <div class="rounded-xl border border-gray-100 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
          <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Preview
          </p>
          <Show when={props.brandTagline}>
            <p class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
              {props.brandTagline}
            </p>
          </Show>
          <Show when={props.brandBio}>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {props.brandBio}
            </p>
          </Show>
        </div>
      </Show>
    </div>
  );
}
