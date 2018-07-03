(function(){
  let name = function () {
    let dict = require('./dict/n.js')
    dict = dict.split('\n')
    dict = dict.map((d) => {
      return d.split(' ')
    })
    let names = {
      '金': [],
      '木': [],
      '水': [],
      '火': [],
      '土': []
    }
    names = dict.reduce(function(names, name) {
      if (name.length === 1 || name[0] === '') {
        return names
      }
      let desc = name[2].split('：')
      if (desc.length === 2) {
        let obj = {ccter: name[0], name: name[1], prop: desc[0], desc: desc[1]}
        names[desc[0]].push(obj)
      }
      return names
    }, names)
    let properties = [ "金", "水", "木", "火", "土" ]
    let len = Math.floor(Math.random() * 2) + 1
    let name = ''
    for (let i = 0; i < len; i++) {
      let prop = properties[Math.floor(Math.random() * 5)]
      let pnames = names[prop]
      name += pnames[Math.floor(Math.random() * pnames.length)].name
    }
    // console.log(name)
    return name
  }
  let fname = function () {
    let dict = require('./dict/f.js')
    dict = dict.split('\n')
    dict = dict.map((d) => {
      return d.split(' ')
    })
    let fname = []
    dict.reduce((fname, name) => {
      if (name.length === 1 || name[0] === '') {
        return fname
      }
      name.reduce((fname, name) => {
              fname.push(name)
              return fname
            }, fname)
      return fname
    }, fname)
    let fname_ = fname[Math.floor(Math.random() * fname.length)]
    return fname_
  }
  let beg = new Date().getTime()
  let end = new Date().getTime()
  fname()
  console.log('last: ' + (end - beg) + 'ms')
  module.exports = {fname, name}
})()