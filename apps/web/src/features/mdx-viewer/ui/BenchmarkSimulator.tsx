"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

export interface BenchmarkItem {
    label: string;
    baseValue: number; // base latency in ms
    color: string;
}

interface BenchmarkSimulatorProps {
    data: BenchmarkItem[];
    sliderLabel?: string;
    minSliderValue?: number;
    maxSliderValue?: number;
    unit?: string;
}

export function BenchmarkSimulator({
    data,
    sliderLabel = "지연",
    minSliderValue = 0,
    maxSliderValue = 10,
    unit = "RPS",
}: BenchmarkSimulatorProps) {
    const [addedLatency, setAddedLatency] = useState(minSliderValue);

    const results = useMemo(() => {
        return data.map((item) => {
            const currentRps = 1000 / (item.baseValue + addedLatency);
            return {
                ...item,
                currentRps,
            };
        });
    }, [data, addedLatency]);

    // Calculate current max for relative scaling across items
    const currentMaxRps = useMemo(() => {
        return Math.max(...results.map((r) => r.currentRps));
    }, [results]);

    return (
        <div className="my-8 p-6 rounded-xl border border-border bg-card/50 backdrop-blur-md shadow-sm group">
            <div className="flex flex-col gap-10">
                {/* Graph Area */}
                <div className="space-y-6">
                    {results.map((res) => (
                        <div key={res.label} className="space-y-2">
                            <div className="flex justify-between items-end">
                                <span className="text-sm font-bold text-foreground/80">{res.label}</span>
                                <div className="text-right leading-none">
                                    <span className="font-mono text-lg font-black text-primary transition-all">
                                        {Math.floor(res.currentRps).toLocaleString()}
                                    </span>
                                    <span className="ml-1 text-[10px] font-bold text-muted-foreground uppercase">{unit}</span>
                                </div>
                            </div>

                            <div className="relative h-4 w-full bg-muted/20 rounded-full overflow-hidden">
                                {/* Current RPS Bar (Relative Scaling to other items) */}
                                <motion.div
                                    initial={false}
                                    animate={{ width: `${(res.currentRps / currentMaxRps) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 300, damping: 35 }}
                                    className={`absolute inset-y-0 left-0 ${res.color} z-10 rounded-full shadow-[2px_0_12px_rgba(0,0,0,0.1)]`}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Control Area */}
                <div className="space-y-5 pt-6 border-t border-border/50">
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            {sliderLabel}
                        </span>
                        <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 shadow-inner">
                            <span className="font-mono font-bold text-primary text-xs tracking-tighter">
                                +{addedLatency.toFixed(1)}ms
                            </span>
                        </div>
                    </div>

                    <div className="relative group/slider py-4">
                        {/* 1. Background Track Panel (Guide Slot) */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-3 bg-muted/20 border border-border/20 rounded-full" />

                        {/* 2. Active Progress Track */}
                        <motion.div
                            className="absolute top-1/2 -translate-y-1/2 left-0 h-3 bg-primary/10 rounded-full pointer-events-none border-r-2 border-primary/30"
                            style={{
                                width: `${((addedLatency - minSliderValue) / (maxSliderValue - minSliderValue)) * 100}%`
                            }}
                        />

                        {/* 3. Slider Ticks (Visual Hints instead of text) */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none opacity-20">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="w-1 h-1 rounded-full bg-foreground" />
                            ))}
                        </div>

                        {/* 4. Native Input (Transparent, handling events) */}
                        <input
                            type="range"
                            min={minSliderValue}
                            max={maxSliderValue}
                            step="0.1"
                            value={addedLatency}
                            onChange={(e) => setAddedLatency(Number(e.target.value))}
                            className="relative z-30 w-full h-3 bg-transparent appearance-none cursor-pointer 
                                [&::-webkit-slider-thumb]:appearance-none 
                                [&::-webkit-slider-thumb]:w-6 
                                [&::-webkit-slider-thumb]:h-6 
                                [&::-webkit-slider-thumb]:rounded-full 
                                [&::-webkit-slider-thumb]:bg-primary 
                                [&::-webkit-slider-thumb]:border-4 
                                [&::-webkit-slider-thumb]:border-background
                                [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(59,130,246,0.5)]
                                [&::-webkit-slider-thumb]:cursor-grab
                                [&::-webkit-slider-thumb]:active:cursor-grabbing
                                [&::-webkit-slider-thumb]:transition-transform
                                [&::-webkit-slider-thumb]:hover:scale-110
                                [&::-moz-range-thumb]:w-6 
                                [&::-moz-range-thumb]:h-6 
                                [&::-moz-range-thumb]:rounded-full 
                                [&::-moz-range-thumb]:bg-primary 
                                [&::-moz-range-thumb]:border-4 
                                [&::-moz-range-thumb]:border-background
                                [&::-moz-range-thumb]:shadow-xl
                                transition-all"
                        />

                        {/* 5. Range Indicators (Minimalist geometry) */}
                        <div className="mt-6 flex justify-between items-center px-1">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rotate-45 border-l border-b border-muted-foreground/30" />
                                <span className="text-[10px] font-black text-muted-foreground/40">{minSliderValue} MS</span>
                            </div>
                            <div className="flex-1 mx-4 h-[1px] bg-gradient-to-right from-transparent via-border/20 to-transparent" />
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-muted-foreground/40">{maxSliderValue} MS</span>
                                <div className="w-1.5 h-1.5 rotate-45 border-r border-t border-muted-foreground/30" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
