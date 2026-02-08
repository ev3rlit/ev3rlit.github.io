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

		// ── CSS: 안전한 전역 오버라이드만 ──
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
			.shadow-xl { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important; }
			*, *::before, *::after {
				animation: none !important;
				transition: none !important;
			}
			nav { display: none !important; }
			aside { display: none !important; }
		`;
		document.head.appendChild(style);

		// ── JS: 정밀 타겟 DOM 조작 ──

		// 1. 갤러리 '확대 보기' 호버 오버레이 숨김
		document.querySelectorAll(".opacity-0").forEach((el) => {
			if (el.className.includes("group-hover:")) {
				(el as HTMLElement).style.display = "none";
			}
		});
		// 갤러리 호버 배경 오버레이도 숨김
		document.querySelectorAll("div").forEach((el) => {
			if (
				el.className.includes("group-hover:bg-black") &&
				el.className.includes("absolute")
			) {
				(el as HTMLElement).style.display = "none";
			}
		});

		// 2. 갤러리 양끝 그라데이션 페이드 숨김
		document.querySelectorAll(".pointer-events-none").forEach((el) => {
			if (el.className.includes("bg-gradient-to")) {
				(el as HTMLElement).style.display = "none";
			}
		});

		// 3. Sidebar 복원 버튼 숨김 (fixed position 버튼)
		document.querySelectorAll("button").forEach((btn) => {
			const computed = window.getComputedStyle(btn);
			if (computed.position === "fixed") {
				btn.style.display = "none";
			}
		});
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
