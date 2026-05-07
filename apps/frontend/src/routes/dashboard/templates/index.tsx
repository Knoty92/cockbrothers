import { type Component, createSignal } from 'solid-js';
import { useTemplates } from '~/hooks/useTemplates';
import { TemplateGrid } from '~/components/template/TemplateGrid';
import type { ProductType } from '~/lib/types';

export default function TemplatesPage() {
  const {
    filteredTemplates,
    filter,
    loading,
    error,
    selectTemplate,
    deleteTemplate,
    search,
    filterByProductType,
  } = useTemplates();

  const [searchQuery, setSearchQuery] = createSignal('');
  const [productTypeFilter, setProductTypeFilter] = createSignal<ProductType | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    search(query);
  };

  const handleProductTypeFilter = (type: ProductType | null) => {
    setProductTypeFilter(type);
    filterByProductType(type);
  };

  const handleSelect = (id: string) => {
    selectTemplate(id);
    // Navigate to editor — in SolidStart this would use useNavigate
    window.location.href = `/dashboard/templates/${id}`;
  };

  const handleEdit = (id: string) => {
    window.location.href = `/dashboard/templates/${id}`;
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      deleteTemplate(id);
    }
  };

  const handleNewTemplate = () => {
    window.location.href = '/dashboard/templates/new';
  };

  return (
    <div class="p-6 max-w-7xl mx-auto">
      {/* Page header */}
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Templates</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Browse and manage your product templates. System templates are pre-made; custom templates can be edited.
        </p>
      </div>

      <TemplateGrid
        templates={filteredTemplates}
        loading={loading}
        error={error}
        searchQuery={searchQuery()}
        productTypeFilter={productTypeFilter()}
        onSearch={handleSearch}
        onProductTypeFilter={handleProductTypeFilter}
        onSelect={handleSelect}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onNewTemplate={handleNewTemplate}
      />
    </div>
  );
}
