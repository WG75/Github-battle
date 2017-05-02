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

const Repos = (props) => {
  return(
    <ul className="repos-wrapper">
      {props.repos.map((repo, i) => {
        return(
          <li key={repo.id} className='repo'>
            <span>{'#' + (i + 1)}</span>
            <img src={repo.owner.avatar_url} alt={repo.description}/>
            <a href={repo.url}>{repo.name}</a>
            <spna>{'@' + repo.owner.login}</spna>
            <span>{repo.stargazers_count + ' stars'}</span>
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

Repos.propTypes = {
  repos: prop.array.isRequired
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

    api.fetshRepos(activeTab)
    .then((res) => {
      this.setState({
        repos: res
      })
    })
  }

  render(){
      return (
        <div>
          <Tabs updateActiveTab={this.updateActiveTab}
                activeTab={this.state.activeTab} />
          {!this.state.repos ?
          <p>loading....</p> :
          <Repos repos={this.state.repos} />
          }
        </div>
             )
       }

  componentDidMount(){
    this.updateActiveTab(this.state.activeTab)
  }

}


module.exports = Popular
