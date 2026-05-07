import { type Component, createSignal, createMemo, onMount, Show } from 'solid-js';
import { useParams, useNavigate } from '@solidjs/router';
import { mockupStore } from '~/stores/mockupStore';
import { templateStore } from '~/stores/templateStore';
import { ProductConfigurator } from '~/components/product/ProductConfigurator';
import { ProductMockupPreview } from '~/components/product/ProductMockupPreview';
import type { Product, Template } from '~/lib/types';
import type { Brand } from '~/lib/types/brand';

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isNew = () => params.id === 'new';

  const [product, setProduct] = createSignal<Product | null>(null);
  const [brands, setBrands] = createSignal<Brand[]>([]);
  const [templates, setTemplates] = createSignal<Template[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);
  const emptyVariants = () => [] as { name: string; colors: string[]; sizes?: string[] }[];
  const [showConfigurator, setShowConfigurator] = createSignal(isNew());

  // Configurator state
  const [selectedBrandId, setSelectedBrandId] = createSignal<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = createSignal<string | null>(null);
  const [productName, setProductName] = createSignal('');

  const {
    state: mockupState,
    selectedMockup,
    selectMockup,
    regenerateMockup,
    aiEnhanceMockup,
    generateMockups,
    createProduct,
    generating,
  } = mockupStore;

  // Load product and related data
  onMount(async () => {
    try {
      if (isNew()) {
        // Load brands and templates for the configurator
        const brandsModule = await import('~/lib/api/brands');
        const { templatesApi } = await import('~/lib/api/templates');

        const [brandsRes, templatesRes] = await Promise.all([
          brandsModule.listBrands(),
          templatesApi.listPublic(),
        ]);

        setBrands(brandsRes);
        setTemplates(templatesRes.data);
      } else {
        // Load product detail
        const { mockupsApi } = await import('~/lib/api/mockups');
        const res = await mockupsApi.getProduct(params.id);
        setProduct(res.data);
        mockupStore.selectProduct(res.data.id);

        // Fetch its mockups
        const mockupsRes = await mockupsApi.list({ productId: params.id });
        mockupStore.fetchMockups({ productId: params.id });
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  });

  const handleCreate = async () => {
    if (!selectedBrandId() || !selectedTemplateId()) return;
    try {
      const created = await createProduct({
        brandId: selectedBrandId()!,
        templateId: selectedTemplateId()!,
        name: productName() || `${brands().find((b) => b.id === selectedBrandId())?.name ?? 'Product'} - ${templates().find((t) => t.id === selectedTemplateId())?.name ?? ''}`,
        config: {
          brandId: selectedBrandId()!,
          templateId: selectedTemplateId()!,
        },
      });
      setProduct(created);
      setShowConfigurator(false);
      navigate(`/dashboard/products/${created.id}`, { replace: true });
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleGenerate = async () => {
    if (isNew()) {
      await handleCreate();
    }
    if (product()) {
      await generateMockups(product()!.id);
    }
  };

  const handleDownload = (id: string) => {
    const mockup = mockupState.mockups.find((m) => m.id === id);
    if (!mockup) return;
    const a = document.createElement('a');
    a.href = mockup.imageUrl;
    a.download = `${mockup.variantName}.${mockup.format}`;
    a.click();
  };

  const handleBack = () => {
    navigate('/dashboard/products');
  };

  // Loading
  if (loading()) {
    return (
      <div class="flex items-center justify-center h-full py-20">
        <div class="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span class="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  // Error
  if (error()) {
    return (
      <div class="p-6">
        <div class="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm text-red-700 dark:text-red-300">{error()}</p>
          </div>
          <button onClick={handleBack} class="mt-2 text-sm font-medium text-red-700 dark:text-red-300 hover:underline">
            ← Back to products
          </button>
        </div>
      </div>
    );
  }

  // New product → configurator
  if (isNew() || showConfigurator()) {
    return (
      <div class="p-6 max-w-4xl mx-auto">
        <div class="mb-6">
          <button
            onClick={handleBack}
            class="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to products
          </button>
        </div>

        <ProductConfigurator
          brands={brands}
          templates={templates}
          variants={emptyVariants}
          selectedBrandId={selectedBrandId}
          selectedTemplateId={selectedTemplateId}
          productName={productName()}
          generating={generating()}
          onBrandChange={setSelectedBrandId}
          onTemplateChange={setSelectedTemplateId}
          onProductNameChange={setProductName}
          onGenerate={handleGenerate}
          onCreate={handleCreate}
          onCancel={handleBack}
        />
      </div>
    );
  }

  // Existing product — show detail
  return (
    <div class="p-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div class="mb-6">
        <button
          onClick={handleBack}
          class="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Products
        </button>
      </div>

      {/* Product header */}
      <Show when={product()}>
        <div class="flex items-start justify-between mb-8">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {product()!.name}
            </h1>
            <div class="flex items-center gap-4 mt-1">
              <span class="text-sm text-gray-500 dark:text-gray-400">
                Brand: {product()!.brandId}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                Template: {product()!.templateId}
              </span>
              <Show when={product()!.brandScore > 0}>
                <span class="inline-flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Brand Score: {product()!.brandScore}/100
                </span>
              </Show>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              onClick={handleGenerate}
              disabled={generating()}
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              <Show when={generating()} fallback="Generate Mockups">
                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </Show>
              Generating...
            </button>

            <button
              onClick={() => setShowConfigurator(true)}
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Reconfigure
            </button>
          </div>
        </div>
      </Show>

      {/* Mockup preview */}
      <ProductMockupPreview
        mockups={mockupState.mockups}
        selectedMockupId={mockupState.selectedMockupId}
        loading={loading()}
        onSelect={selectMockup}
        onDownload={handleDownload}
        onRegenerate={(id) => regenerateMockup(id)}
        onAiEnhance={(id) => aiEnhanceMockup(id)}
      />
    </div>
  );
}
