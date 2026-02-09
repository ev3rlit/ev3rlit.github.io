import type { Metadata } from "next";
import { SwissMinimalBackendGameduoPage } from "@/views/portfolio/swissminimal";

export const metadata: Metadata = {
    title: "Portfolio | 백엔드 개발자 최범휘",
    description: "Golang·C++ 기반 게임 서버를 설계하고, 런칭부터 글로벌 라이브 운영까지 주도한 백엔드 개발자입니다.",
};

export default function Page() {
    return <SwissMinimalBackendGameduoPage />;
}
