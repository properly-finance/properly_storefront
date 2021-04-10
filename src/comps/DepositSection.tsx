import React from "react"
import { Route, Switch } from "react-router-dom"
import WindowTitle from "@emmpair/comps/WindowTitle"
import DepositPage from  "@emmpair/comps/DepositPage"

const DepositSection: React.FC = () => {  
  return (
    <>
    <WindowTitle title={'Collateral & Mint | Properly'} />
    <Switch>
      <Route exact path="/" component={DepositPage} />
    </Switch>      
    </>
  )
}

export default DepositSection