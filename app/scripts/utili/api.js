import axios from 'axios'


module.exports = {

  fetshRepos: (lang) => {

    let url = `https://api.github.com/search/repositories?q=stars:%3E1+language:%20${lang}&sort=stars&order=desc&type=Repositories`

    return axios.get(url)
          .then((res) => {
          return res.data.items
          })
          .catch((err) => {
            console.log(err)
          })
  }
}
