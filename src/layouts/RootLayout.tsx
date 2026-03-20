import { Outlet } from 'react-router-dom';
import { useBubbleCursor } from 'src/hooks/useBubbleCursor';
import { Header } from 'src/layouts/Header';
import { HeaderBottom } from 'src/layouts/HeaderBottom';

export const RootLayout = () => {
	useBubbleCursor({
		maxSize: 10,
		density: 9, // 1=很稀疏，10=很密
		rise: 100,
		colors: ['rgba(150, 210, 255, 0.9)'],
	});

	return (
		<main className='flex h-full min-h-screen w-full flex-col items-center justify-start'>
			{/* <LoadingScreen /> */}
			<div className='flex h-full w-full max-w-360 flex-col items-center justify-center'>
				<Header />
				<Outlet />
				<HeaderBottom />
			</div>
		</main>
	);
};
