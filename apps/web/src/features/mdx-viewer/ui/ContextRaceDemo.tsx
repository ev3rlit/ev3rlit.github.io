"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ArrowRight, Play, RotateCcw } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export function ContextRaceDemo() {
    const [step, setStep] = useState(0);
    const [isSimulating, setIsSimulating] = useState(false);

    // Request states
    const [reqA, setReqA] = useState<{ id: string; user: string | null; status: "waiting" | "processing" | "completed" }>({
        id: "Req A",
        user: null,
        status: "waiting"
    });
    const [reqB, setReqB] = useState<{ id: string; user: string | null; status: "waiting" | "processing" | "completed" }>({
        id: "Req B",
        user: null,
        status: "waiting"
    });

    // Fiber's internal buffer state
    const [fiberBuffer, setFiberBuffer] = useState<string>("EMPTY");

    const reset = () => {
        setStep(0);
        setIsSimulating(false);
        setReqA({ id: "Req A", user: null, status: "waiting" });
        setReqB({ id: "Req B", user: null, status: "waiting" });
        setFiberBuffer("EMPTY");
    };

    const nextStep = () => {
        setStep(prev => prev + 1);
    };

    useEffect(() => {
        if (!isSimulating) return;

        const timer = setTimeout(() => {
            if (step === 0) {
                // Step 1: Request A arrives with user 'Alice'
                setReqA(prev => ({ ...prev, status: "processing", user: "Alice" }));
                setFiberBuffer("Alice");
                nextStep();
            } else if (step === 1) {
                // Step 2: Request A is processing (sleep), Request B arrives with user 'Bob'
                setReqB(prev => ({ ...prev, status: "processing", user: "Bob" }));
                setFiberBuffer("Bob"); // Fiber overwrites the shared buffer!
                nextStep();
            } else if (step === 2) {
                // Step 3: Request B completes
                setReqB(prev => ({ ...prev, status: "completed" }));
                nextStep();
            } else if (step === 3) {
                // Step 4: Request A finally completes and reads the buffer
                setReqA(prev => ({ ...prev, status: "completed" }));
                nextStep();
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [step, isSimulating]);

    const getStatusColor = (status: string) => {
        if (status === "waiting") return "bg-zinc-200 text-zinc-500";
        if (status === "processing") return "bg-blue-500 text-white animate-pulse";
        if (status === "completed") return "bg-green-500 text-white";
        return "";
    };

    return (
        <div className="my-8 p-6 rounded-xl border border-border bg-card shadow-lg">
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold">Fiber 컨텍스트 오염 (Race Condition) 데모</h3>
                        <p className="text-sm text-muted-foreground">
                            Fiber는 성능을 위해 요청 간에 메모리 버퍼를 재사용합니다. <br />
                            동기 작업(Goroutine 등)을 부주의하게 사용할 때 발생하는 문제를 체험해보세요.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsSimulating(true)}
                            disabled={isSimulating || step > 0}
                            className="p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
                        >
                            <Play size={20} />
                        </button>
                        <button
                            onClick={reset}
                            className="p-2 rounded-full bg-muted border border-border hover:bg-muted/80 transition-colors"
                        >
                            <RotateCcw size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-4">
                    {/* Left side: Requests */}
                    <div className="space-y-4">
                        <div className="text-xs font-bold text-muted-foreground uppercase border-b pb-1">Incoming Requests</div>

                        <div className={cn("p-4 rounded-lg border transition-all duration-500", reqA.status !== "waiting" ? "border-primary/50 shadow-md" : "border-border opacity-50")}>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold">{reqA.id}</span>
                                <span className={cn("text-[10px] px-2 py-0.5 rounded-full uppercase font-bold", getStatusColor(reqA.status))}>
                                    {reqA.status}
                                </span>
                            </div>
                            <div className="text-xs text-muted-foreground">Payload: <span className="text-foreground font-mono font-bold uppercase">{reqA.user || "null"}</span></div>
                            {reqA.status === "completed" && (
                                <div className="mt-2 text-[10px] p-2 bg-red-500/10 text-red-600 rounded border border-red-200 flex items-center gap-2">
                                    <AlertCircle size={12} />
                                    <span>출력 값: <strong className="uppercase">{fiberBuffer}</strong> (Bob!? ❌)</span>
                                </div>
                            )}
                        </div>

                        <div className={cn("p-4 rounded-lg border transition-all duration-500", reqB.status !== "waiting" ? "border-primary/50 shadow-md" : "border-border opacity-50")}>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold">{reqB.id}</span>
                                <span className={cn("text-[10px] px-2 py-0.5 rounded-full uppercase font-bold", getStatusColor(reqB.status))}>
                                    {reqB.status}
                                </span>
                            </div>
                            <div className="text-xs text-muted-foreground">Payload: <span className="text-foreground font-mono font-bold uppercase">{reqB.user || "null"}</span></div>
                            {reqB.status === "completed" && (
                                <div className="mt-2 text-[10px] p-2 bg-green-500/10 text-green-600 rounded border border-green-200 flex items-center gap-2">
                                    <ArrowRight size={12} />
                                    <span>출력 값: <strong className="uppercase">{fiberBuffer}</strong> (Bob ✅)</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right side: Fiber's Shared Buffer */}
                    <div className="flex flex-col items-center justify-center p-8 bg-zinc-900 rounded-2xl border-4 border-zinc-800 shadow-inner relative overflow-hidden">
                        <div className="absolute top-2 left-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Fiber shared context buffer</div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={fiberBuffer}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.2, opacity: 0 }}
                                className="text-4xl font-black font-mono text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                            >
                                {fiberBuffer}
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-4 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                            {isSimulating && step < 4 && (
                                <motion.div
                                    className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-xs italic text-muted-foreground text-center">
                    {step === 0 && "시뮬레이션 시작을 기다리는 중..."}
                    {step === 1 && "Request A가 도착하여 버퍼에 'ALICE'를 저장했습니다."}
                    {step === 2 && "⚠️ Request B가 도착하면서 동일한 버퍼를 'BOB'으로 덮어버렸습니다!"}
                    {step === 3 && "Request B는 무사히 'BOB'을 반환했습니다."}
                    {step === 4 && "❌ Request A가 나중에 버퍼를 읽었을 때, 본인의 데이터가 아닌 'BOB'을 가져오게 됩니다."}
                </div>
            </div>
        </div>
    );
}
