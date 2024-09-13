const q = {
    hoy: "select * \
            from meals \
            where date_trunc('day',now() at time zone 'est') = date_trunc('day',date)",
    ayer: "select * \
            from meals \
            where date_trunc('day', now() at time zone 'est' - interval '1 day') = date_trunc('day',date)",
    totals: "select sum(calories) as total_cals, \
                date_trunc('day', date) as date \
                from meals \
                group by date_trunc('day',date)"
}

export default q
