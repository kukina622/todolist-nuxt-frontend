function WhereAmIStanding(location = '雲林') {
  alert(location)
}

export default (context, inject) => {
  inject('WhereAmIStanding', WhereAmIStanding)
}
