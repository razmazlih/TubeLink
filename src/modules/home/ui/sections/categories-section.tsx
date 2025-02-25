'use client';

import { FilterCarausel } from '@/components/filter-carousel';
import { trpc } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface CategoriesSectionProps {
    categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
    return (
        <Suspense fallback={<CategorySkeleton />}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <CategoriesSectionSuspense categoryId={categoryId} />
            </ErrorBoundary>
        </Suspense>
    );
};

const CategorySkeleton = () => {
  return <FilterCarausel isLoading data={[]} onSelectAction={() => {}} />
}

const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
  const router = useRouter();
    const [categories] = trpc.categories.getMany.useSuspenseQuery();

    const data = categories.map(({ name, id }) => ({
        value: id,
        lable: name,
    }));

    const onSelectAction = (value: string | null) => {
      const url = new URL(window.location.href);

      if (value) {
        url.searchParams.set('categoryId', value);
      } else {
        url.searchParams.delete('categoryId');
      }

      router.push(url.toString())
    }
    return <FilterCarausel onSelectAction={onSelectAction} value={categoryId} data={data} />;
};
