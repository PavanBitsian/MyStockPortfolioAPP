import React from 'react'
import StockTransaction from "./StockTransaction"

class MyStockPortfolio extends React.Component{
	
	constructor(){
		super()
		this.state = {
			userName:"",
			userId:"",
			currentCashBalance:"",
			netAssetValue:"",
			stocksHeld:[],
			listOfCashTransactions:[],
			allStocks:[],
			cashAmount:"",
			companyName:"",
			currentPricePerShare:"",
			stockMarket:[
			{numOfShares:"",
			stockValue:""
			}
			]
			}
		this.awsapiurl = "";
		this.apiurl = "http://mystockportfolio.us-east-2.elasticbeanstalk.com";//"http://localhost:8080";
		this.handleAddCash = this.handleAddCash.bind(this)	
		this.refreshUserDetails = this.refreshUserDetails.bind(this)	
		this.buyStock = this.buyStock.bind(this)	
		this.sellStock = this.sellStock.bind(this)	
		this.setStockTransParams = this.setStockTransParams.bind(this)
	}
	
	componentDidMount(){
		console.log("start componentDidMount")
		fetch(this.apiurl+'/users/12345',{method:'GET'})
		.then(response => response.json())
		.then(response => {
			console.log(response)
			console.log(response.userId)
			this.setState({userName:response.userName})
			this.setState({userId:response.userId})
			this.setState({currentCashBalance:response.currentCashBalance})
			this.setState({netAssetValue:response.netAssetValue})
			this.setState({stocksHeld:response.stocksHeld})
			this.setState({listOfCashTransactions:response.listOfCashTransactions})
			this.setState({Stocks:response.allStocks})
		}).catch(console.log)
		
		fetch(this.apiurl+'/stocks/allStocks',{method:'GET'})
		.then(res => res.json())
		.then(res => {
			//console.log(res)
			this.setState({allStocks:res})
			}).catch(console.log)
			
		console.log("end componentDidMount")
	}
	
	handleAddCash(event){
		console.log("start handleAddCash")
		const {name,value}=event.target
		this.setState({[name]:value})
		fetch(this.apiurl+'/transactions/'+this.state.userId,{
			  method: 'POST',
			  headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({
				"userId":this.state.userId,
				"timeStamp":"7-6-2019",
				"amount":this.state.cashAmount,
				"transactionType":"Cr."
			  })
		})
		console.log("end handleAddCash")	
	}
	
	buyStock(event){
		console.log("start buyStock")
		const {name,value}=event.target
		this.setState({[name]:value})
		fetch(this.apiurl+'/transact/buy',{
			  method: 'POST',
			  headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({
				"userId":this.state.userId,
				"companyName":"MSFT",
				"numOfShares":100,
				"eachSharePurchaseValue":10000
			  })
		})
		console.log("buyStock numOfShares:"+this.state.stockMarket[0].numOfShares)
		console.log("buyStock stockValue:"+this.state.stockMarket[0].stockValue)
		console.log("end buyStock")
	}
	
	sellStock(event){
		console.log("start sellStock")
		const {name,value}=event.target
		this.setState({[name]:value})
		fetch({origin:this.apiurl+'/transact/sell',cors: true},{
			  method: 'POST',
			  headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*' ,
			    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
			  },
			  body: JSON.stringify({
				"userId":this.state.userId,
				"companyName":"MSFT",
				"numOfShares":20,
				"eachSharePurchaseValue":10000
			  })
		})
		console.log("sellStock numOfShares:"+this.state.numOfShares)
		console.log("end sellStock")
	}
	
	setStockTransParams(event){
		console.log("start setStockTransParams")
		const {name,value}=event.target
		this.setState({[name]:value})
		
		console.log("end setStockTransParams")
	}
	
	refreshUserDetails(event){
		console.log("start refreshUserDetails")
		const {name,value}=event.target
		this.setState({[name]:value})
		console.log("end refreshUserDetails")
	}
	
	render(){
		return (<div>
					
					<div className="user">
						<h2 className="userName">{this.state.userName}</h2>
						<h2 className="currentCashBalance">Available Cash balance: {new Intl.NumberFormat().format(this.state.currentCashBalance)}</h2>
						<h2 className="netAssetValue">Net Asset Value: {new Intl.NumberFormat().format(this.state.netAssetValue)}</h2>
					</div>
					
					<form className="cash-form" onSubmit={this.handleAddCash}>
						<input type="text" name="cashAmount" placeholder="Enter amount to add" value={this.state.cashAmount} onChange={this.refreshUserDetails}/> &nbsp;&nbsp;&nbsp;
						<button>Add Cash</button>
					</form>
					<div>
					<h2>List of Cash Transactions:</h2>
					<table>
					<tr>
						<th>Time Stamp</th>&nbsp;&nbsp;&nbsp;
						<th>Amount</th>&nbsp;&nbsp;&nbsp;
						<th>Transaction Type(Dr./Cr.)</th>
					</tr>
					<tr>
						<th>{this.state.listOfCashTransactions.map(item=>(<tr>{item.timeStamp}</tr>))}</th>&nbsp;&nbsp;&nbsp;
						<th>{this.state.listOfCashTransactions.map(item=>(<tr>{new Intl.NumberFormat().format(item.amount)}</tr>))}</th>&nbsp;&nbsp;&nbsp;
						<th>{this.state.listOfCashTransactions.map(item=>(<tr>{item.transactionType}</tr>))}</th>
					</tr>
					</table>
					</div>
					<div>
					<h2>Current list of stocks held:</h2>
					<table>
					<tr>
						<th>Company Name</th>&nbsp;&nbsp;&nbsp;
						<th>Number of stocks held</th>&nbsp;&nbsp;&nbsp;
					</tr>
					<tr>
						<th>{this.state.stocksHeld.map(item=>(<tr>{item.companyName}</tr>))}</th>&nbsp;&nbsp;&nbsp;
						<th>{this.state.stocksHeld.map(item=>(<tr>{item.numOfShares}</tr>))}</th>&nbsp;&nbsp;&nbsp;
					</tr>
					</table>
					</div>
					
					<div>
					<h2>To make transaction use the below table, enter the number of shares in the input box against company name and click on buy or sell button</h2>
					<table>
					<tr>
						<th>Company Name</th>&nbsp;&nbsp;&nbsp;
						<th>Current price per share</th>&nbsp;&nbsp;&nbsp;
						<th>Num. of Shares </th>&nbsp;&nbsp;&nbsp;
						<th>Buy/Sell</th>
					</tr>
					<tr>
						<th>{this.state.allStocks.map(item=>(<tr>{item.companyName}</tr>))}</th>&nbsp;&nbsp;&nbsp;
						<th>{this.state.allStocks.map(item=>(<tr><output name="stockValue" value={this.state.stockMarket.stockValue=item.high}>{item.high}</output></tr>))}</th>&nbsp;&nbsp;&nbsp;
						<th>{this.state.allStocks.map(item=>(<tr><input type="text" placeholder="Enter number of shares" name="numOfShares" value={this.state.stockMarket.numOfShares} onChange={this.setStockTransParams}/></tr>))}</th>&nbsp;&nbsp;&nbsp;
						<th>{this.state.allStocks.map(item=>(<tr><button onClick={this.buyStock}>Buy</button>&nbsp;&nbsp;&nbsp;<button onClick={this.sellStock}>Sell</button></tr>))}</th>&nbsp;&nbsp;&nbsp;
					</tr>
					</table>
					</div>
					
					<div>
					
						<br/>
						<br/>
						<br/>
						<br/>
						<br/>
					
					</div>
					
				</div>
				)
	}
}

export default MyStockPortfolio
