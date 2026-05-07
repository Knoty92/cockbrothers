/**
 * PushToPODModal — modal dialog for pushing product designs
 * to a connected POD platform.
 *
 * Steps:
 * 1. Select platform (if not pre-selected)
 * 2. Select external product from platform catalog
 * 3. Map print areas (front, back, etc.) to generated mockups
 * 4. Configure title, description, tags
 * 5. Push → track progress
 */

import {
  Component,
  createSignal,
  createMemo,
  For,
  Show,
  onMount,
} from 'solid-js';
import { integrationStore } from '../../stores/integrationStore';
import { uiStore } from '../../stores/uiStore';
import type {
  PODPlatform,
  PODProduct,
  PODPushResult,
} from '../../lib/pod/types';

interface PushToPODModalProps {
  /** Pre-selected product ID from Cockbrothers */
  productId: string;
  /** Available mockup URLs (front, back, etc.) */
  mockups: { position: string; url: string }[];
  /** Product title */
  title: string;
  /** Product description */
  description: string;
  /** Tags */
  tags: string[];
  /** Called when the push finishes */
  onComplete?: (result: PODPushResult) => void;
  /** Called when the modal is closed */
  onClose?: () => void;
}

type Step = 'select-platform' | 'select-product' | 'configure' | 'pushing' | 'done';

const PLATFORM_LABELS: Record<PODPlatform, string> = {
  printful: 'Printful',
  printify: 'Printify',
  shopify: 'Shopify',
  etsy: 'Etsy',
  gelato: 'Gelato',
  spod: 'SPOD',
};

export const PushToPODModal: Component<PushToPODModalProps> = (props) => {
  const [step, setStep] = createSignal<Step>('select-platform');
  const [platform, setPlatform] = createSignal<PODPlatform | null>(null);
  const [product, setProduct] = createSignal<PODProduct | null>(null);
  const [editTitle, setEditTitle] = createSignal(props.title);
  const [editDesc, setEditDesc] = createSignal(props.description);
  const [editTags, setEditTags] = createSignal(props.tags.join(', '));
  const [publish, setPublish] = createSignal(true);
  const [pushResult, setPushResult] = createSignal<PODPushResult | null>(null);

  // Available connected platforms
  const platforms = createMemo(() =>
    integrationStore.state.integrations.filter((i) => i.isActive),
  );

  // Platform product catalog
  const catalog = () =>
    platform() ? integrationStore.getCatalog(platform()!) ?? [] : [];

  const handlePush = async () => {
    if (!platform()) return;

    setStep('pushing');

    const mockupMapping = props.mockups.map((m) => ({
      externalVariantId: product()?.variants[0]?.id ?? '',
      mockupUrl: m.url,
      position: m.position,
    }));

    const result = await integrationStore.pushDesigns(platform()!, {
      productId: props.productId,
      externalProductId: product()?.id ?? '',
      variantMapping: mockupMapping,
      title: editTitle(),
      description: editDesc(),
      tags: editTags()
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      publish: publish(),
    });

    if (result) {
      setPushResult(result);
      setStep('done');
      props.onComplete?.(result);
    }
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="w-full max-w-2xl rounded-xl bg-white shadow-2xl dark:bg-gray-800">
        {/* Header */}
        <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Push to POD
          </h2>
          <button
            onClick={() => {
              props.onClose?.();
              uiStore.closeModal();
            }}
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div class="p-6">
          {/* Step indicator */}
          <div class="mb-6 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <StepDot num={1} label="Platform" active={step() !== 'select-platform'} />
            <StepArrow />
            <StepDot num={2} label="Product" active={step() === 'configure' || step() === 'pushing' || step() === 'done'} />
            <StepArrow />
            <StepDot num={3} label="Configure" active={step() === 'pushing' || step() === 'done'} />
            <StepArrow />
            <StepDot num={4} label="Push" active={step() === 'done'} />
          </div>

          {/* Step 1: Select Platform */}
          <Show when={step() === 'select-platform'}>
            <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Select a connected POD platform to push this design to:
            </p>
            <div class="grid grid-cols-2 gap-3">
              <For each={platforms()}>
                {(pl) => (
                  <button
                    onClick={() => {
                      setPlatform(pl.platform);
                      integrationStore.fetchCatalog(pl.platform);
                      setStep('select-product');
                    }}
                    class="rounded-lg border-2 border-gray-200 p-4 text-left hover:border-indigo-400 hover:bg-indigo-50 dark:border-gray-600 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/30"
                  >
                    <div class="flex items-center gap-3">
                      <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-lg font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                        {PLATFORM_LABELS[pl.platform]?.[0] ?? '?'}
                      </div>
                      <div>
                        <p class="font-medium text-gray-900 dark:text-gray-100">
                          {PLATFORM_LABELS[pl.platform]}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          {pl.displayName ?? pl.platformStoreId}
                        </p>
                      </div>
                    </div>
                  </button>
                )}
              </For>
            </div>
          </Show>

          {/* Step 2: Select Product */}
          <Show when={step() === 'select-product'}>
            <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Select the product type on {platform() ? PLATFORM_LABELS[platform()!] : 'the platform'}:
            </p>
            <For each={catalog()}>
              {(p) => (
                <button
                  onClick={() => {
                    setProduct(p);
                    setStep('configure');
                  }}
                  class="w-full rounded-lg border border-gray-200 p-3 text-left hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <p class="font-medium text-gray-900 dark:text-gray-100">{p.name}</p>
                  <p class="text-xs text-gray-500">{p.variants.length} variants</p>
                </button>
              )}
            </For>
          </Show>

          {/* Step 3: Configure + Push */}
          <Show when={step() === 'configure'}>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  type="text"
                  value={editTitle()}
                  onInput={(e) => setEditTitle(e.currentTarget.value)}
                  class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  value={editDesc()}
                  onInput={(e) => setEditDesc(e.currentTarget.value)}
                  rows={3}
                  class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={editTags()}
                  onInput={(e) => setEditTags(e.currentTarget.value)}
                  class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <Show when={props.mockups.length > 0}>
                <div>
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mockups to push</p>
                  <div class="flex gap-2">
                    <For each={props.mockups}>
                      {(m) => (
                        <div class="relative h-20 w-20 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700">
                          <img src={m.url} alt={m.position} class="h-full w-full object-cover" />
                          <span class="absolute bottom-0 left-0 right-0 bg-black/50 px-1 text-[10px] text-white text-center truncate">
                            {m.position}
                          </span>
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              </Show>
              <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={publish()}
                  onChange={(e) => setPublish(e.currentTarget.checked)}
                  class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                Publish immediately
              </label>
              <div class="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setStep('select-product')}
                  class="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Back
                </button>
                <button
                  onClick={handlePush}
                  class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Push to {platform() ? PLATFORM_LABELS[platform()!] : 'POD'}
                </button>
              </div>
            </div>
          </Show>

          {/* Step 4: Pushing */}
          <Show when={step() === 'pushing'}>
            <div class="flex flex-col items-center justify-center py-12">
              <svg class="h-12 w-12 animate-spin text-indigo-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">Pushing designs to {platform() ? PLATFORM_LABELS[platform()!] : 'POD'}...</p>
            </div>
          </Show>

          {/* Step 5: Done */}
          <Show when={step() === 'done'}>
            <div class="flex flex-col items-center py-8">
              <div class={`flex h-16 w-16 items-center justify-center rounded-full ${pushResult()?.success ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                <Show when={pushResult()?.success} fallback={
                  <svg class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                }>
                  <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </Show>
              </div>
              <h3 class="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {pushResult()?.success ? 'Push successful!' : 'Push failed'}
              </h3>
              <Show when={pushResult()?.success && pushResult()?.externalUrl}>
                <a
                  href={pushResult()!.externalUrl}
                  target="_blank"
                  class="mt-2 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  View on {platform() ? PLATFORM_LABELS[platform()!] : 'platform'} →
                </a>
              </Show>
              <Show when={pushResult()?.errors && pushResult()!.errors!.length > 0}>
                <div class="mt-4 space-y-1">
                  <For each={pushResult()!.errors}>
                    {(err) => (
                      <p class="text-sm text-red-500">
                        Variant {err.variantId}: {err.message}
                      </p>
                    )}
                  </For>
                </div>
              </Show>
              <button
                onClick={() => { props.onClose?.(); uiStore.closeModal(); }}
                class="mt-6 rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Done
              </button>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
};

/* ─── Step indicator sub-components ─────────────────────────── */

function StepDot(props: { num: number; label: string; active: boolean }) {
  return (
    <div class={`flex items-center gap-1.5 ${props.active ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
      <div class={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
        props.active
          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
          : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
      }`}>
        {props.active ? '✓' : props.num}
      </div>
      <span>{props.label}</span>
    </div>
  );
}

function StepArrow() {
  return (
    <svg class="h-4 w-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
