import { jsPDF } from 'jspdf';
import { captureFullContent, canvasToBlob, downloadBlob } from './captureFullContent';

// ============================================
// Constants
// ============================================

// A4 페이지 크기 (mm)
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// PDF 여백 (mm)
const PDF_MARGIN_MM = 10;

// ============================================
// HTML Export
// ============================================

/**
 * DOM 요소를 독립 실행 HTML 파일로 내보내기
 * 인라인 스타일을 포함하여 외부 의존성 없이 렌더링 가능
 */
export async function exportToHtml(element: HTMLElement, filename: string): Promise<void> {
    // 요소 복제
    const clone = element.cloneNode(true) as HTMLElement;

    // 모든 스타일시트에서 계산된 스타일 추출
    const computedStyles = extractComputedStyles(element);

    // HTML 문서 생성
    const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${filename}</title>
    <style>
        ${computedStyles}
        
        /* Base reset */
        * {
            box-sizing: border-box;
        }
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
    </style>
</head>
<body>
    ${clone.outerHTML}
</body>
</html>
`;

    // Blob 생성 및 다운로드
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    downloadBlob(blob, `${filename}.html`);
}

/**
 * 요소의 계산된 스타일 추출 (간소화 버전)
 */
function extractComputedStyles(element: HTMLElement): string {
    const styles: string[] = [];
    const processed = new Set<string>();

    function processElement(el: Element, depth: number = 0) {
        if (depth > 10) return; // 깊이 제한

        const tagName = el.tagName.toLowerCase();
        const classNames = Array.from(el.classList).join('.');
        const selector = classNames ? `${tagName}.${classNames}` : tagName;

        if (!processed.has(selector)) {
            processed.add(selector);
            const computed = window.getComputedStyle(el);

            // 중요 스타일 속성만 추출
            const importantProps = [
                'color', 'background-color', 'font-family', 'font-size', 'font-weight',
                'line-height', 'margin', 'padding', 'border', 'border-radius',
                'display', 'flex-direction', 'align-items', 'justify-content', 'gap',
                'width', 'max-width', 'min-width', 'text-align'
            ];

            const propStyles = importantProps
                .map(prop => {
                    const value = computed.getPropertyValue(prop);
                    return value ? `${prop}: ${value}` : null;
                })
                .filter(Boolean)
                .join('; ');

            if (propStyles) {
                styles.push(`${selector} { ${propStyles} }`);
            }
        }

        // 자식 요소 처리
        Array.from(el.children).forEach(child => processElement(child, depth + 1));
    }

    processElement(element);
    return styles.join('\n');
}

// ============================================
// PNG Export
// ============================================

/**
 * DOM 요소를 PNG 이미지로 내보내기 (전체 스크롤 영역 캡처)
 */
export async function exportToPng(element: HTMLElement, filename: string): Promise<void> {
    const canvas = await captureFullContent(element);
    const blob = await canvasToBlob(canvas, 'image/png');
    downloadBlob(blob, `${filename}.png`);
}

// ============================================
// PDF Export (페이지 분할)
// ============================================

/**
 * DOM 요소를 PDF로 내보내기 (A4 페이지 단위로 분할)
 */
export async function exportToPdf(element: HTMLElement, filename: string): Promise<void> {
    // 전체 콘텐츠 캡처
    const canvas = await captureFullContent(element);

    // PDF 생성 (A4 세로)
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    // 캔버스 크기
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // PDF 콘텐츠 영역 크기 (여백 제외)
    const contentWidth = A4_WIDTH_MM - (PDF_MARGIN_MM * 2);
    const contentHeight = A4_HEIGHT_MM - (PDF_MARGIN_MM * 2);

    // 스케일 계산 (너비 기준)
    const scale = contentWidth / (canvasWidth / 2); // html2canvas scale=2 보정

    // 한 페이지에 들어갈 캔버스 높이 (픽셀)
    const pageHeightPx = (contentHeight / scale) * 2; // scale=2 보정

    // 총 페이지 수
    const totalPages = Math.ceil(canvasHeight / pageHeightPx);

    // 페이지별 이미지 슬라이싱
    for (let page = 0; page < totalPages; page++) {
        // 첫 페이지가 아니면 새 페이지 추가
        if (page > 0) {
            pdf.addPage();
        }

        // 현재 페이지의 시작 Y 위치
        const srcY = page * pageHeightPx;

        // 현재 페이지에 그릴 높이 (마지막 페이지는 남은 높이만큼)
        const sliceHeight = Math.min(pageHeightPx, canvasHeight - srcY);

        // 슬라이스 캔버스 생성
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = canvasWidth;
        sliceCanvas.height = sliceHeight;

        const ctx = sliceCanvas.getContext('2d');
        if (!ctx) continue;

        // 원본 캔버스에서 해당 영역 복사
        ctx.drawImage(
            canvas,
            0, srcY, canvasWidth, sliceHeight, // 소스 영역
            0, 0, canvasWidth, sliceHeight     // 대상 영역
        );

        // 캔버스를 이미지 데이터로 변환
        const imgData = sliceCanvas.toDataURL('image/png', 1.0);

        // PDF에 이미지 추가
        const destHeight = (sliceHeight / 2) * scale; // scale=2 보정
        pdf.addImage(
            imgData,
            'PNG',
            PDF_MARGIN_MM,
            PDF_MARGIN_MM,
            contentWidth,
            destHeight
        );
    }

    // PDF 저장
    pdf.save(`${filename}.pdf`);
}
