import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PerformanceChart({ signals }) {
  // Prepare data: convert to chart format
  const chartData = signals.map((s, index) => ({
    name: `#${index + 1}`,
    perf: s.performance_score ? Number(s.performance_score * 100).toFixed(2) : 0,
  }));

  return (
    <div className="card" style={{ height: "280px" }}>
      <h2 className="card-title">Performance Trend</h2>
      <p className="card-subtitle">Signal performance across entries.</p>

      {chartData.length === 0 ? (
        <p style={{ marginTop: "1rem" }}>Not enough data to display chart.</p>
      ) : (
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <XAxis dataKey="name" stroke="#475569" />
            <YAxis stroke="#475569" />
            <Tooltip
              contentStyle={{
                background: "#0f1523",
                border: "1px solid #1e293b",
                color: "white",
              }}
            />

            <Area
              type="monotone"
              dataKey="perf"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPerf)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
