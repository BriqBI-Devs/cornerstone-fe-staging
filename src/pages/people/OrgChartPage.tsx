import { useParams } from "react-router-dom";
import { OrgChartPage as OrgChart } from "../../features/people/components/org-chart-page/OrgChartPage";
import { getPersonById } from "../../features/people/data";

export function OrgChartPage() {
  const person = getPersonById(useParams().id);

  // key restarts the chart when the person changes; an unknown id starts at the top.
  return <OrgChart key={person?.id ?? 0} startId={person?.id ?? 1} />;
}
