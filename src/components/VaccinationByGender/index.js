import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {data} = props

  return (
    <div className="coverage">
      <h1 className="heading-v">Vaccination BY Age</h1>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            cy="40%"
            cx="70%"
            data={data}
            startAngle={0}
            endAngle={180}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
            align="center"
          >
            <Cell name="Others" fill="#a44c9e" />
            <Cell name="Female" fill="#b3d23f" />
            <Cell name="Male" fill="#fecba6" />
          </Pie>

          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="middle"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByGender
