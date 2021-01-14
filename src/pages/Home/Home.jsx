// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getUserById } from '../../store/user/UserActions'
import { LoginSingup } from "../../components/LoginSignup/LoginSignup"
// import { getRate } from '../../store/bitcoin/BitcoinActions'


export const Home = (props) => {
  // const { user } = useSelector(store => store.user)
  // const { bitcoinRate } = useSelector(store => store.bitcoin)
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getRate())
  //   dispatch(getUserById())
  // }, [dispatch])
  return (
    <main className="home">
      <div className="container flex col ac jc">
        {/* <div className="flex col"> */}
          <LoginSingup props={props}></LoginSingup>
        {/* </div> */}
      </div>
    </main>
  )
}
