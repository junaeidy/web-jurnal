import { AreaChart, Area, ResponsiveContainer } from "recharts";

export default function StatCard({
    icon,
    label,
    value,
    color = "blue",
    data = [],
}) {
    const colorMap = {
        blue: {
            bg: "bg-blue-50",
            iconBg: "bg-blue-100 text-blue-600",
            chart: "#3b82f6",
        },
        green: {
            bg: "bg-green-50",
            iconBg: "bg-green-100 text-green-600",
            chart: "#10b981",
        },
        red: {
            bg: "bg-red-50",
            iconBg: "bg-red-100 text-red-600",
            chart: "#ef4444",
        },
        orange: {
            bg: "bg-orange-50",
            iconBg: "bg-orange-100 text-orange-600",
            chart: "#f97316",
        },
    };

    const colors = colorMap[color] || colorMap.blue;

    return (
        <div
            className={`relative overflow-hidden rounded-xl border p-5 ${colors.bg}`}
        >
            {/* Grafik sebagai latar belakang */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={colors.chart}
                            fill={colors.chart}
                            strokeWidth={2}
                            fillOpacity={0.2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Konten utama */}
            <div className="relative z-10 flex justify-between items-center">
                <div>
                    <div
                        className={`p-3 inline-flex rounded-full ${colors.iconBg}`}
                    >
                        {icon}
                    </div>
                    <div className="mt-2 text-sm text-gray-500">{label}</div>
                    <div className="text-2xl font-semibold text-gray-800">
                        {value}
                    </div>
                </div>
            </div>
        </div>
    );
}
