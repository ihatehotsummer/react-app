import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [budget, setBudget] = useState(0);
  const [BTC, setBTC] = useState(0);
  const [selectedCoinPrice, setSelectedCoinPrice] = useState(0); // 선택된 코인의 가격을 저장할 상태

  const onChange = (event) => setBudget(event.target.value);
  const onSelect = (event) => {
    const selectedCoinSymbol = event.target.value;
    const selectedCoin = coins.find((coin) => coin.symbol === selectedCoinSymbol);
    setSelectedCoinPrice(selectedCoin.quotes.USD.price);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // 선택된 코인의 가격이나 예산이 변경될 때마다 BTC 값을 계산합니다.
    setBTC(budget/selectedCoinPrice);
  }, [selectedCoinPrice, budget]);

  return (
    <div>
      <h1>코인 정보! ({coins.length})</h1>
      {loading ? <strong>로딩 중...</strong> : null}
      <select onChange={onSelect}>
        <option>선택하세요</option>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.symbol}>
            {coin.name} {coin.symbol} : ${coin.quotes.USD.price}
          </option>
        ))}
      </select>
      <input onChange={onChange} type="text" placeholder="얼마나 가지고 있나요?" value={budget}></input>
      <input type="text" placeholder="" value={BTC}></input>
    </div>
  );
}

export default App;
