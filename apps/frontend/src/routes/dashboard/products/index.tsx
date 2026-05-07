import { type Component, createSignal } from 'solid-js';
import { useMockups } from '~/hooks/useMockups';
import { ProductList } from '~/components/product/ProductList';

export default function ProductsPage() {
  const {
    products,
    loading,
    error,
    selectProduct,
    deleteProduct,
    generateMockups,
  } = useMockups();

  const [searchQuery, setSearchQuery] = createSignal('');
  const [showArchived, setShowArchived] = createSignal(false);

  const filteredProducts = () => {
    const list = products();
    if (searchQuery()) {
      const q = searchQuery().toLowerCase();
      return list.filter((p) => p.name.toLowerCase().includes(q));
    }
    return list;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelect = (id: string) => {
    selectProduct(id);
    window.location.href = `/dashboard/products/${id}`;
  };

  const handleEdit = (id: string) => {
    window.location.href = `/dashboard/products/${id}`;
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleGenerate = (id: string) => {
    generateMockups(id);
  };

  const handleNewProduct = () => {
    window.location.href = '/dashboard/products/new';
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div class="p-6 max-w-7xl mx-auto">
      {/* Page header */}
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Products</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Your branded products. Apply your brand kits to templates and generate mockups.
        </p>
      </div>

      <ProductList
        products={filteredProducts}
        loading={loading}
        error={error}
        searchQuery={searchQuery()}
        onSearch={handleSearch}
        onSelect={handleSelect}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onGenerate={handleGenerate}
        onNewProduct={handleNewProduct}
        onRefresh={handleRefresh}
        showArchived={showArchived()}
        onToggleArchived={() => setShowArchived(!showArchived())}
      />
    </div>
  );
}
