export const fetchExchangeRate =({from,to})=>({
    type: 'FETCH_EXCHANGE_RATE',
    from,
    to
})

export const receiveExchangeRate =({exchangeRate})=>({
    type: 'RECEIVE_EXCHANGE_RATE',
    exchangeRate
})