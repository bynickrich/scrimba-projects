import { use } from "react";
import supabase from "./supabase-client";

// Promise created at module level — runs once, never re-created on render
const metricsPromise = supabase
  .from("sales_deals")
  .select("name, value")
  .order("value", { ascending: false })
  .limit(1)
  .then(({ data, error }) => {
    if (error) throw error;
    return data;
  });

function Dashboard() {
  const metrics = use(metricsPromise);
  console.log(metrics);

  return (
    <div className="dashboard-wrapper">
      <div className="chart-container">
        <h2>Total Sales This Quarter ($)</h2>
        {metrics && metrics[0] && (
          <p>
            Top deal: {metrics[0].name} — ${metrics[0].value}
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
