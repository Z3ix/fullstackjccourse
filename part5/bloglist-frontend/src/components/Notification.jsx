const Notification = ({ error, info }) => {
  return(
    <>
      <Info info = {info}/>
      <Error error = {error}/>
    </>
  )
}

const Error = ({ error }) => {
  if (error) return(
    <div className = 'error'>
      {error}
    </div>
  )
}

const Info = ({ info }) => {
  if (info) return(
    <div className = 'info'>
      {info}
    </div>
  )
}


export default Notification