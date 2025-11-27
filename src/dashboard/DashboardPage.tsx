import AcademicLayout from "@/dashboard/AcademicLayout"
import { ChartAreaInteractive } from "@/dashboard/components/chart-area-interactive"
import { DataTable } from "@/dashboard/components/data-table"
import { SectionCards } from "@/dashboard/components/section-cards"
import data from "@/dashboard/data.json"

export default function DashboarPage() {
  return (
    <AcademicLayout title="Dashboard: Clinica Oftalmológica Gismondi">
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </AcademicLayout>
  )
}