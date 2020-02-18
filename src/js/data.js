var data = {
  securities: [
    {
      isin: "XS1973630889",
      name: "ZHPRHK 8 13/20 21/01/2023",
      country_of_risk: "CHN",
      bb_composite: "B",
      industry_group: "Financials",
      coupon_rate: 8.65,
      maturity_date: "2023-01-21",
      currency: "USD",
      issuer_name: "Zhenro Properties Group Limited",
      industry_sector: "Corporate",
      new: true
    },
    {
      isin: "XS0908570459",
      name: "VW 3 3/10 22/03/2033",
      country_of_risk: "DEU",
      bb_composite: "BBB+",
      industry_group: "Consumer Goods",
      coupon_rate: 3.3,
      maturity_date: "2033-03-22",
      currency: "EUR",
      issuer_name: "Volkswagen International Finance N.V.",
      industry_sector: "Corporate"
    },
    {
      isin: "XS1329671132",
      name: "EXOIM 2 1/8 02/12/2022",
      country_of_risk: "ITA",
      bb_composite: "BBB+",
      industry_group: "Consumer Goods",
      coupon_rate: 2.125,
      maturity_date: "2015-12-03",
      currency: "EUR",
      issuer_name: "EXOR N.V.",
      industry_sector: "Corporate"
    }
  ],
  getExpirySpan(security) {
    var today = new Date.now();
    console.log(security.maturity_date - today);
  },
  getRandomZscore() {
    var min = 1;
    var max = 4;
    var random = Math.random() * (max - min) + min;
    var zScore = random.toFixed(2);
    return zScore;
  }
};
