import { useCallback, useRef, type MouseEvent } from 'react';

interface DragState {
	isDragging: boolean;
	startX: number;
	scrollLeft: number;
	hasMoved: boolean;
}

export const useSwipeScroll = <T extends HTMLElement>() => {
	const dragRef = useRef<DragState>({
		isDragging: false,
		startX: 0,
		scrollLeft: 0,
		hasMoved: false,
	});

	const containerRef = useRef<T | null>(null);

	const handleMouseDown = (e: MouseEvent) => {
		if (!containerRef.current) return;

		e.preventDefault();
		dragRef.current = {
			isDragging: true,
			startX: e.pageX,
			scrollLeft: containerRef.current.scrollLeft,
			hasMoved: false,
		};
		containerRef.current.style.cursor = 'grabbing';
	};

	const handleMouseLeave = () => {
		dragRef.current.isDragging = false;
		if (containerRef.current) {
			containerRef.current.style.cursor = 'grab';
		}
	};

	const handleMouseUp = () => {
		dragRef.current.isDragging = false;
		if (containerRef.current) {
			containerRef.current.style.cursor = 'grab';
		}
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!dragRef.current.isDragging || !containerRef.current) return;

		e.preventDefault();
		const walk = dragRef.current.startX - e.pageX;

		if (Math.abs(walk) > 5) {
			dragRef.current.hasMoved = true;
		}

		containerRef.current.scrollLeft = dragRef.current.scrollLeft + walk;
	};

	const checkHasMoved = useCallback(() => {
		return dragRef.current.hasMoved;
	}, []);

	return {
		containerRef,
		onMouseDown: handleMouseDown,
		onMouseLeave: handleMouseLeave,
		onMouseUp: handleMouseUp,
		onMouseMove: handleMouseMove,
		checkHasMoved,
	};
};
