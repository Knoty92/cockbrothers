import { useNavigate } from '@solidjs/router';
import { useBrand } from '~/hooks/useBrand';
import { BrandKitCreator } from '~/components/brand/BrandKitCreator';
import type { CreateBrandInput } from '~/lib/types/brand';

export default function CreateBrand() {
  const navigate = useNavigate();
  const brand = useBrand();

  const handleSave = async (data: CreateBrandInput) => {
    const created = await brand.createBrand(data);
    if (created) {
      navigate(`/dashboard/brands/${created.id}`);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/brands');
  };

  return (
    <div class="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div class="mb-6">
        <button
          type="button"
          onClick={handleCancel}
          class="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-3 transition-colors"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to brands
        </button>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Create brand kit
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Define your brand identity — logo, colors, fonts, and voice
        </p>
      </div>

      <BrandKitCreator
        onSave={handleSave}
        onCancel={handleCancel}
        saving={brand.creating()}
        error={brand.error()}
      />
    </div>
  );
}
