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
			stockMarket:[{
			id:"",
			companyName:"",
			currentPricePerShare:"",
			numOfShares:"",
			stockValue:""
			}],
			compName:"",
			numOfShares:"",
			stockValue:""
			}
		
			
			
		this.awsapiurl = "";
		this.apiurl = "http://MystockportfolioApi-env.tepfxxuiem.us-east-2.elasticbeanstalk.com";//"http://mystockportfolio.us-east-2.elasticbeanstalk.com";//"http://localhost:8080"; 
		this.handleAddCash = this.handleAddCash.bind(this)	
		this.refreshUserDetails = this.refreshUserDetails.bind(this)	
		this.buyStock = this.buyStock.bind(this)	
		this.sellStock = this.sellStock.bind(this)	
		this.setStockTransParams = this.setStockTransParams.bind(this)
		this.purchaseStock = this.purchaseStock.bind(this)
		this.setStockTransParams2 = this.setStockTransParams2.bind(this)
		this.saleStock = this.saleStock.bind(this)
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
				"companyName":this.state.companyName,
				"numOfShares":this.state.numOfShares,
				"eachSharePurchaseValue":this.state.stockValue
			  })
		})
		//this.refreshUserDetails(event)
		console.log("buyStock id:"+this.state.stockMarket[0].id)
		console.log("buyStock companyName:"+this.state.stockMarket[0].companyName)
		console.log("buyStock numOfShares:"+this.state.stockMarket[0].numOfShares)
		console.log("buyStock stockValue:"+this.state.stockMarket[0].stockValue)
		console.log("end buyStock")
	}
	
	sellStock(event){
		console.log("start sellStock")
		const {name,value}=event.target
		this.setState({[name]:value})
		fetch(this.apiurl+'/transact/sell',{
			  method: 'POST',
			  headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			  },
			  body: JSON.stringify({
				"userId":this.state.userId,
				"companyName":this.state.companyName,
				"numOfShares":this.state.numOfShares,
				"eachSharePurchaseValue":this.state.stockValue
			  })
		})
		//this.refreshUserDetails(event)
		console.log("sellStock id:"+this.stockMarket.id)
		console.log("sellStock companyName:"+this.stockMarket.companyName)
		console.log("sellStock numOfShares:"+this.stockMarket.numOfShares)
		console.log("sellStock stockValue:"+this.stockMarket.stockValue)
		console.log("end sellStock")
	}
	saleStock(stockMarkets){
		console.log("start saleStock")
		
		fetch(this.apiurl+'/transact/sell',{
			  method: 'POST',
			  headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			  },
			  body: JSON.stringify({
				"userId":this.state.userId,
				"companyName":stockMarkets.companyName,
				"numOfShares":stockMarkets.numOfShares,
				"eachSharePurchaseValue":stockMarkets.stockValue
			  })
		})
		//this.refreshUserDetails(event)
		console.log("saleStock id:"+stockMarkets.id)
		console.log("saleStock companyName:"+stockMarkets.companyName)
		console.log("saleStock numOfShares:"+stockMarkets.numOfShares)
		console.log("saleStock stockValue:"+stockMarkets.stockValue)
		console.log("end saleStock")
	}
	purchaseStock(stockMarkets){
		console.log("start purchaseStock")
		
		fetch(this.apiurl+'/transact/buy',{
			  method: 'POST',
			  headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({
				"userId":this.state.userId,
				"companyName":stockMarkets.companyName,
				"numOfShares":stockMarkets.numOfShares,
				"eachSharePurchaseValue":stockMarkets.stockValue
			  })
		})
		//this.refreshUserDetails(event)
		console.log("purchaseStock id:"+stockMarkets.id)
		console.log("purchaseStock companyName:"+stockMarkets.companyName)
		console.log("purchaseStock numOfShares:"+stockMarkets.numOfShares)
		console.log("purchaseStock stockValue:"+stockMarkets.stockValue)
		console.log("end purchaseStock")
	}
	
	setStockTransParams(event){
		console.log("start setStockTransParams")
		const {name,value}=event.target
		//this.setState({[name]:value})
		console.log("index:"+event.target.id+" "+event.target.value)
		var stockMarkets = {id:event.target.id,
			companyName:this.state.allStocks[event.target.id].companyName,
			numOfShares:event.target.value,
			stockValue:this.state.allStocks[event.target.id].high}
		
		console.log("id:"+stockMarkets.id)
		console.log("numOfShares:"+stockMarkets.numOfShares)
		console.log("stockValue:"+stockMarkets.stockValue)
		this.purchaseStock(stockMarkets);	
		this.refreshUserDetails(event);
		//this.setState(prevstate => {prevstate.stockMarket.map( item=> {if(item.id=stockMarkets.id) {return stockMarkets}}) })
		//this.setState({[name]:value}) //stockMarket[event.target.id]=stockMarket,
		//console.log("numOfShares2:"+this.state.stockMarket[stockMarkets.id].numOfShares)
		//var allStocks[event.target.id].numOfShares=event.target.value
		//this.setState({allStocks:allStocks})
		console.log("name:"+name+","+value)
		console.log("end setStockTransParams")
	}
	setStockTransParams2(event){
		console.log("start setStockTransParams2")
		const {name,value}=event.target
		//this.setState({[name]:value})
		console.log("index:"+event.target.id+" "+event.target.value)
		var stockMarkets = {id:event.target.id,
			companyName:this.state.allStocks[event.target.id].companyName,
			numOfShares:event.target.value,
			stockValue:this.state.allStocks[event.target.id].high}
		
		console.log("id:"+stockMarkets.id)
		console.log("numOfShares:"+stockMarkets.numOfShares)
		console.log("stockValue:"+stockMarkets.stockValue)
		this.saleStock(stockMarkets);	
		this.refreshUserDetails(event);
		//this.setState(prevstate => {prevstate.stockMarket.map( item=> {if(item.id=stockMarkets.id) {return stockMarkets}}) })
		//this.setState({[name]:value}) //stockMarket[event.target.id]=stockMarket,
		//console.log("numOfShares2:"+this.state.stockMarket[stockMarkets.id].numOfShares)
		//var allStocks[event.target.id].numOfShares=event.target.value
		//this.setState({allStocks:allStocks})
		console.log("name:"+name+","+value)
		console.log("end setStockTransParams2")
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
						<th>Num. of Shares To Buy</th>&nbsp;&nbsp;&nbsp;
						<th>Num. of Shares To Sell</th>&nbsp;&nbsp;&nbsp;
						<th>Buy/Sell</th>
					</tr>
					<StockTransaction allStocks={this.state.allStocks} stockDetails={this.state.stockMarket} setStockTransParams={this.setStockTransParams} setStockTransParams2={this.setStockTransParams2} buyStock={this.buyStock} sellStock={this.sellStock}/>
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
