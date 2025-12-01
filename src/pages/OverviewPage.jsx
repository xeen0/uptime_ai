import LeftPanelComponent from "../components/LeftPanelComponent";
import GraphComponent from "../components/GraphComponent";
import RightPanelComponent from "../components/RightPanelComponent";

export default function OverviewPage({ user }) {
  if (!user) return null;
  return (
 <div className="flex flex-col md:flex-row gap-8 h-screen">
      <div className="md:w-72 w-full flex-none">
        <div className="h-full overflow-y-auto">
          <LeftPanelComponent user={user} />
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <RightPanelComponent user={user} />
        </div>
      </div>
    </div>
  );
}
