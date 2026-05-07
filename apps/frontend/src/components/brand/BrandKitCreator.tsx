import { createSignal, Show, For } from 'solid-js';
import type { BrandFormData, PaletteSuggestion, CreateBrandInput } from '~/lib/types/brand';
import { BrandLogoUploader } from './BrandLogoUploader';
import { BrandColorPicker } from './BrandColorPicker';
import { BrandFontSelector } from './BrandFontSelector';
import { BrandVoiceEditor } from './BrandVoiceEditor';
import { BrandPreview } from './BrandPreview';

type Step = 'name' | 'logo' | 'colors' | 'fonts' | 'voice' | 'review';

const STEPS: { id: Step; label: string; icon: string }[] = [
  { id: 'name', label: 'Name', icon: '✏️' },
  { id: 'logo', label: 'Logo', icon: '🖼️' },
  { id: 'colors', label: 'Colors', icon: '🎨' },
  { id: 'fonts', label: 'Fonts', icon: '🔤' },
  { id: 'voice', label: 'Voice', icon: '🎙️' },
  { id: 'review', label: 'Review', icon: '✅' },
];

interface BrandKitCreatorProps {
  initialData?: BrandFormData;
  isEditing?: boolean;
  onSave: (data: CreateBrandInput) => Promise<void>;
  onCancel?: () => void;
  saving?: boolean;
  error?: string | null;
}

export function BrandKitCreator(props: BrandKitCreatorProps) {
  const [step, setStep] = createSignal<Step>(props.initialData ? 'name' : 'name');
  const [form, setForm] = createSignal<BrandFormData>(
    props.initialData ?? {
      name: '',
      description: '',
      logoFile: null,
      logoPreview: null,
      primaryColor: '#000000',
      secondaryColor: '#FFFFFF',
      accentColor: '#3B82F6',
      colors: [],
      headingFont: 'Inter',
      bodyFont: 'Inter',
      brandVoice: '',
      brandTagline: '',
      brandBio: '',
    },
  );
  const [validationErrors, setValidationErrors] = createSignal<Record<string, string>>({});

  const currentStepIndex = () => STEPS.findIndex((s) => s.id === step());

  const canProceed = () => {
    const data = form();
    switch (step()) {
      case 'name':
        return data.name.trim().length > 0;
      case 'logo':
        return true; // optional
      case 'colors':
        return data.primaryColor.length === 7 && data.secondaryColor.length === 7;
      case 'fonts':
        return data.headingFont.length > 0 && data.bodyFont.length > 0;
      case 'voice':
        return true; // optional
      case 'review':
        return true;
    }
  };

  const isLastStep = () => step() === 'review';

  const nextStep = () => {
    if (!canProceed()) return;
    const idx = currentStepIndex();
    if (idx < STEPS.length - 1) {
      setStep(STEPS[idx + 1].id);
    }
  };

  const prevStep = () => {
    const idx = currentStepIndex();
    if (idx > 0) {
      setStep(STEPS[idx - 1].id);
    }
  };

  const goToStep = (s: Step) => {
    // Allow going back freely, but forward only if prior steps are valid
    const targetIdx = STEPS.findIndex((st) => st.id === s);
    if (targetIdx <= currentStepIndex()) {
      setStep(s);
    }
  };

  const updateForm = (patch: Partial<BrandFormData>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    // Clear validation error for patched field
    const keys = Object.keys(patch);
    if (keys.length > 0) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        keys.forEach((k) => delete next[k]);
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const data = form();
    const errors: Record<string, string> = {};

    if (!data.name.trim()) errors.name = 'Brand name is required';
    if (data.name.length > 100) errors.name = 'Brand name must be under 100 characters';
    if (!/^#[0-9a-fA-F]{6}$/.test(data.primaryColor))
      errors.primaryColor = 'Invalid primary color';
    if (!/^#[0-9a-fA-F]{6}$/.test(data.secondaryColor))
      errors.secondaryColor = 'Invalid secondary color';
    if (data.accentColor && !/^#[0-9a-fA-F]{6}$/.test(data.accentColor))
      errors.accentColor = 'Invalid accent color';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      setStep('review');
      return;
    }

    const data = form();
    await props.onSave({
      name: data.name,
      description: data.description || undefined,
      primaryColor: data.primaryColor,
      secondaryColor: data.secondaryColor,
      accentColor: data.accentColor || undefined,
      headingFont: data.headingFont,
      bodyFont: data.bodyFont,
      brandVoice: data.brandVoice || undefined,
      brandTagline: data.brandTagline || undefined,
      brandBio: data.brandBio || undefined,
    });
  };

  const handleAISuggestPalette = async (): Promise<PaletteSuggestion[]> => {
    // AI palette suggestion – in MVP returns static suggestions based on primary color
    const { primaryColor } = form();
    const suggestions: PaletteSuggestion[] = [
      {
        name: 'Ocean Breeze',
        colors: ['#0EA5E9', '#0284C7', '#38BDF8', '#7DD3FC', '#BAE6FD'],
        description: 'Cool blue tones, professional and calm',
      },
      {
        name: 'Forest Earth',
        colors: ['#059669', '#047857', '#34D399', '#A7F3D0', '#6EE7B7'],
        description: 'Natural greens, organic and grounded',
      },
      {
        name: 'Sunset Warmth',
        colors: ['#EA580C', '#D97706', '#F97316', '#FB923C', '#FCD34D'],
        description: 'Warm oranges, energetic and inviting',
      },
    ];

    // Simulate AI delay
    await new Promise((r) => setTimeout(r, 600));
    return suggestions;
  };

  return (
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
      {/* Left: Steps + form */}
      <div class="lg:col-span-3 space-y-6">
        {/* Step indicator */}
        <nav class="flex items-center gap-0.5">
          <For each={STEPS}>
            {(s, i) => (
              <>
                <button
                  type="button"
                  onClick={() => goToStep(s.id)}
                  class={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    step() === s.id
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                      : i() < currentStepIndex()
                        ? 'text-green-600 dark:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-600'
                  }`}
                >
                  <span>{s.icon}</span>
                  <span class="hidden sm:inline">{s.label}</span>
                </button>
                <Show when={i() < STEPS.length - 1}>
                  <div class="h-px flex-1 bg-gray-200 dark:bg-gray-700 mx-1" />
                </Show>
              </>
            )}
          </For>
        </nav>

        {/* Form sections */}
        <div class="space-y-6">
          {/* Step: Name */}
          <Show when={step() === 'name'}>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Brand name <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form().name}
                  onInput={(e) => updateForm({ name: e.currentTarget.value })}
                  placeholder="e.g. Acme Corporation"
                  maxLength={100}
                  class={`w-full rounded-xl border bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:ring-2 outline-none transition-colors ${
                    validationErrors().name
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  autofocus
                />
                <Show when={validationErrors().name}>
                  <p class="text-xs text-red-500 mt-1">{validationErrors().name}</p>
                </Show>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Description
                  <span class="ml-1 text-xs font-normal text-gray-400">(optional)</span>
                </label>
                <textarea
                  value={form().description}
                  onInput={(e) => updateForm({ description: e.currentTarget.value })}
                  placeholder="What does your brand do?"
                  rows={3}
                  class="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </Show>

          {/* Step: Logo */}
          <Show when={step() === 'logo'}>
            <BrandLogoUploader
              logoPreview={form().logoPreview}
              onLogoChange={(file, preview) =>
                updateForm({ logoFile: file, logoPreview: preview })
              }
            />
          </Show>

          {/* Step: Colors */}
          <Show when={step() === 'colors'}>
            <div class="space-y-5">
              <BrandColorPicker
                label="Primary color"
                value={form().primaryColor}
                onChange={(hex) => updateForm({ primaryColor: hex })}
                showAISuggest
                onAISuggest={handleAISuggestPalette}
              />
              <BrandColorPicker
                label="Secondary color"
                value={form().secondaryColor}
                onChange={(hex) => updateForm({ secondaryColor: hex })}
              />
              <BrandColorPicker
                label="Accent color"
                value={form().accentColor}
                onChange={(hex) => updateForm({ accentColor: hex })}
              />
            </div>
          </Show>

          {/* Step: Fonts */}
          <Show when={step() === 'fonts'}>
            <BrandFontSelector
              headingFont={form().headingFont}
              bodyFont={form().bodyFont}
              onHeadingChange={(f) => updateForm({ headingFont: f })}
              onBodyChange={(f) => updateForm({ bodyFont: f })}
            />
          </Show>

          {/* Step: Voice */}
          <Show when={step() === 'voice'}>
            <BrandVoiceEditor
              brandVoice={form().brandVoice}
              brandTagline={form().brandTagline}
              brandBio={form().brandBio}
              onVoiceChange={(v) => updateForm({ brandVoice: v })}
              onTaglineChange={(t) => updateForm({ brandTagline: t })}
              onBioChange={(b) => updateForm({ brandBio: b })}
            />
          </Show>

          {/* Step: Review */}
          <Show when={step() === 'review'}>
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Review your brand kit
              </h3>

              <Show when={props.error}>
                <div class="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                  {props.error}
                </div>
              </Show>

              <div class="rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">Brand name</span>
                  <span class="font-medium text-gray-900 dark:text-gray-100">
                    {form().name}
                  </span>
                </div>
                <Show when={form().description}>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Description</span>
                    <span class="text-gray-700 dark:text-gray-300 text-right max-w-[60%]">
                      {form().description}
                    </span>
                  </div>
                </Show>
                <div class="flex justify-between items-center">
                  <span class="text-gray-500">Colors</span>
                  <div class="flex gap-1">
                    <div
                      class="h-4 w-4 rounded"
                      style={{ 'background-color': form().primaryColor }}
                    />
                    <div
                      class="h-4 w-4 rounded"
                      style={{ 'background-color': form().secondaryColor }}
                    />
                    <div
                      class="h-4 w-4 rounded"
                      style={{ 'background-color': form().accentColor }}
                    />
                  </div>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Fonts</span>
                  <span class="text-gray-700 dark:text-gray-300">
                    {form().headingFont} + {form().bodyFont}
                  </span>
                </div>
                <Show when={form().brandTagline}>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Tagline</span>
                    <span class="text-gray-700 dark:text-gray-300 italic">
                      "{form().brandTagline}"
                    </span>
                  </div>
                </Show>
              </div>

              {/* Validation errors */}
              <Show when={Object.keys(validationErrors()).length > 0}>
                <div class="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 space-y-1">
                  <p class="text-xs font-medium text-amber-700 dark:text-amber-400">
                    Please fix the following
                  </p>
                  <For each={Object.entries(validationErrors())}>
                    {([field, msg]) => (
                      <p class="text-xs text-amber-600 dark:text-amber-500">
                        • {field}: {msg}
                      </p>
                    )}
                  </For>
                </div>
              </Show>
            </div>
          </Show>
        </div>

        {/* Navigation buttons */}
        <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div class="flex gap-2">
            <Show when={currentStepIndex() > 0}>
              <button
                type="button"
                onClick={prevStep}
                class="rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Back
              </button>
            </Show>
            <Show when={props.onCancel}>
              <button
                type="button"
                onClick={props.onCancel}
                class="rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </Show>
          </div>

          <Show
            when={isLastStep()}
            fallback={
              <button
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
                class="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Continue
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            }
          >
            <button
              type="button"
              onClick={handleSave}
              disabled={props.saving}
              class="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60 transition-colors"
            >
              <Show
                when={props.saving}
                fallback={
                  <>
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {props.isEditing ? 'Save changes' : 'Create brand'}
                  </>
                }
              >
                <div class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving…
              </Show>
            </button>
          </Show>
        </div>
      </div>

      {/* Right: Live preview */}
      <div class="lg:col-span-2">
        <div class="lg:sticky lg:top-6">
          <BrandPreview form={form()} />
        </div>
      </div>
    </div>
  );
}
