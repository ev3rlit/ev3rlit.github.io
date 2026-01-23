"use client";

import React, { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseComponentNode } from '../../base/BaseComponentNode';
import { BarChart as BarChartIcon, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

export const ChartNode = memo(({ data, selected }: NodeProps) => {
    const chartType = data.props?.type || 'line';

    // Parse data if it's a string (from expression props)
    let chartData = data.props?.data;
    console.log('[ChartNode] Raw data prop:', chartData, typeof chartData);

    if (typeof chartData === 'string') {
        try {
            // Replace single quotes with double quotes for JSON parsing
            chartData = JSON.parse(chartData.replace(/'/g, '"'));
        } catch (e) {
            console.error('[ChartNode] Failed to parse data:', e);
            chartData = [];
        }
    }

    // No default data - use empty array if not provided
    chartData = chartData || [];

    const xKey = data.props?.xKey || 'name';
    const yKey = data.props?.yKey || 'value';
    const color = data.props?.color || '#3b82f6';

    // Select Icon based on type
    const Icon = chartType === 'bar' ? BarChartIcon : chartType === 'area' ? PieChartIcon : LineChartIcon;

    const renderChart = () => {
        if (chartType === 'bar') {
            return (
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                    <XAxis dataKey={xKey} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ fontSize: '12px' }}
                    />
                    <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
                </BarChart>
            );
        }
        if (chartType === 'area') {
            return (
                <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                    <XAxis dataKey={xKey} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey={yKey} stroke={color} fill={color} fillOpacity={0.2} />
                </AreaChart>
            );
        }
        // Default Line
        return (
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                <XAxis dataKey={xKey} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px' }}
                />
                <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
        );
    };

    return (
        <BaseComponentNode
            selected={selected}
            title={`${chartType} Chart`}
            icon={Icon}
            headerColor="text-blue-500"
            className="min-w-[400px]"
        >
            <div className="h-[200px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                </ResponsiveContainer>
            </div>
        </BaseComponentNode>
    );
});

ChartNode.displayName = 'ChartNode';
