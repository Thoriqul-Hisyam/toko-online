export const formatPrices =
    (price: number) => {
        return new Intl.NumberFormat
            ('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(price)
    };