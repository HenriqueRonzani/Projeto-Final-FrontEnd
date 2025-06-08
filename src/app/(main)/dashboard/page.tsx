import Surface from "@/components/Surface/Surface";

export default function Dashboard() {
    return (
        // Full viewport
        <div className={'w-full h-full flex'}>
            <Surface title={'Dashboard'}>
                {/*TODO: Implementar features no dashboard*/}
                <p className={'text-xl'}>Seja bem vindo</p>
            </Surface>
        </div>
    )
}
