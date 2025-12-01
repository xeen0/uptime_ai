import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { getContributions } from "../utils/index";
import RadarChart from "./RadarChart";
import activitySummary from "../data/activitySummary.json";

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

      <hr className="my-8 border-gray-300" />

      <div className="mt-4 grid md:grid-cols-2 gap-10 relative">
        <div className="pb-4">
          <h3 className="font-semibold text-lg mb-3">Activity overview</h3>
          <ul className="space-y-2 text-sm">
            <li>{activitySummary.commits || 0} commits</li>
            <li>{activitySummary.prsOpened || 0} pull requests opened</li>
            <li>{activitySummary.issuesOpened || 0} issues opened</li>
            <li>{activitySummary.reviews || 0} code reviews</li>
          </ul>
        </div>

        <div className="hidden md:block absolute left-1/2 top-0 h-full border-l border-gray-300"></div>

        <div className="flex items-center justify-center pb-4">
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

      <hr className="my-8 border-gray-300" />

      <div class="mt-10 bg-white">
        <h3 class="font-semibold text-lg mb-4">Contribution activity</h3>

        <p class="font-medium text-sm mb-4 text-gray-700">October 2025</p>

        <div class="relative ml-2 pl-6 border-l border-gray-300 space-y-10">
          <div class="relative">
            <span class="absolute -left-3 top-1 w-2.5 h-2.5 bg-gray-400 rounded-full"></span>

            <p class="text-sm font-medium text-gray-800">
              Created <b class="font-semibold">56 commits</b> in 11 repositories
            </p>

            <ul class="mt-3 ml-4 space-y-1 text-sm text-blue-600 underline cursor-pointer">
              <li>UptimeAI/uptime_webapp</li>
              <li>UptimeAI/uptime_ml</li>
              <li>UptimeAI/uptime_scripts</li>
            </ul>
          </div>

          <div class="relative">
            <span class="absolute -left-3 top-1 w-2.5 h-2.5 bg-gray-400 rounded-full"></span>

            <p class="text-sm font-medium text-gray-800">
              Opened <b class="font-semibold">29 pull requests</b> in 5
              repositories
            </p>

            <ul class="mt-4 ml-4 space-y-3 text-sm">
              <li class="flex items-center justify-between">
                <span class="text-blue-600 underline cursor-pointer">
                  UptimeAI/uptime_webapp
                </span>
                <span class="flex items-center gap-2">
                  <span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md">
                    merged
                  </span>
                  <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-md">
                    open
                  </span>
                </span>
              </li>

              <li class="flex items-center justify-between">
                <span class="text-blue-600 underline cursor-pointer">
                  UptimeAI/uptime_ml
                </span>
                <span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md">
                  merged
                </span>
              </li>

              <li class="flex items-center justify-between">
                <span class="text-blue-600 underline cursor-pointer">
                  UptimeAI/uptime_scripts
                </span>
                <span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md">
                  merged
                </span>
              </li>

              <li class="flex items-center justify-between">
                <span class="text-blue-600 underline cursor-pointer">
                  UptimeAI/uptime_mi
                </span>
                <span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md">
                  merged
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8 flex justify-center">
          <button class="px-4 py-2 text-sm border w-full border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            Show more activity
          </button>
        </div>

        <p class="text-xs text-gray-500 mt-4">
          Seeing something unexpected? Take a look at the GitHub profile guide.
        </p>
      </div>
    </div>
  );
}
