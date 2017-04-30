import React from 'react'

class Tabs extends React.Component{
  constructor(props){
    super();
    this.state = {
      activeTab: 'All'
    }
    this.updateActiveTab = this.updateActiveTab.bind(this);
  }

  updateActiveTab(activeTab){
    this.setState({
      activeTab: activeTab
    })
  }

  render(){
    const languages = ['All', 'Javascript', 'Ruby', 'Python', 'Java', 'Css']

    return (
              <ul className="tabs">
                {languages.map((lang) => {
                  return (<li key={lang}
                              onClick={this.updateActiveTab.bind(null, lang)}
                              className={(this.state.activeTab == lang) ? 'selected' : null}
                          >{lang}</li>)
                })}
              </ul>
         )
       }
}


module.exports = Tabs
