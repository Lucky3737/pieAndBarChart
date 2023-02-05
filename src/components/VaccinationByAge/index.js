import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {data} = props

  return (
    <div className="coverage">
      <h1 className="heading-v">Vaccination by Age</h1>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Legend
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            align="center"
          />
          <Pie
            cy="40%"
            cx="70%"
            data={data}
            startAngle={0}
            endAngle={360}
            verticalAlign="middle"
            horizontalAlign="middle"
            dataKey="count"
          >
            <Cell name="18-44" fill="#a44c9e" />
            <Cell name="45-60" fill="#b3d23f" />
            <Cell name="Above 60" fill=" #2d87bb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
