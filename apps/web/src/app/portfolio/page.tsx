import type { Metadata } from "next";
import { SwissMinimalPage } from "@/views/portfolio/swissminimal/ui/SwissMinimalPage";

export const metadata: Metadata = {
    title: "Portfolio | 최범휘",
    description: "백엔드 개발자 최범휘의 포트폴리오입니다.",
};

export default function Page() {
    return <SwissMinimalPage />;
}
