// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const api = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'LOADING',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: '',
    vaccinationDataOf7Day: [],
    dataByAge: [],
    dataByGender: [],
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    const url = 'https://apis.ccbp.in/covid-vaccination-dat'

    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()

      const vaccinationData = data.last_7_days_vaccination.map(eachDay => ({
        dose1: eachDay.dose_1,
        dose2: eachDay.dose_2,
        vaccineDate: eachDay.vaccine_date,
      }))

      const dataAge = data.vaccination_by_age.map(eachAge => ({
        age: eachAge.age,
        count: eachAge.count,
      }))

      const dataGender = data.vaccination_by_gender.map(eachGender => ({
        count: eachGender.count,
        gender: eachGender.gender,
      }))

      this.setState({
        vaccinationDataOf7Day: vaccinationData,
        dataByAge: dataAge,
        dataByGender: dataGender,
        apiStatus: api.success,
      })
    } else {
      this.setState({apiStatus: api.failure})
    }
  }

  renderOfContent = () => {
    const {vaccinationDataOf7Day, dataByAge, dataByGender} = this.state
    return (
      <>
        <VaccinationCoverage data={vaccinationDataOf7Day} />

        <VaccinationByGender data={dataByGender} />
        <VaccinationByAge data={dataByAge} />
      </>
    )
  }

  renderOfFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderComponent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case api.success:
        return this.renderOfContent()
      case api.failure:
        return this.renderOfFailure()
      case api.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    return (
      <div className="app">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo "
          />
          <h1 className="heading">CO-WIN</h1>
        </div>
        <h1 className="cowin-heading">CoWIN Vaccination in India</h1>
        {this.renderComponent()}
      </div>
    )
  }
}

export default CowinDashboard
