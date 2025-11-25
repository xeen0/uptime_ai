import LeftPanelComponent from "../components/LeftPanelComponent";
import GraphComponent from "../components/GraphComponent";

/**
 * Displays the overview tab. It renders the user’s left panel and contribution graph.
 * Receives a memoised `user` prop from ProfilePage so it only re‑renders when the user changes.
 */
export default function OverviewPage({ user }) {
  if (!user) return null;
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-72 w-full flex-none">
        <LeftPanelComponent user={user} />
      </div>
      <div className="flex-1 min-w-0 md:pt-4">
        <GraphComponent username={user.login} />
      </div>
    </div>
  );
}
