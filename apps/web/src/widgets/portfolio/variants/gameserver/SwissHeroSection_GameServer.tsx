"use client";

import { SwissHeroSection } from '@/widgets/portfolio/swissminimal';

export const SwissHeroSection_GameServer = () => (
    <SwissHeroSection
        role="게임 서버 개발자"
        headline={
            <>
                새로운 기술을 빠르게 습득하여 <br className="hidden md:block" />
                <span className="text-indigo-600 dark:text-indigo-400">비즈니스 가치</span>를 만들어내고,<br />
                신규 런칭부터 라이브 운영까지 <br className="hidden md:block" />
                <span className="text-indigo-600 dark:text-indigo-400">전체 과정</span>을 책임지는 게임 서버 개발자
            </>
        }
        tags={['Go', 'C++', 'WebSocket', 'Real-time', 'MongoDB', 'Redis', 'Concurrency', 'Event-Driven']}
    />
);
