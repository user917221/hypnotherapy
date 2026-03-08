"use client";

import { ReactLenis } from '@lenis/react';
import { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
    // @ts-ignore
    return (
        <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
