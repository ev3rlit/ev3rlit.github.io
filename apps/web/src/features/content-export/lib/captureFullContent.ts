import html2canvas from 'html2canvas';

/**
 * 스크롤 전체 콘텐츠를 캡처하는 유틸리티
 * 
 * html2canvas의 windowHeight 옵션을 사용하여
 * 스크롤 영역 전체를 하나의 캔버스로 캡처합니다.
 */
export async function captureFullContent(element: HTMLElement): Promise<HTMLCanvasElement> {
    // 원래 스크롤 위치 저장
    const originalScrollTop = window.scrollY;
    const originalScrollLeft = window.scrollX;

    // 스크롤을 맨 위로 이동 (캡처 정확도 향상)
    window.scrollTo(0, 0);

    try {
        // 요소의 전체 높이 계산
        const fullHeight = element.scrollHeight;
        const fullWidth = element.scrollWidth;

        // html2canvas로 전체 콘텐츠 캡처
        const canvas = await html2canvas(element, {
            // 전체 높이/너비 설정
            height: fullHeight,
            width: fullWidth,
            windowHeight: fullHeight,
            windowWidth: fullWidth,

            // 품질 설정
            scale: 2, // 고해상도 캡처
            useCORS: true, // 외부 이미지 허용
            allowTaint: false,
            backgroundColor: null, // 투명 배경 (원본 유지)

            // 스크롤 오프셋 제거 (전체 캡처)
            scrollX: 0,
            scrollY: 0,
            x: 0,
            y: 0,

            // 로깅 (개발용)
            logging: false,
        });

        return canvas;
    } finally {
        // 원래 스크롤 위치 복원
        window.scrollTo(originalScrollLeft, originalScrollTop);
    }
}

/**
 * 캔버스를 Blob으로 변환
 */
export function canvasToBlob(canvas: HTMLCanvasElement, type: string = 'image/png'): Promise<Blob> {
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Failed to create blob from canvas'));
                }
            },
            type,
            1.0 // 최대 품질
        );
    });
}

/**
 * Blob을 파일로 다운로드
 */
export function downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
