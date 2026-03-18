import { Outlet } from 'react-router-dom';
import { Header } from 'src/layouts/Header';
import { HeaderBottom } from 'src/layouts/HeaderBottom';

export const RootLayout = () => {
	return (
		<main className='flex h-full min-h-screen w-full max-w-360 flex-col items-center justify-start'>
			{/* <LoadingScreen /> */}
			<Header />
			<Outlet />
			<HeaderBottom />
		</main>
	);
};
