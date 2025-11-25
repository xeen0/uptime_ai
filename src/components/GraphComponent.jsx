import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { getContributions } from "../utils/index";

export default function GraphComponent({ username }) {
  const [values, setValues] = useState(null);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    async function fetchData() {
      setValues(null);
      const data = await getContributions(username);
      const yearList = Object.keys(data.total).sort((a, b) => b - a);
      setValues(data.contributions);
      setYears(yearList);
      setSelectedYear(yearList[0]);
    }
    fetchData();
    
  }, [username]);

  if (!values) {
    return (
      <div className="mt-6 border rounded-lg p-4 shadow-sm bg-white">
        <p className="text-gray-500">Loading contributions…</p>
      </div>
    );
  }

  const filtered = values.filter((item) => item.date.startsWith(selectedYear));
  const startDate = filtered[0]?.date;
  const endDate = filtered[filtered.length - 1]?.date;

  return (
    <div className="mt-6 border rounded-lg p-4 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-gray-800">Contributions</h2>
        <select
          className="border px-3 py-1.5 rounded text-sm bg-gray-50 hover:bg-gray-100 transition"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-full overflow-x-auto overflow-y-hidden">
        <div className="inline-block min-w-[950px] w-full">
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={filtered}
            gutterSize={3}
            showWeekdayLabels={true}
            classForValue={(value) => {
              if (!value || !value.count) return "color-empty";
              if (value.count < 2) return "color-scale-1";
              if (value.count < 5) return "color-scale-2";
              if (value.count < 10) return "color-scale-3";
              return "color-scale-4";
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-gray-500">Showing contributions for {selectedYear}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#ebedf0]"></div>
            <div className="w-2.5 h-2.5 rounded-sm bg-[#9be9a8]"></div>
            <div class="w-2.5 h-2.5 rounded-sm bg-[#40c463]"></div>
            <div class="w-2.5 h-2.5 rounded-sm bg-[#30a14e]"></div>
            <div class="w-2.5 h-2.5 rounded-sm bg-[#216e39]"></div>
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
