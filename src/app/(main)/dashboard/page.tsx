import DashboardCard from "@/components/DashboardCard/DashboardCard";

export default function Dashboard() {
    return (
        // Full viewport
        <div className={'w-full h-full flex'}>
            <div className={'m-auto h-1/2 w-1/2 flex'}>
                <DashboardCard title={'Dashboard'}>
                    {/*TODO: Implementar features no dashboard*/}
                    <p className={'text-xl'}>Seja bem vindo</p>
                </DashboardCard>
            </div>
        </div>
    )
}
