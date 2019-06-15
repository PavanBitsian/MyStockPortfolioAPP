import React from 'react'


function StockTransaction(prop){
	return (<div>
		<tr>
		<th>{prop.stock.companyName}</th>&nbsp;&nbsp;&nbsp;
		<th>{prop.stock.high}</th>&nbsp;&nbsp;&nbsp;
		<th><input type="text" placeholder="Enter number of shares" name="numOfShares" value={prop.stock.numOfShares} onChange={prop.stock.setStockTransParams}/></th>&nbsp;&nbsp;&nbsp;
		<th><button onClick={prop.stock.buyStock}>Buy</button>&nbsp;&nbsp;&nbsp;<button onClick={prop.stock.sellStock}>Sell</button></th>
		</tr>
	</div>)
}

export default StockTransaction
