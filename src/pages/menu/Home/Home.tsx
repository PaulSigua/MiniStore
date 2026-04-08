import { Stat } from "../../../components/animations/tailwind/Stat"
import { Chart } from "../../../components/animations/tailwind/Chart"


export const Home = () => {
    return (
        <section className="flex flex-col gap-6">
            <h1 className="color-title-primary text-3xl font-bold">
                Inicio
            </h1>
            <div className="flex w-full gap-3">
                <Stat title="Ventas" value={3} change="+10%" />
                <Stat title="Ventas" value={3} change="+10%" />
                <Stat title="Ventas" value={3} change="+10%" />
                <Stat title="Ventas" value={3} change="+10%" />
            </div>
            <div>
                <Chart title="Ventas del mes" content={<p>Gráfico de ventas</p>} />
            </div>
            <div className="flex gap-4">
                <Chart title="Productos más vendidos" content={<p>Gráfico de productos</p>} />
                <Chart title="Clientes más frecuentes" content={<p>Gráfico de clientes</p>} />
            </div>
        </section>
    )
}