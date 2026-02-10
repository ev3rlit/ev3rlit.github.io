"use client";

import { SwissHeroSection } from './SwissHeroSection';

export const SwissHeroSection_BackendGameduo = () => (
    <SwissHeroSection
        headline={
            <>
                라이브 서비스의 안정적 운영과 <br className="hidden md:block" />
                <span className="text-indigo-600 dark:text-indigo-400">지속적인 개선</span>을 책임지고,<br />
                검증된 학습력으로 <br className="hidden md:block" />
                <span className="text-indigo-600 dark:text-indigo-400">새로운 기술 영역</span>까지 확장하는 백엔드 개발자
            </>
        }
        tags={['Go', 'C++', 'WebSocket', 'Real-time', 'MongoDB', 'Redis', 'Concurrency', 'Event-Driven']}
    />
);
