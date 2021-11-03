import React, {useEffect, useState} from 'react';

export default function TopCrypto() {

    const [cryptoData, setCryptoData] = useState<any[]>([]);

    useEffect(() => {
        fetch("/crypto")
            .then(res => res.json())
            .then(data => {
                setCryptoData(data)
                console.log(cryptoData)
            })
    }, [])

    return (
        <section>
            <h2>Top 20 Cryptos</h2>
            {!cryptoData ? "Loading..." : cryptoData.map((item) => (
                <div key={item.name}>
                    <h3>{item.rank}.</h3>
                    <h3>{item.price}</h3>
                    <h4>Price: {item.volume}</h4>
                    <h4>Market Cap: {item.marketCap}</h4>
                    <h4>Change: {item.change24h}</h4>
                </div>
            ))}
            
        </section>
    )
}
