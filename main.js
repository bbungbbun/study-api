const baseUrl = 'http://apis.data.go.kr/B552061/frequentzoneBicycle/getRestFrequentzoneBicycle';
async function getData(){
  const url = `${baseUrl}?ServiceKey=${API_KEY}&searchYearCd=2015&siDo=11&guGun=680&type=json&numOfRows=10&pageNo=1`;
  const response = await fetch(url);
  const data = await response.json();
  console.log('data',data);
}

getData();