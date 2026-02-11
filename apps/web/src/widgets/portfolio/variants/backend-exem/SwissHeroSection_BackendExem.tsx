"use client";

import { SwissHeroSection } from '@/widgets/portfolio/swissminimal';

export const SwissHeroSection_BackendExem = () => (
    <SwissHeroSection
        headline={
            <>
                Golang으로 상용 서비스를 런칭하고 <br className="hidden md:block" />
                <span className="text-indigo-600 dark:text-indigo-400">데이터 파이프라인</span>부터 라이브 운영까지 <br className="hidden md:block" />
                <span className="text-indigo-600 dark:text-indigo-400">전체 과정</span>을 책임지는 백엔드 개발자
            </>
        }
        tags={['Go', 'MongoDB', 'Redis', 'Data Pipeline', 'Event-Driven', 'CQRS', 'Linux']}
        impacts={[
            {
                title: '6개월',
                description: <>Go·MongoDB를 학습하여<br />상용 서비스 런칭</>,
            },
            {
                title: '1,000만 건/일',
                description: <>로그 파이프라인 구축,<br />분당 7,000건 안정 처리</>,
            },
            {
                title: '10만 건',
                description: <>결제/재화 데이터<br />무중단 마이그레이션</>,
            },
        ]}
    />
);
