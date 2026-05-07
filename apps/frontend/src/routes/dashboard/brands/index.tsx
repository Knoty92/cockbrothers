import { onMount, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { useBrand } from '~/hooks/useBrand';
import { BrandList } from '~/components/brand/BrandList';
import type { Brand } from '~/lib/types/brand';

export default function BrandsDashboard() {
  const navigate = useNavigate();
  const brand = useBrand();

  onMount(() => {
    brand.fetchBrands();
  });

  const handleSelectBrand = (b: Brand) => {
    brand.selectBrand(b.id);
    navigate(`/dashboard/brands/${b.id}`);
  };

  const handleDeleteBrand = async (b: Brand) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${b.name}"? This cannot be undone.`,
    );
    if (confirmed) {
      await brand.deleteBrand(b.id);
    }
  };

  const handleDuplicateBrand = async (b: Brand) => {
    await brand.duplicateBrand(b.id);
  };

  const handleCreateNew = () => {
    navigate('/dashboard/brands/new');
  };

  return (
    <div class="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Brands
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your brand kits — colors, fonts, logos, and voice
          </p>
        </div>
      </div>

      {/* Brand list */}
      <BrandList
        brands={brand.brands()}
        loading={brand.loading()}
        error={brand.error()}
        onSelectBrand={handleSelectBrand}
        onDeleteBrand={handleDeleteBrand}
        onDuplicateBrand={handleDuplicateBrand}
        onCreateNew={handleCreateNew}
      />
    </div>
  );
}
