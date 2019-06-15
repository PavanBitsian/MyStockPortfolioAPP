import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Footer from './Footer'
import MyStockPortfolio from './MyStockPortfolio'



function App(){
	return (<div>
				<Header/>
				<h1>Welcome back!</h1>
				<MyStockPortfolio/>
				<Footer/>
			</div>)
}
export default App