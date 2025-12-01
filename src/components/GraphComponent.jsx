import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { getContributions } from "../utils/index";
import RadarChart from "./RadarChart";
import activitySummary from '../data/activitySummary.json';

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
      <div className="mt-6 border rounded-xl p-5 shadow-sm bg-white">
        <p className="text-gray-500">Loading contributions…</p>
      </div>
    );
  }

  const filtered = values.filter((item) => item.date.startsWith(selectedYear));
  const startDate = filtered[0]?.date;
  const endDate = filtered[filtered.length - 1]?.date;

  return (
    <div className="mt-6 border rounded-xl p-6 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-gray-700">Contributions</h2>

        <select
          className="border px-3 py-2 rounded-lg text-sm bg-white hover:bg-gray-50 transition shadow-sm"
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
        <p className="text-xs text-gray-500">
          Showing contributions for {selectedYear}
        </p>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-[#ebedf0]"></div>
            <div className="w-3 h-3 rounded-sm bg-[#c6e48b]"></div>
            <div className="w-3 h-3 rounded-sm bg-[#7bc96f]"></div>
            <div className="w-3 h-3 rounded-sm bg-[#40c463]"></div>
            <div className="w-3 h-3 rounded-sm bg-[#30a14e]"></div>
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3">Activity overview</h3>
          <ul className="space-y-2 text-sm">
            <li>🟢 {activitySummary.commits || 0} commits</li>
            <li>🟣 {activitySummary.prsOpened || 0} pull requests opened</li>
            <li>🟠 {activitySummary.issuesOpened || 0} issues opened</li>
            <li>💬 {activitySummary.reviews || 0} code reviews</li>
          </ul>
        </div>

        <div className="border rounded-lg p-4 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p className="text-sm">Contribution Radar</p>
            <p className="text-xs mt-1">
              <RadarChart
                dataPoints={[
                  activitySummary.commits || 0,
                  activitySummary.prsOpened || 0,
                  activitySummary.issuesOpened || 0,
                  activitySummary.reviews || 0,
                ]}
              />
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 border rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-4">Contributor activity</h3>

        <div className="text-sm">
          <p className="font-medium mb-2">October 2025</p>

          <div className="ml-3 space-y-3">
            <div>
              <p>
                ✓ Created <b>{activitySummary.commits || 0}</b> commits in
                repositories
              </p>
            </div>

            <div>
              <p>
                ✓ Opened <b>{activitySummary.prsOpened || 0}</b> pull requests
              </p>
            </div>

            <div>
              <p>
                ✓ Opened <b>{activitySummary.issuesOpened || 0}</b> issues
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
