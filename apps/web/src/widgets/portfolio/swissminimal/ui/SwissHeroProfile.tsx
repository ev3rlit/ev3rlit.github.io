"use client";

import { cn } from '@/shared/lib/cn';

interface SwissHeroProfileProps {
    role: string;
    isVisible: boolean;
}

export const SwissHeroProfile = ({ role, isVisible }: SwissHeroProfileProps) => {
    return (
        <div className="col-span-12 lg:col-span-4 flex flex-col items-start lg:items-end mt-12 lg:mt-0">

            {/* Content Wrapper for internal left alignment */}
            <div className="flex flex-col items-start text-left">
                {/* Profile Image Area */}
                <div
                    className={cn(
                        "w-32 h-32 md:w-40 md:h-40 bg-stone-200 dark:bg-stone-800 mb-8 overflow-hidden relative shadow-xl transition-all duration-1000 delay-400",
                        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    )}
                >
                    <img src="/images/portfolio/profile.jpg" alt="프로필 사진" className="w-full h-full object-cover" />
                </div>

                <div
                    className={cn(
                        "text-left transition-all duration-1000 delay-600",
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                    )}
                >
                    <h2 className="heading-md mb-1">최범휘</h2>
                    <p className="text-lg text-stone-500 font-light mb-6">{role}</p>

                    <div className="w-12 h-px bg-stone-900 dark:bg-stone-100 mb-6"></div>

                    <ul className="space-y-2 text-sm text-stone-500 dark:text-stone-400 font-mono">
                        <li className="flex flex-col">
                            <span className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">연락처</span>
                            <a href="tel:010-4344-4496" className="hover:text-indigo-600 transition-colors">010-4344-4496</a>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">이메일</span>
                            <a href="mailto:bum4496@naver.com" className="hover:text-indigo-600 transition-colors">bum4496@naver.com</a>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">깃허브</span>
                            <a href="https://github.com/ev3rlit" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">github.com/ev3rlit</a>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">블로그</span>
                            <a href="https://ev3rlit.github.io" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">ev3rlit.github.io</a>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">활동 지역</span>
                            <span>Seoul, South Korea</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
