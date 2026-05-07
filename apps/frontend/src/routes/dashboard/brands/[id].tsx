import { onMount, createSignal, Show, Switch, Match } from 'solid-js';
import { useNavigate, useParams } from '@solidjs/router';
import { useBrand } from '~/hooks/useBrand';
import { BrandKitCreator } from '~/components/brand/BrandKitCreator';
import { BrandPreview } from '~/components/brand/BrandPreview';
import { BrandScoreIndicator } from '~/components/brand/BrandScoreIndicator';
import type { BrandFormData, CreateBrandInput, BrandScoreBreakdown } from '~/lib/types/brand';

type Tab = 'edit' | 'preview' | 'score';

export default function BrandDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const brand = useBrand();
  const [tab, setTab] = createSignal<Tab>('edit');
  const [score, setScore] = createSignal<BrandScoreBreakdown | null>(null);
  const [confirmDelete, setConfirmDelete] = createSignal(false);

  onMount(async () => {
    const b = await brand.fetchBrand(params.id);
    if (!b) {
      navigate('/dashboard/brands', { replace: true });
      return;
    }
    brand.populateFormFromBrand(b);
    brand.selectBrand(b.id);

    // Fetch score
    const s = await brand.fetchBrandScore(params.id);
    if (s) setScore(s);
  });

  const activeBrand = () => brand.activeBrand();

  const formData = (): BrandFormData => {
    const f = brand.form();
    return {
      name: f.name,
      description: brand.activeBrand()?.description ?? '',
      logoFile: null,
      logoPreview: f.logoPreview,
      primaryColor: f.primaryColor,
      secondaryColor: f.secondaryColor,
      accentColor: f.accentColor,
      colors: brand.activeBrand()?.colors ?? [],
      headingFont: f.headingFont,
      bodyFont: f.bodyFont,
      brandVoice: f.brandVoice,
      brandTagline: f.brandTagline,
      brandBio: f.brandBio,
    };
  };

  const handleSave = async (data: CreateBrandInput) => {
    const updated = await brand.updateBrand(params.id, data);
    if (updated) {
      setTab('preview');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/brands');
  };

  const handleDelete = async () => {
    const ok = await brand.deleteBrand(params.id);
    if (ok) navigate('/dashboard/brands', { replace: true });
  };

  const handleDuplicate = async () => {
    const dup = await brand.duplicateBrand(params.id);
    if (dup) navigate(`/dashboard/brands/${dup.id}`);
  };

  // Loading
  if (brand.activeBrandLoading()) {
    return (
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="animate-pulse space-y-4">
          <div class="h-8 w-48 rounded bg-gray-100 dark:bg-gray-800" />
          <div class="h-4 w-72 rounded bg-gray-100 dark:bg-gray-800" />
          <div class="h-64 rounded-xl bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>
    );
  }

  return (
    <div class="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Navigation */}
      <div class="flex items-center justify-between">
        <div>
          <button
            type="button"
            onClick={handleCancel}
            class="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-2 transition-colors"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to brands
          </button>

          <Show when={activeBrand()}>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
              {activeBrand()!.name}
              <Show when={activeBrand()!.aiGenerated}>
                <span class="inline-flex items-center gap-0.5 rounded-full bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400">
                  AI Generated
                </span>
              </Show>
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Updated {new Date(activeBrand()!.updatedAt).toLocaleDateString()}
            </p>
          </Show>
        </div>

        {/* Actions */}
        <div class="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDuplicate}
            disabled={brand.creating()}
            class="rounded-xl border border-gray-200 dark:border-gray-600 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Duplicate
          </button>

          <Show
            when={confirmDelete()}
            fallback={
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                class="rounded-xl border border-red-200 dark:border-red-800 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                Delete
              </button>
            }
          >
            <span class="text-xs text-gray-400">Are you sure?</span>
            <button
              type="button"
              onClick={handleDelete}
              disabled={brand.deleting()}
              class="rounded-xl bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 transition-colors"
            >
              {brand.deleting() ? 'Deleting…' : 'Confirm'}
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              class="rounded-xl border border-gray-200 dark:border-gray-600 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
          </Show>
        </div>
      </div>

      {/* Tabs */}
      <div class="flex gap-1 border-b border-gray-100 dark:border-gray-700">
        <TabButton label="Edit" tab="edit" current={tab()} onChange={setTab} />
        <TabButton label="Preview" tab="preview" current={tab()} onChange={setTab} />
        <TabButton label="Consistency Score" tab="score" current={tab()} onChange={setTab} />
      </div>

      {/* Tab content */}
      <Switch>
        <Match when={tab() === 'edit'}>
          <BrandKitCreator
            initialData={formData()}
            isEditing
            onSave={handleSave}
            onCancel={handleCancel}
            saving={Boolean(brand.state.activeBrand && brand.formDirty())}
            error={brand.error()}
          />
        </Match>

        <Match when={tab() === 'preview'}>
          <Show when={activeBrand()}>
            <div class="max-w-lg mx-auto">
              <BrandPreview form={formData()} />
            </div>
          </Show>
        </Match>

        <Match when={tab() === 'score'}>
          <div class="max-w-md mx-auto text-center space-y-6">
            <Show
              when={activeBrand()}
              fallback={
                <p class="text-sm text-gray-500">Loading score data…</p>
              }
            >
              <BrandScoreIndicator
                score={activeBrand()!.brandScore}
                breakdown={score()}
                size="lg"
              />

              <div class="rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 text-left space-y-2 text-sm">
                <h4 class="font-medium text-gray-700 dark:text-gray-300">
                  About brand consistency score
                </h4>
                <p class="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                  The consistency score measures how well your brand identity is
                  maintained across all products and mockups. It evaluates:
                </p>
                <ul class="text-xs text-gray-500 dark:text-gray-400 space-y-1 list-disc list-inside">
                  <li>
                    <strong>Color consistency</strong> — Are brand colors used
                    consistently?
                  </li>
                  <li>
                    <strong>Font usage</strong> — Are heading and body fonts
                    applied correctly?
                  </li>
                  <li>
                    <strong>Logo placement</strong> — Is the logo visible and
                    properly positioned?
                  </li>
                  <li>
                    <strong>Voice clarity</strong> — Is the brand voice
                    maintained in descriptions?
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={async () => {
                  const s = await brand.fetchBrandScore(params.id);
                  if (s) setScore(s);
                }}
                class="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Recalculate score
              </button>
            </Show>
          </div>
        </Match>
      </Switch>
    </div>
  );
}

// --------------------------------------------------------------------------
// Tab sub-component
// --------------------------------------------------------------------------

interface TabButtonProps {
  label: string;
  tab: Tab;
  current: Tab;
  onChange: (t: Tab) => void;
}

function TabButton(props: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={() => props.onChange(props.tab)}
      class={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
        props.current === props.tab
          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
      }`}
    >
      {props.label}
    </button>
  );
}
