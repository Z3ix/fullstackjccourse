import { useDispatch} from "react-redux"
import { filterTo } from "../reducers/filterReducer"


const Filter = () => {
    const dispatch = useDispatch();


  const handleChange = (event) => {
    dispatch(filterTo(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter