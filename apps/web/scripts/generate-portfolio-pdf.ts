/**
 * Portfolio PDF Generator
 *
 * inner main의 직접 자식을 기준으로 섹션별 개별 PDF를 생성한 뒤 pdf-lib으로 합성.
 * 각 페이지는 해당 섹션의 실제 렌더링 높이에 맞춰 크기가 결정됨.
 *
 * Usage:
 *   1. Start dev server: pnpm dev
 *   2. Run: pnpm generate:pdf
 */
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import * as fs from "fs";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUTPUT_PATH = process.env.OUTPUT_PATH || "portfolio.pdf";
const PAGE_WIDTH = 1280;

async function generatePortfolioPDF() {
	const browser = await chromium.launch();
	const page = await browser.newPage({
		viewport: { width: PAGE_WIDTH, height: 720 },
	});

	console.log(`Navigating to ${BASE_URL}/portfolio ...`);
	await page.goto(`${BASE_URL}/portfolio`, {
		waitUntil: "networkidle",
	});
	await page.waitForTimeout(3000);

	// ── Layout unlock & animation disable ──
	await page.evaluate(() => {
		// inner main = SwissMinimalPage의 <main> (main 안의 main)
		const innerMain = document.querySelector("main main");
		if (!innerMain) return;

		// inner main → body 까지 역추적하며 제약 해제
		const constraintClasses = [
			"h-full", "h-screen", "w-screen",
			"overflow-hidden", "overflow-y-scroll", "overflow-y-auto", "overflow-x-hidden",
			"absolute", "fixed", "inset-0", "no-scrollbar",
		];

		let el: HTMLElement | null = innerMain as HTMLElement;
		while (el) {
			constraintClasses.forEach((cls) => el!.classList.remove(cls));
			el = el.parentElement;
		}

		const style = document.createElement("style");
		style.textContent = `
			html, body {
				height: auto !important;
				overflow: visible !important;
			}
			.opacity-0 { opacity: 1 !important; }
			[class*="opacity-0"] { opacity: 1 !important; }
			[class*="translate-y"] { transform: none !important; }
			[class*="translate-x"] { transform: none !important; }
			[class*="-translate"] { transform: none !important; }
			[class*="scale-9"] { transform: none !important; }
			*, *::before, *::after {
				animation: none !important;
				transition: none !important;
			}
			nav { display: none !important; }
			aside { display: none !important; }
		`;
		document.head.appendChild(style);
	});

	await page.waitForTimeout(500);

	// ── inner main의 직접 자식 수 파악 ──
	const childCount = await page.evaluate(() => {
		const innerMain = document.querySelector("main main");
		return innerMain ? innerMain.children.length : 0;
	});
	console.log(`Found ${childCount} sections (direct children of inner main)`);

	const mergedPdf = await PDFDocument.create();

	for (let i = 0; i < childCount; i++) {
		// 현재 섹션만 표시, 나머지 숨김
		const height = await page.evaluate((idx) => {
			const innerMain = document.querySelector("main main");
			if (!innerMain) return 100;

			const children = innerMain.children;
			for (let j = 0; j < children.length; j++) {
				(children[j] as HTMLElement).style.display =
					j === idx ? "" : "none";
			}

			const current = children[idx] as HTMLElement;
			// min-height 제약 해제 (snap-section의 min-h-screen 등)
			current.style.minHeight = "0";
			const snapChild = current.querySelector(".snap-section") as HTMLElement;
			if (snapChild) snapChild.style.minHeight = "0";

			void current.offsetHeight;
			return current.getBoundingClientRect().height;
		}, i);

		const pageHeight = Math.ceil(Math.max(height, 100));
		console.log(`  Section ${i + 1}/${childCount}: ${pageHeight}px`);

		const pdfBytes = await page.pdf({
			width: `${PAGE_WIDTH}px`,
			height: `${pageHeight}px`,
			printBackground: true,
			margin: { top: "0", bottom: "0", left: "0", right: "0" },
		});

		const sectionPdf = await PDFDocument.load(pdfBytes);
		const pages = await mergedPdf.copyPages(
			sectionPdf,
			sectionPdf.getPageIndices(),
		);
		pages.forEach((p) => mergedPdf.addPage(p));
	}

	const finalBytes = await mergedPdf.save();
	fs.writeFileSync(OUTPUT_PATH, finalBytes);

	console.log(`\nPDF generated: ${OUTPUT_PATH} (${childCount} pages)`);
	await browser.close();
}

generatePortfolioPDF().catch((err) => {
	console.error("PDF generation failed:", err);
	process.exit(1);
});
