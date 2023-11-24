const parseErrorMsg = function(err: any): string{
  try{
    return JSON.parse(err)?.[0]?.message || err.message
  }catch{
    return err.message
  }
}

export default parseErrorMsg