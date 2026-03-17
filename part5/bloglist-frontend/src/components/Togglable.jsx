import { useState, useImperativeHandle } from 'react'

const Togglable = ({ label, ref, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisible }
  })

  return (
    <>
      {visible?children:''}
      <button onClick={toggleVisible}>{!visible?label:'cancel'}</button>
    </>
  )
}

export default Togglable