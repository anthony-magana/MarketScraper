import React, {useEffect, useState} from 'react';

interface Crypto {
    rank: string,
    nameFull: string,
    nameShort: string,
    price: string,
    changeUpDown24h: string,
    change24h: string,
    changeUpDown7d: string,
    change7d: string,
    marketCap: string,
    volumeUSD: string,
    volumeCoin: string,
    circulatingSupply: string,
}

export default function TopCrypto() {

    const [cryptoData, setCryptoData] = useState<Crypto[]>([]);

    useEffect(() => {
        fetch("/crypto")
            .then(res => res.json())
            .then(data => {
                setCryptoData(data)
            })
    }, []);

    return (
        <section style={{marginLeft: '30px', marginTop: '50px',}}>
            <h2 style={{marginLeft: '250px'}}>Top 10 Cryptos</h2>
            <div style={{display: 'flex', fontWeight: 600, fontSize: '22px'}}>
                <p style={{width: '50px'}}>#</p>
                <p style={{width: '140px'}}>Name</p>
                <p style={{width: '120px'}}>Symbol</p>
                <p style={{width: '150px'}}>Price (USD)</p>
                <p style={{width: '100px'}}>24h%</p>
                <p style={{width: '100px'}}>7d%</p>
                <p style={{width: '425px', textAlign: 'center'}}>Volume(24hr)</p>
                <p style={{width: '220px'}}>Market Cap (USD)</p>
                <p style={{width: '200px'}}>Circulating Supply</p>
            </div>
            {!cryptoData ? "Loading...." : 
                <div style={{marginTop: 0, fontWeight: 600, fontSize: '22px'}}>
                    {cryptoData.map((item: Crypto) => (
                        <div key={item.nameShort} style={{display: 'flex', justifyContent: 'flex-start', flex: 'wrap'}}>
                            <p style={{ width: '40px'}}>{item.rank}.</p>
                            <p style={{ width: '160px'}}>{item.nameFull}</p>
                            <p style={{ width: '100px'}}>{item.nameShort}</p>
                            <p style={{ width: '150px'}}>{item.price}</p>
                            {item.changeUpDown24h === 'down' ? <p style={{ width: '100px', color: 'red'}}>{"-" + item.change24h}</p> : <p style={{ width: '100px', color: 'green'}}>{"+" + item.change24h}</p>}
                            {item.changeUpDown7d === 'down' ? <p style={{ width: '120px', color: 'red'}}>{"-" + item.change7d}</p> : <p style={{ width: '120px', color: 'green'}}>{"+" + item.change7d}</p>}
                            <p style={{ width: '180px'}}>{item.volumeUSD}</p>
                            <p style={{ width: '250px'}}>{item.volumeCoin}</p>
                            <p style={{ width: '200px'}}>{item.marketCap}</p>
                            <p style={{ width: '250px'}}>{item.circulatingSupply}</p>
                        </div>
                    ))}
                </div>
            }
            
        </section>
    )
}
