import React from 'react'
import prop from 'prop-types'
import api from '../utili/api'


const Tabs = (props) => {

  const languages = ['All', 'Javascript', 'Ruby', 'Python', 'Java', 'Css']

  return (
            <ul className="tabs">
              {languages.map((lang) => {
                  return (
                          <li key={lang}
                              onClick={props.updateActiveTab.bind(null, lang)}
                              className={(props.activeTab == lang) ? 'selected' : null}>
                            {lang}
                          </li>
                        )
                  })}
            </ul>
       )
}


Tabs.propTypes = {
  updateActiveTab: prop.func.isRequired,
  activeTab: prop.string.isRequired
}


class Popular extends React.Component{
  constructor(props){
    super();
    this.state = {
      activeTab: 'All',
      repos: null
    }
    this.updateActiveTab = this.updateActiveTab.bind(this);
  }

  updateActiveTab(activeTab){
    this.setState({
      activeTab: activeTab,
      repos: null
    })

    api.fetshRepos(this.state.activeTab)
    .then((res) => {
      this.setState({
        repos: res
      })
    })
  }

  render(){
      return (
          <Tabs updateActiveTab={this.updateActiveTab}
                activeTab={this.state.activeTab} />
             )
       }

  componentDidMount(){
    this.updateActiveTab(this.state.activeTab)
  }

}


module.exports = Popular
