import { createFileRoute } from '@tanstack/react-router';

import { useVestingScheduleChart } from '@/components/features/vesting-schedule-listing/vesting-schedule-chart/hook';
import { VestingScheduleChart } from '@/components/features/vesting-schedule-listing/vesting-schedule-chart/VestingScheduleChart';
import { VestingScheduleStats } from '@/components/features/vesting-schedule-listing/vesting-schedule-stats/VestingScheduleStats';
import { VestingScheduleTable } from '@/components/features/vesting-schedule-listing/vesting-schedule-table/VestingScheduleTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/vesting/')({
  component: Vesting
});

function Vesting() {
  const chart = useVestingScheduleChart();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1 className="page-title">Vesting</h1>

        <VestingScheduleStats chart={chart} />

        <VestingScheduleChart chart={chart} />

        <VestingScheduleTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default Vesting;
