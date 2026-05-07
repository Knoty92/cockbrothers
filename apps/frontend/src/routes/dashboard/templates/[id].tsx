import { type Component, createSignal, onMount, Show } from 'solid-js';
import { useParams, useNavigate } from '@solidjs/router';
import { templateStore } from '~/stores/templateStore';
import { TemplateEditor } from '~/components/template/TemplateEditor';
import type { Template, TemplateData } from '~/lib/types';

export default function TemplateDetailPage() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [template, setTemplate] = createSignal<Template | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);
  const isNew = () => params.id === 'new';

  // Load template on mount
  onMount(async () => {
    if (isNew()) {
      setLoading(false);
      return;
    }

    try {
      // Try to find in store first
      const existing = templateStore.state.templates.find((t) => t.id === params.id);
      if (existing) {
        setTemplate(existing);
        templateStore.selectTemplate(existing.id);
      } else {
        // Fetch from API
        const { templatesApi } = await import('~/lib/api/templates');
        const res = await templatesApi.get(params.id);
        setTemplate(res.data);
        templateStore.selectTemplate(res.data.id);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  });

  const handleSave = async (data: TemplateData) => {
    try {
      const { templatesApi } = await import('~/lib/api/templates');

      if (isNew()) {
        const res = await templatesApi.create({
          name: 'Untitled Template',
          productType: 'tshirt',
          templateData: data,
        });
        templateStore.selectTemplate(res.data.id);
        navigate(`/dashboard/templates/${res.data.id}`, { replace: true });
      } else {
        const updated = await templateStore.updateTemplate(params.id, {
          templateData: data,
        });
        setTemplate(updated);
      }
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleExport = () => {
    if (!template()) return;
    const json = JSON.stringify(template()!.templateData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template()!.slug ?? 'template'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Loading state
  if (loading()) {
    return (
      <div class="flex items-center justify-center h-full py-20">
        <div class="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span class="text-sm">Loading template...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error()) {
    return (
      <div class="p-6">
        <div class="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm text-red-700 dark:text-red-300">{error()}</p>
          </div>
          <button
            onClick={() => navigate('/dashboard/templates')}
            class="mt-2 text-sm font-medium text-red-700 dark:text-red-300 hover:underline"
          >
            ← Back to templates
          </button>
        </div>
      </div>
    );
  }

  // New template placeholder
  if (isNew()) {
    const defaultTemplate: Template = {
      id: 'new',
      userId: '',
      name: 'New Template',
      slug: 'new-template',
      productType: 'tshirt',
      templateData: {
        canvasWidth: 800,
        canvasHeight: 600,
        backgroundColor: '#ffffff',
        layers: [],
        grid: { show: true, size: 20 },
        snapToGrid: true,
      },
      isPublic: false,
      isSystem: false,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return (
      <TemplateEditor
        template={defaultTemplate}
        onSave={handleSave}
        onExport={handleExport}
      />
    );
  }

  // Existing template
  return (
    <Show when={template()}>
      <TemplateEditor
        template={template()!}
        onSave={handleSave}
        onExport={handleExport}
      />
    </Show>
  );
}
