import { HomeProductsPage } from 'src/module/HomeProductsPage';
import { MarqueesSection } from 'src/module/MarqueesSection';
import { ProductsPage } from 'src/module/ProductsPage';
import { StoryPage } from 'src/module/StoryPage';

export const HomePage = () => {
	return (
		<div className='flex h-fit w-full max-w-360 flex-col overflow-y-scroll'>
			<HomeProductsPage />
			<ProductsPage />
			<MarqueesSection />
			<StoryPage />
		</div>
	);
};
