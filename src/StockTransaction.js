import React from 'react'


function StockTransaction(prop){
	return (
		<tr>
			<th>{prop.allStocks.map((item,index)=>(<tr><output name="companyName" id={prop.stockDetails.id=index} value={prop.stockDetails.companyName=item.companyName}>{item.companyName}</output></tr>))}</th>&nbsp;&nbsp;&nbsp;
			<th>{prop.allStocks.map((item,index)=>(<tr><output name="stockValue" id={prop.stockDetails.id=index} value={prop.stockDetails.stockValue=item.high}>{item.high}</output></tr>))}</th>&nbsp;&nbsp;&nbsp;
			<th>{prop.allStocks.map((item,index)=>(<tr><input type="text" id={prop.stockDetails.id=index} placeholder="Enter number of shares" name="numOfShares" value={prop.stockDetails.numOfShares=item.numOfShares} onChange={prop.setStockTransParams}/></tr>))}</th>&nbsp;&nbsp;&nbsp;
			<th>{prop.allStocks.map((item,index)=>(<tr><input type="text" id={prop.stockDetails.id=index} placeholder="Enter number of shares" name="numOfShares" value={prop.stockDetails.numOfShares=item.numOfShares} onChange={prop.setStockTransParams2}/></tr>))}</th>&nbsp;&nbsp;&nbsp;
			<th>{prop.allStocks.map((item,index)=>(<tr><button onClick={prop.buyStock}>Buy</button>&nbsp;&nbsp;&nbsp;<button onClick={prop.sellStock}>Sell</button></tr>))}</th>&nbsp;&nbsp;&nbsp;
			
		</tr>)
	
}

export default StockTransaction
